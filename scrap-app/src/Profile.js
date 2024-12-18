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
                const sortedPages = res.data.scrapPages.sort((a, b) => {
                    const dateA = new Date(a.timestamp);
                    const dateB = new Date(b.timestamp);
                    return dateB - dateA; // For descending order
                });

                setScrapPages(sortedPages);
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
                to="/"
                style={{
                    display: 'inline-block',
                    backgroundColor: '#5C4033',
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
            <h1 style={{textAlign: 'center'}}>{username ? `${username}'s Scrapbook Pages` : "Loading..."}</h1>

            <div
            style={{
                display: 'flex',
                overflowX: 'scroll',
                scrollSnapType: 'x mandatory',
                gap: '20px',
                padding: '10px',
                paddingLeft: 'calc(50vw - 375px)',
                paddingRight: 'calc(50vw - 375px)',
            }}
            >
                {scrapPages.map((page, index) => (
                    <div
                        key={index}
                        style={{
                            flex: '0 0 auto',
                            borderRadius: '10px',
                            padding: '10px',
                            backgroundColor: '#eed9c4',
                            width: '750px',
                            height: '974px',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 10px 10px rgba(0, 0, 0, 0.5)',
                            scrollSnapAlign: 'center',
                            transform: 'scale(0.9)',
                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                          }}
                          onMouseEnter={(e) => {
                            // Scale up and add shadow on hover
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 40px 40px rgba(0, 0, 0, 0.7)';
                          }}
                          onMouseLeave={(e) => {
                            // Revert to normal state
                            e.currentTarget.style.transform = 'scale(0.9)';
                            e.currentTarget.style.boxShadow = '0 10px 10px rgba(0, 0, 0, 0.5)';
                          }}
                    >


                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '10px',
                        }}
                    >
                        <Link to={`/profile/${page.user}`} style={{ color: '#5C4033', textDecoration: 'none' }}>
                            <h3 style={{ margin: 0 }}>{page.username}</h3>
                        </Link>

                        {loggedInUserId && loggedInUserId === userId && (
                            <button
                                onClick={() => handleDelete(page._id)}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#FF0000',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                X
                            </button>
                        )}
                    </div>



                        <p style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#5C4033',
                            textDecoration: 'none',
                            fontSize: '1.5rem',
                        }}>{page.description}</p>

                        {/* Tags Section */}
                        <p
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px',
                        }}
                        >
                        {page.tags.map((tag, tagIndex) => (
                            <span
                            key={tagIndex}
                            style={{
                                display: 'inline-block',
                                padding: '5px 10px',
                                backgroundColor: '#eeeeee',
                                borderRadius: '10px',
                                fontSize: '0.9rem',
                                color: '#5C4033',
                            }}
                            >
                            #{tag}
                            </span>
                        ))}
                        </p>


                        {page.images && page.images.length > 0 ? (
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '77%',
                                backgroundColor: page.color || '#f9f9f9',
                                borderRadius: '10px',
                                boxShadow: '0 5px 5px rgba(0, 0, 0, 0.3)',
                              }}>
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
                                            borderRadius: '15px',
                                        }}
                                    />
                                ))}
                                {page.stickers.map((sticker, stickerIndex) => {
                                    const { stickerType, position = { x: 0, y: 0 } } = sticker;
                                    const { imageSource, size } = stickerMapping[stickerType] || {};

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
