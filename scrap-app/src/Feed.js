import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Feed() {
    const [scrapData, setScrapData] = useState([]);
    const [error, setError] = useState('');

    const [searchTag, setSearchTag] = useState(''); // State to hold the search tag
    const [filteredData, setFilteredData] = useState([]); // State to hold filtered scrap data based on search

    useEffect(() => {
        const fetchScrapData = async () => {
          try {
            const res = await axios.get('http://localhost:4000/scrap-pages'); // Fetch all the scrap pages
            setScrapData(res.data); // Assuming the response contains an array of scrapbook data

            setFilteredData(res.data); // Initially, display all pages
          } catch (err) {
            console.error('Error fetching scrapbook data:', err);
            setError('Failed to load scrapbook data.');
          }
        };
    
        fetchScrapData();
      }, []);

  // Handle the search input change
  const handleSearchChange = (event) => {
      setSearchTag(event.target.value); // Update the search term as user types
  };

  // Trigger search when the button is clicked
  const handleSearchClick = async () => {
      if (searchTag.trim()) {
          try {
            const res = await axios.get(`http://localhost:4000/scrap-pages/by-tag?tag=${searchTag}`); // Make the search request
            setFilteredData(res.data); // Set the filtered data based on search results
          } catch (err) {
              console.error('Error searching scrapbook pages by tag:', err);
              setError(`No scrapbook pages found with '${searchTag}'`);
          }
      } else {
          // If no search term, display all scrapbook pages
          setFilteredData(scrapData);
      }
      setSearchTag('');
  };


  
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Scrapbook Pages</h1>

      {/* Error Message */}
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      {/* Search Input (By Tag) */}
      <div style={{ marginBottom: '20px' }}>
        <input
            type="text"
            placeholder="Search by tag..."
            value={searchTag}
            onChange={handleSearchChange} // Handle input change
            style={{
                padding: '8px',
                width: '300px',
                borderRadius: '5px',
                border: '1px solid #ccc',
            }}
        />
        <button
            onClick={handleSearchClick} // Trigger search when button is clicked
            style={{
                padding: '8px 16px',
                marginLeft: '10px',
                borderRadius: '5px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
            }}
        >
            Search
        </button>
      </div>

              {/* Render Scrapbook Pages */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {filteredData.map((page, index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '10px',
                            backgroundColor: page.color || '#f9f9f9',
                        }}
                    >
                        <h3>{page.name}</h3>
                        <p>{page.description}</p>

                        {/* Render Images */}
                        {page.binaryImages && page.binaryImages.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
                                {page.binaryImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Scrapbook ${index}`}
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No images available</p>
                        )}

                        {/* Stickers Section */}
                        {page.stickers && page.stickers.length > 0 && (
                            <div>
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

                        <p>
                          {page.tags.map((tag,index) => (
                            <span key={index}>#{tag} </span>
                          ))}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}