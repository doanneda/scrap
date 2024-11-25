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
        { "x": 30, "y": 40 }
      ]
    },
  ];

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_WIDTH = 800;
  const MAX_HEIGHT = 800;

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

          resolve(canvas.toDataURL('image/jpeg')); // Base64 encoded image
        };

        img.onerror = reject;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // Reads the file as base64
    });
  };

  const handleUpload = async () => {
    // Check if all required images are uploaded
    if (images.filter((image) => image !== null).length !== numImages) {
      setError(`Please upload all ${numImages} images before proceeding.`);
      return;
    }

    // Resize images and convert to Base64
    const imagePromises = images.map((file) => resizeImage(file));

    try {
      const resizedBase64Images = await Promise.all(imagePromises);

      // Send to server
      const scrapData = {
        name,
        binaryImages: resizedBase64Images,
        description,
        color,
        stickers
      };

      const res = await axios.post('http://localhost:4000/scrap-pages/post', scrapData);
      console.log('Upload Successful', res.data);

      // Reset state after successful upload
      setError('');
      setImages(Array(numImages).fill(null));
      setDescription('');
      alert('Upload successful!');
    } catch (err) {
      console.error('Upload error:', err.message);
      setError('There was an error uploading the images.');
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
  );
}


// import React, { useState } from 'react';
// import axios from 'axios';

// export default function CreatePage() {
//   const [numImages, setNumImages] = useState(1);
//   const [images, setImages] = useState([]);
//   const [description, setDescription] = useState('');
//   const [error, setError] = useState('');
//   const name = "TEST3";
//   const color = "paleGreen";
//   const stickers = [
//     {
//       "stickerType": "emoji",
//       "position": [
//         { "x": 10, "y": 20 },
//         { "x": 30, "y": 40 },
//       ],
//     },
//   ];

//   const handleNumImagesChange = (event) => {
//     const newNumImages = parseInt(event.target.value, 10);
//     setNumImages(newNumImages);
//     setImages(Array(newNumImages).fill(null));
//     setError('');
//   };

//   const handleFileChange = (index, event) => {
//     const file = event.target.files[0];
//     if (!file) return; // Prevent errors if no file is selected
//     const updatedImages = [...images];
//     updatedImages[index] = file;
//     setImages(updatedImages);
//     setError('');
//   };

//   const handleRemove = (index) => {
//     const updatedImages = [...images];
//     updatedImages[index] = null;
//     setImages(updatedImages);
//   };

//   const handleUpload = async () => {
//     // Check if all required images are uploaded
//     if (images.filter((image) => image !== null).length !== numImages) {
//       setError(`Please upload all ${numImages} images before proceeding.`);
//       return;
//     }
  
//     console.log('Selected Images:', images);
//     console.log('Description:', description);
  
//     // Convert images to Base64
//     const imagePromises = images.map((file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const base64Image = reader.result; // Base64-encoded string
//           resolve(base64Image); // Resolve the promise with the Base64 string
//         };
//         reader.onerror = reject;
//         reader.readAsDataURL(file); // Reads the file as Base64 data URL
//       });
//     });
  
//     try {
//       const base64Images = await Promise.all(imagePromises);
//       console.log("Base64 Encoded Images:", base64Images);
  
//       const scrapData = {
//         name,
//         binaryImages: base64Images, // Send Base64 strings to the backend
//         description,
//         color,
//         stickers,
//       };
  
//       console.log("Sending scrapData to axios...");
//       const res = await axios.post("http://localhost:4000/scrap-pages/post", scrapData);
  
//       console.log("Axios request successful");
//       if (res.data.error) {
//         console.error(res.data.error);
//       } else {
//         // const userId = res.data._id;
//         console.log("Storing user ID...");
//         // await Storage({ key: 'userId', value: userId, saveKey: true });
//         console.log("Successfully stored user ID!");
//       }
//     } catch (err) {
//       console.error("Error during image upload:", err.message);
//     }
  
//     // Reset state
//     setError('');
//     setImages(Array(numImages).fill(null));
//     setDescription('');
//     alert('Upload successful!');
//   };

//   return (
//     <div>
//       <label>
//         Select number of images:
//         <select value={numImages} onChange={handleNumImagesChange}>
//           {[1, 2, 3, 4].map((num) => (
//             <option key={num} value={num}>
//               {num}
//             </option>
//           ))}
//         </select>
//       </label>
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: `repeat(${Math.min(2, numImages)}, 1fr)`,
//           gap: '10px',
//         }}
//       >
//         {Array.from({ length: numImages }).map((_, index) => (
//           <div key={index} style={{ position: 'relative', textAlign: 'center' }}>
//             {images[index] ? (
//               <>
//                 <img
//                   src={URL.createObjectURL(images[index])}
//                   alt="Preview"
//                   style={{
//                     width: '100px',
//                     height: '100px',
//                     objectFit: 'cover',
//                   }}
//                 />
//                 <button
//                   onClick={() => handleRemove(index)}
//                   style={{
//                     position: 'absolute',
//                     top: 0,
//                     right: 0,
//                     backgroundColor: 'red',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '50%',
//                     width: '20px',
//                     height: '20px',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   &times;
//                 </button>
//               </>
//             ) : (
//               <label>
//                 <div
//                   style={{
//                     width: '100px',
//                     height: '100px',
//                     border: '1px dashed gray',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   +
//                 </div>
//                 <input
//                   type="file"
//                   style={{ display: 'none' }}
//                   onChange={(e) => handleFileChange(index, e)}
//                 />
//               </label>
//             )}
//           </div>
//         ))}
//       </div>
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Enter a description here..."
//         style={{
//           width: '100%',
//           height: '80px',
//           marginTop: '20px',
//         }}
//       ></textarea>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }