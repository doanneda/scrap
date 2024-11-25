import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Storage from './Storage';

// const fs = require('fs');

export default function CreatePage() {
  const [numImages, setNumImages] = useState(1); // Number of image slots (1 to 4)
  const [images, setImages] = useState([]); // Store the uploaded images
  const [description, setDescription] = useState(''); // Store the description
  const [error, setError] = useState(''); // Error message for validation feedback
  const name = "TEST3"
  const color = "paleGreen"
  const stickers = [
    {
      "stickerType": "emoji",
      "position": [
        { "x": 10, "y": 20 },
        { "x": 30, "y": 40 }
      ]
    },
  ]

  const handleNumImagesChange = (event) => {
    const newNumImages = parseInt(event.target.value, 10);
    setNumImages(newNumImages);
    setImages(Array(newNumImages).fill(null)); // Reset images array to match the new count
    setError(''); // Clear error when images changed
  };

  const handleFileChange = (index, event) => {
    const updatedImages = [...images];
    updatedImages[index] = event.target.files[0];
    setImages(updatedImages);
    setError(''); 
  };

  // Removing images
  const handleRemove = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  const handleUpload = async () => {
    // Check if all required images are uploaded
    if (images.filter((image) => image !== null).length !== numImages) {
      setError(`Please upload all ${numImages} images before proceeding.`);
      return;
    }

    // If all images are uploaded, proceed with upload logic
    console.log('Selected Images:', images);
    console.log('Description:', description);
    
    // Convert images to binary
    const imagePromises = images.map((file) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result;  // This will be a base64-encoded string
            resolve(base64Image);
            // const arrayBuffer = reader.result;
            // const buffer = Buffer.from(arrayBuffer);  // Convert ArrayBuffer to Buffer
            // resolve(buffer);  // Resolve the promise with the buffer
          };    
          // reader.onloadend = () => resolve(reader.result);  // Convert to binary data
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);  // Reads the file as binary
      });
    });

    // Upload the images to MongoDB
    try {
      const binaryImages = await Promise.all(imagePromises);
      console.log(imagePromises)
      console.log(binaryImages) 

      const scrapData = {
        name,
        binaryImages,
        description,
        color,
        stickers
      };
      console.log("Sending scrapdata to axios...")
      // console.log("URL IS " + process.env.EXPO_PUBLIC_SERVER_URL); 
      const res = await axios.post("http://localhost:4000/scrap-pages/post", scrapData);
      
      // const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/scrap-pages/post`, scrapData);
      console.log("SUCCESSFUL AXIOS")
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        const userId = res.data._id;
        console.log("storing user id...")
        // await Storage({ key: 'userId', value: userId, saveKey: true });
        console.log("SUCCESFFUL STORAGE!")
        // navigation.navigate('Home');
      }
    } catch (err) {
      console.log(err.message);
    }

    // Reset state
    setError('');
    setImages(Array(numImages).fill(null));
    setDescription('');
    alert('Upload successful!');
  };

  useEffect(() => {
    handleUpload();
  }, []);

  return (
    <div>
      {/* Dropdown for Number of Images */}
      <div>
        <label>
          Select number of images:
          <select
            value={numImages}
            onChange={handleNumImagesChange}
          >
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Dynamic Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(2, numImages)}, 1fr)`,
          gap: '10px',
        }}
      >
        {Array.from({ length: numImages }).map((_, index) => (
          <div key={index} style={{ position: 'relative', textAlign: 'center' }}>
            {images[index] ? (
              <>
                <img
                  src={URL.createObjectURL(images[index])}
                  alt="Preview"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                  }}
                />
                <button
                  onClick={() => handleRemove(index)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                  }}
                >
                  &times;
                </button>
              </>
            ) : (
              <label>
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    border: '1px dashed gray',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  +
                </div>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(index, e)}
                />
              </label>
            )}
          </div>
        ))}
      </div>

      {/* Text Input Section */}
      <div style={{ marginTop: '20px' }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description here..."
          style={{
            width: '100%',
            height: '80px',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid gray',
            borderRadius: '5px',
          }}
        ></textarea>
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            marginTop: '10px',
            color: 'red',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Upload
      </button>
    </div>
    

    // <Link to="login">
    //     <button>Login</button>
    // </Link>
  );
}
