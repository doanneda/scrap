import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

export default function Profile() {
    const { userId } = useParams(); // Get userId directly from the route parameters
    const [scrapPages, setScrapPages] = useState([]);
    const [error, setError] = useState('');
    // const loggedInUserId = localStorage.getItem('userId'); // Assuming you store logged-in user's ID in localStorage
    // console.log(loggedInUserId)
    const loggedInUserId = "67445622633a507406142121"; //make an edit/route where we find the current users ID

    useEffect(() => {
        const fetchUserPages = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/profile/users/${userId}`);
                setScrapPages(res.data.scrapPages); // Store the scrapbook pages
            } catch (err) {
                console.error('Error fetching scrapbook pages:', err);
                setError('Failed to load scrapbook pages.');
            }
        };

        fetchUserPages();
    }, [userId]);

    const handleEdit = async (pageId) => {
        const newDescription = prompt('Enter new description:');
        if (!newDescription) return;

        try {
            const res = await axios.put(`http://localhost:4000/profile/users/${userId}/pages/${pageId}`, {
                description: newDescription,
            });
            setScrapPages((prev) =>
                prev.map((page) =>
                    page._id === pageId ? { ...page, description: res.data.page.description } : page
                )
            );
        } catch (err) {
            console.error('Error updating page:', err);
            setError('Failed to update the page.');
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
            <h1>User's Scrapbook Pages</h1>
            <div className="scrapbook-grid">
                {scrapPages.map((page) => (
                    <div
                        key={page._id}
                        className="scrapbook-item"
                        style={{ '--scrapbook-bg': page.color || '#f9f9f9' }}
                    >
                        <p>{page.description}</p>

                        {/* Edit Button (Only for Logged-In User) */}
                        {loggedInUserId === userId && (
                            <button
                                onClick={() => handleEdit(page._id)}
                                style={{
                                    marginTop: '10px',
                                    padding: '5px 10px',
                                    backgroundColor: '#007BFF',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Edit
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
