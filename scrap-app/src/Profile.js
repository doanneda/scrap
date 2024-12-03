import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
    const { userId } = useParams(); // Get userId directly from the route parameters
    const [scrapPages, setScrapPages] = useState([]);
    const [error, setError] = useState('');
    const [loggedInUserId, setLoggedInUserId] = useState(null); // Store the logged-in user's ID
    const [username, setUsername] = useState(''); 

    useEffect(() => {
        // Fetch the logged-in user's ID from the /me route
        const fetchLoggedInUser = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token in header
                    },
                });
                setLoggedInUserId(res.data._id); // Save the logged-in user's ID
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
                setScrapPages(res.data.scrapPages); // Store the scrapbook pages
                setUsername(res.data.username); // Set username
            } catch (err) {
                console.error('Error fetching scrapbook pages:', err);
                setError('Failed to load scrapbook pages.');
            }
        };

        if (userId) {
            fetchUserPages();
        }
    }, [userId]);

    // Frontend DELETE request example (React)
    const handleDelete = async (pageId) => {
        if (window.confirm('Are you sure you want to delete this page?')) {
        try {
            // Make sure to pass the user's auth token in the header
            const res = await axios.delete(`http://localhost:4000/profile/users/${userId}/pages/${pageId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // authToken is the JWT token from the user
            },
            });
    
            // Update the state to remove the deleted page
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
        <div className="profile-container">
            <Link to="/">
                Return to feed
            </Link>
            <h1>{username ? `${username}'s Scrapbook Pages` : "Loading..."}</h1>
            <div className="scrapbook-grid">
                {scrapPages.map((page) => (
                    <div
                        key={page._id}
                        className="scrapbook-item"
                        style={{ '--scrapbook-bg': page.color || '#f9f9f9' }}
                    >
                        <p>{page.description}</p>

                        {/* Edit Button (Only for Logged-In User) */}
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

                        {/* Render Images */}
                        {page.binaryImages && page.binaryImages.length > 0 ? (
                            <div className="images-grid">
                                {page.binaryImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Scrapbook ${index}`}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="no-images">No images available</p>
                        )}

                        {/* Stickers Section */}
                        {page.stickers && page.stickers.length > 0 && (
                            <div className="stickers-section">
                                <h4>Stickers:</h4>
                                <ul>
                                    {page.stickers.map((sticker, stickerIndex) => (
                                        <li key={stickerIndex}>
                                            Type: {sticker.stickerType}, Positions:{' '}
                                            {sticker.position.map((pos, posIndex) => (
                                                <span key={posIndex}>
                                                    ({pos.x}, {pos.y}){' '}
                                                </span>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Tags Section */}
                        <div className="tags-container">
                            {page.tags.map((tag, index) => (
                                <span key={index}>#{tag} </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}