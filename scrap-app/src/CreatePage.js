import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreatePage() {
  const [numImages, setNumImages] = useState(1);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const color = "paleGreen";

  const navigate = useNavigate();

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_WIDTH = 700; // decreased this from 800 
  const MAX_HEIGHT = 700; // decreased this from 800

  const handleNumImagesChange = (event) => {
    const newNumImages = parseInt(event.target.value, 10);
    setNumImages(newNumImages);
    setImages(Array(newNumImages).fill(null));
    setError('');
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert('File is too large. Please upload a file smaller than 5MB.');
      return;
    }

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

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          let width = img.width;
          let height = img.height;
  
          // Resize image more aggressively if needed
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // can change this for better quality but smaller images size
          resolve(canvas.toDataURL('image/jpeg', 0.25)); // 25% quality for more compression
        };
  
        img.onerror = reject;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  const handleUpload = async () => {
    // Check if all required images are uploaded
    if (images.filter((image) => image !== null).length !== numImages) {
      setError(`Please upload all ${numImages} images before proceeding.`);
      return;
    }
  
    // Resize images and convert to Base64
    const imagePromises = images.map((file, index) => resizeImage(file).then((base64Data) => ({
      base64Data,
      type: file.type, // e.g., image/jpeg, image/png, etc.
      position: { x: 0, y: 0 }, // You can add logic to position images if needed
      size: { width: file.width, height: file.height }, // Add actual size if needed
    })));
  
    try {
      const resizedImages = await Promise.all(imagePromises);
  
      // Retrieve user token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to upload a scrapbook page.');
        return;
      }
  
      const now = new Date();
  
      // Send to server
      const scrapData = {
        images: resizedImages, // Pass the array of image objects with metadata
        description,
        color,
        tags,
        timestamp: now,
      };
  
      const res = await axios.post(
        `http://localhost:4000/scrap-pages/post`,
        scrapData,
        {
          headers: {
            'x-auth-token': token, // Include the token in the request headers
          },
        }
      );
  
      console.log('Upload Successful', res.data);
  
      // Capture the ID returned by MongoDB (assuming it's in res.data._id)
      const pageId = res.data._id;
  
      // Reset state after successful upload
      setError('');
      setImages(Array(numImages).fill(null));
      setDescription('');
      alert('Upload successful!');
  
      // Route to the Drag and Drop page with the generated ID
      navigate(`/dnd/${pageId}`); // Use the pageId in the URL
    } catch (err) {
      console.error('Upload error:', err.message);
      setError('There was an error uploading the images.');
    }
  };
  
  // Handle change in the input field
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // Handle adding the tag
  const handleAddTag = () => {
    // Check if the input is not empty and is not already in the tags array
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]); // Add the new tag to the array
      setTagInput(''); // Clear the input field
    }
  };

  return (
    <div>
      {/* Dropdown for Number of Images */}
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
      </div>

      {/* Dynamic Grid for Image Slots */}
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

      {/* Text Input Section For Description */}
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

      <div style={{ marginTop: '20px' }}>
      {/* Text input for entering a tag */}
      <input
        type="text"
        value={tagInput}
        onChange={handleTagInputChange}
        placeholder="Enter a tag..."
        style={{
          padding: '8px',
          fontSize: '14px',
          border: '1px solid gray',
          borderRadius: '5px',
          marginRight: '10px',
        }}
      />

      {/* Button to add the tag */}
      <button
        onClick={handleAddTag}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Add Tag
      </button>

      {/* Display the current tags */}
      <div style={{ marginTop: '10px' }}>
        <h4>Tags:</h4>
        <ul>
          {tags.map((tag, index) => (
            <li key={index} style={{ display: 'inline-block', marginRight: '10px', padding: '5px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
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
  );
}