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
        setScrapData(res.data); 

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
        console.log("searchTag: ", searchTag)

          try {
            const res = await axios.get(`http://localhost:4000/scrap-pages/by-tag?tag=${searchTag}`); // Make the search request
            console.log("searching in .js file")
            console.log("res: ", res)
            setFilteredData(res.data); // Set the filtered data based on search results
  
            
          } catch (err) {
            console.log("ERROR BLEH")
            const res = await axios.get('http://localhost:4000/scrap-pages'); // Fetch all the scrap pages
            setScrapData(res.data); 

            setFilteredData(res.data); // Initially, display all pages
          }
      } else {
          // If no search term, display all scrapbook pages
          setFilteredData(scrapData);
      }
      setSearchTag('');
  };


  return (
    <div style={{ padding: '20px' }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '50px',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          margin: 0,
          color: 'black',
        }}
      >
        Scrapbook Feed
      </h1>
      <Link
        to="/createpage"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90px',
          height: '30px',
          backgroundColor: '#5C4033',
          color: 'white',
          textDecoration: 'none',
          padding: '10px 10px',
          borderRadius: '10px',
          fontSize: '1rem',
        }}
      >
        Create Page
      </Link>
    </div>

  
      {/* Error Message */}
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
  
      {/* Search Input (By Tag) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
      <input
        type="text"
        placeholder="Search by tag..."
        value={searchTag}
        onChange={handleSearchChange}
        style={{
          padding: '0 8px',
          height: '36px',
          width: '650px',
          borderRadius: '5px 0 0 5px',
          border: '1px solid #ccc',
          borderRight: 'none',
        }}
      />
      <button
        onClick={handleSearchClick}
        style={{
          padding: '0 16px',
          height: '39px',
          borderRadius: '0 5px 5px 0',
          backgroundColor: '#5C4033',
          color: 'white',
          border: '1px solid #007bff',
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
        }}
      >
        {filteredData.map((page, index) => (
          <div
            key={index}
            style={{
              borderRadius: '10px',
              padding: '10px',
              backgroundColor: '#eed9c4',
              width: '750px',
              height: '974px',
              marginBottom: '20px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Link to={`/profile/${page.user}`} style={{
              color: '#5C4033',
            }}>
              <h3>{page.username}</h3>
            </Link>

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
                    color: '#333',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </p>

  
            {/* Render Images */}
            {page.images && page.images.length > 0 ? (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '77%',
                  backgroundColor: page.color || '#f9f9f9',
                  borderRadius: '10px',
                  boxShadow: '0 5px 5px rgba(0, 0, 0, 0.3)',
                }}
              >
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

                {/* Stickers Section */}
                {page.stickers.map((sticker, stickerIndex) => {
                  const {
                    stickerType,
                    position = { x: 0, y: 0 },
                  } = sticker;
  
                  const { imageSource, size } = stickerMapping[stickerType] || {};
  
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