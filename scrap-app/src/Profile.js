import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { stickerMapping } from './stickerMapping';
import './Profile.css';

export default function Profile() {
    const { userId } = useParams();
    const [scrapPages, setScrapPages] = useState([]);
    const [error, setError] = useState('');
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/users/me', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setLoggedInUserId(res.data._id);
            } catch (err) {
                console.error("Error fetching user info:", err);
                setError("Failed to load user information.");
            }
        };
        fetchLoggedInUser();
    }, []);

    useEffect(() => {
        const fetchUserPages = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/profile/users/${userId}`);
                setScrapPages(res.data.scrapPages);
                setUsername(res.data.username);
            } catch (err) {
                console.error('Error fetching scrapbook pages:', err);
                setError('Failed to load scrapbook pages.');
            }
        };
        if (userId) {
            fetchUserPages();
        }
    }, [userId]);

    const handleDelete = async (pageId) => {
        if (window.confirm('Are you sure you want to delete this page?')) {
            try {
                await axios.delete(`http://localhost:4000/profile/users/${userId}/pages/${pageId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setScrapPages((prev) => prev.filter((page) => page._id !== pageId));
                alert('Scrapbook page deleted successfully');
            } catch (err) {
                console.error('Error deleting scrapbook page:', err);
                alert('Error deleting scrapbook page');
            }
        }
    };

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
    }

    if (!scrapPages.length) {
        return <div style={{ textAlign: 'center' }}>No scrapbook pages found.</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Link
                to="/feed"
                style={{
                    display: 'inline-block',
                    backgroundColor: '#3498db',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '10px 20px',
                    marginBottom: '10px',
                    borderRadius: '10px',
                    fontSize: '1rem',
                }}
            >
                Return to Feed
            </Link>
            <h1>{username ? `${username}'s Scrapbook Pages` : "Loading..."}</h1>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'scroll',
                    paddingRight: '20px',
                }}
            >
                {scrapPages.map((page, index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '10px',
                            backgroundColor: page.color || '#f9f9f9',
                            width: '750px',
                            height: '750px',
                            marginBottom: '20px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <Link to={`/profile/${page.user}`}>
                            <h3>{page.username}</h3>
                        </Link>
                        <p>{page.description}</p>

                        {page.images && page.images.length > 0 ? (
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                {page.images.map((image, imgIndex) => (
                                    <img
                                        key={imgIndex}
                                        src={image.base64Data}
                                        alt={`Scrapbook ${imgIndex}`}
                                        style={{
                                            position: 'absolute',
                                            left: image.position.x,
                                            top: image.position.y,
                                            width: image.size.width,
                                            height: image.size.height,
                                        }}
                                    />
                                ))}
                                {page.stickers.map((sticker, stickerIndex) => {
                                    const { stickerType, position = { x: 0, y: 0 }, size = { width: 100, height: 100 } } = sticker;
                                    const { imageSource } = stickerMapping[stickerType] || {};

                                    if (!imageSource) {
                                        console.error(`Sticker type "${stickerType}" not found in stickerMapping.`);
                                        return null;
                                    }

                                    return (
                                        <img
                                            key={stickerIndex}
                                            src={imageSource}
                                            alt={`Sticker ${stickerIndex}`}
                                            style={{
                                                position: 'absolute',
                                                left: position.x,
                                                top: position.y,
                                                width: size.width,
                                                height: size.height,
                                                objectFit: 'contain',
                                                zIndex: 10,
                                            }}
                                        />
                                    );
                                })}
                                <p>{page.tags.map((tag, tagIndex) => <span key={tagIndex}>#{tag} </span>)}</p>
                                {loggedInUserId && loggedInUserId === userId && (
                                    <button
                                        onClick={() => handleDelete(page._id)}
                                        style={{
                                            marginTop: '10px',
                                            padding: '5px 10px',
                                            backgroundColor: '#FF0000',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ) : (
                            <p>Nothing to display</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
