import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { stickerMapping } from './stickerMapping';  // Import the sticker mapping

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
      <Link
        to="/createpage"
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
        Create a Scrapbook Page
      </Link>
  
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
          onChange={handleSearchChange}
          style={{
            padding: '8px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleSearchClick}
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
  
      {/* Scrollable Container for Scrapbook Pages */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center scrapbook pages horizontally
          justifyContent: 'center', // Center scrapbook pages vertically
          overflowY: 'scroll',
        }}
      >
        {filteredData.map((page, index) => (
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
  
            {/* Render Images */}
            {page.images && page.images.length > 0 ? (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                {page.images.map((image, imgIndex) => {
                  console.log(image.base64Data);
                  return(
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
                        objectFit: 'cover',
                      }}
                    />
                  )
                })}
                {/* Stickers Section */}
                {page.stickers.map((sticker, stickerIndex) => {
                  const {
                    stickerType,
                    position = { x: 0, y: 0 },
                    size = { width: 100, height: 100 },
                  } = sticker;
  
                  const { imageSource } = stickerMapping[stickerType] || {};
  
                  // Debugging Logs
                  // console.log('Sticker Type:', stickerType);
                  // console.log('Image Source:', imageSource);
  
                  if (!imageSource) {
                    console.error(
                      `Sticker type "${stickerType}" not found in stickerMapping.`
                    );
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
                {/* Tags Section */}
                <p>
                  {page.tags.map((tag, tagIndex) => (
                    <span key={tagIndex}>#{tag} </span>
                  ))}
                </p>
              </div>
            ) : (
              <p>No stickers/images available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );  
}