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

  {/* Scrollable Container for Scrapbook Pages */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column', // Stack pages vertically
      overflowY: 'scroll', // Enable vertical scrolling
      paddingRight: '20px', // To prevent horizontal scroll due to margin/padding
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
          width: '750px', // Set width to 750px
          height: '750px', // Set height to 750px
          marginBottom: '20px', // Space between pages
          position: 'relative', // Make sure the position is relative for absolute positioning inside
          overflow: 'hidden', // Ensure that anything outside the 750x750 container is clipped
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
                  position: 'relative', // Make sure the images are positioned within this container
                  width: '100%',
                  height: '100%',
                }}
              >
                {page.images.map((image, index) => {
                  //console.log(image);
                  return (
                    <img
                      key={index}
                      src={image.base64}
                      alt={`Scrapbook ${index}`}
                      style={{
                        position: 'absolute',
                        left: image.position.x,
                        top: image.position.y,
                        width: image.size.width,
                        height: image.size.height,
                        objectFit: 'cover',
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <p>No images available</p>
            )}

{/* Stickers Section */}
{page.stickers && page.stickers.length > 0 ? (
  <div
    style={{
      position: 'relative', // Stickers are positioned relative to this container
      width: '100%',
      height: '100%',
    }}
  >
    {page.stickers.map((sticker, stickerIndex) => {

      const { stickerType, position = { x: 0, y: 0 }, size = { width: 100, height: 100 } } = sticker;

      const { imageSource } = stickerMapping[stickerType] || {};
      console.log(imageSource);


      return (
        <img
          key={stickerIndex}
          src={imageSource}
          alt={`Sticker ${stickerIndex}`}
          style={{
            position: 'absolute', // Absolute positioning for precise placement
            left: position.x, // Sticker's x-coordinate
            top: position.y, // Sticker's y-coordinate
            width: size.width, // Sticker's width
            height: size.height, // Sticker's height
            objectFit: 'contain', // Maintain aspect ratio
            zIndex: 10, // Ensure stickers are layered above other elements
          }}
        />
      );
    })}
  </div>
) : (
  <p>No stickers available</p>
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
