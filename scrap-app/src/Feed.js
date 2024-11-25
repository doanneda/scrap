import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Feed() {
    const [scrapData, setScrapData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchScrapData = async () => {
          try {
            const res = await axios.get('http://localhost:4000/scrap-pages'); // Update the endpoint if necessary
            setScrapData(res.data); // Assuming the response contains an array of scrapbook data
          } catch (err) {
            console.error('Error fetching scrapbook data:', err);
            setError('Failed to load scrapbook data.');
          }
        };
    
        fetchScrapData();
      }, []);

      return (
    <div style={{ padding: '20px' }}>
      <h1>Scrapbook Pages</h1>

      {/* Error Message */}
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      {/* Render Scrapbook Pages */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {scrapData.map((page, index) => (
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
                {page.binaryImages.map((image, index) => {
                    const bufferToBase64 = (bufferObj) => {
                        const byteArray = new Uint8Array(bufferObj.data); // Convert to Uint8Array
                        const base64String = new TextDecoder().decode(byteArray); // Decode to Base64 string
                        return base64String; // The result should include 'data:image/...'
                      };
                      
                    const imageSrc = bufferToBase64(image);
                      
                    return (
                        <img
                        key={index}
                        src={imageSrc}
                        alt={`Scrapbook ${index}`}
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                    );
                })}
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
          </div>
        ))}
      </div>
    </div>
  );

    // return (
    // <div className="feed" alt="brown thread">
    //     <img src={threadImage} />
    //     <div>
    //         test
    //     </div>

    //     <Link to="login">
    //         <button>Login</button>
    //     </Link>
    // </div>
    // )
}