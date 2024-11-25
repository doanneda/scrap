import React, { useState } from 'react';
import axios from 'axios';

export default function CreatePage() {
  const [numImages, setNumImages] = useState(1);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const name = "TEST3";
  const color = "paleGreen";
  const stickers = [
    {
      "stickerType": "emoji",
      "position": [
        { "x": 10, "y": 20 },
        { "x": 30, "y": 40 },
      ],
    },
  ];

  const handleNumImagesChange = (event) => {
    const newNumImages = parseInt(event.target.value, 10);
    setNumImages(newNumImages);
    setImages(Array(newNumImages).fill(null));
    setError('');
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (!file) return; // Prevent errors if no file is selected
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
    setError('');
  };

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
  
    console.log('Selected Images:', images);
    console.log('Description:', description);
  
    // Convert images to Base64
    const imagePromises = images.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result; // Base64-encoded string
          resolve(base64Image); // Resolve the promise with the Base64 string
        };
        reader.onerror = reject;
        reader.readAsDataURL(file); // Reads the file as Base64 data URL
      });
    });
  
    try {
      const base64Images = await Promise.all(imagePromises);
      console.log("Base64 Encoded Images:", base64Images);
  
      const scrapData = {
        name,
        binaryImages: base64Images, // Send Base64 strings to the backend
        description,
        color,
        stickers,
      };
  
      console.log("Sending scrapData to axios...");
      const res = await axios.post("http://localhost:4000/scrap-pages/post", scrapData);
  
      console.log("Axios request successful");
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        // const userId = res.data._id;
        console.log("Storing user ID...");
        // await Storage({ key: 'userId', value: userId, saveKey: true });
        console.log("Successfully stored user ID!");
      }
    } catch (err) {
      console.error("Error during image upload:", err.message);
    }
  
    // Reset state
    setError('');
    setImages(Array(numImages).fill(null));
    setDescription('');
    alert('Upload successful!');
  };

  return (
    <div>
      <label>
        Select number of images:
        <select value={numImages} onChange={handleNumImagesChange}>
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
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
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a description here..."
        style={{
          width: '100%',
          height: '80px',
          marginTop: '20px',
        }}
      ></textarea>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}