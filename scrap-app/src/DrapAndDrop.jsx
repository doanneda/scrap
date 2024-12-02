import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import DraggableImage from './DraggableImage';
import Page from './Page';
import { DndContext } from '@dnd-kit/core';

// Import all stickers
import Frog from './assets/stickers/frog.png';
import Lotus from './assets/stickers/lotus.png';
import Clothespin from './assets/stickers/clothespin.png';
import Dipper from './assets/stickers/dipper.png';
import Flower from './assets/stickers/flower.png';
import Heart from './assets/stickers/heart.png';
import HumanHeart from './assets/stickers/humanheart.png';
import Leaf from './assets/stickers/leaf.png';
import Moon from './assets/stickers/moon.png';
import Orange from './assets/stickers/orange.png';
import Star from './assets/stickers/star.png';
import Virus from './assets/stickers/virus.png';
import Wing from './assets/stickers/wing.png';
import Lick from './assets/stickers/lick.png';
import Fence from './assets/stickers/fence.png';

export default function DragAndDrop() {
  const pageRef = useRef(null);

  const stickerMapping = {
    frog: {
      size: { width: 80, height: 80 },
      imageSource: Frog,
      x: 800,
      y: 0,
    },
    lotus: {
      size: { width: 100, height: 90 },
      imageSource: Lotus,
      x: 950,
      y: 0,
    },
    clothespin: {
      size: { width: 50, height: 100 },
      imageSource: Clothespin,
      x: 1100,
      y: 0,
    },
    dipper: {
      size: { width: 140, height: 90 },
      imageSource: Dipper,
      x: 800,
      y: 150,
    },
    flower: {
      size: { width: 80, height: 80 },
      imageSource: Flower,
      x: 950,
      y: 150,
    },
    heart: {
      size: { width: 80, height: 80 },
      imageSource: Heart,
      x: 1100,
      y: 150,
    },
    humanheart: {
      size: { width: 90, height: 120 },
      imageSource: HumanHeart,
      x: 800,
      y: 300,
    },
    leaf: {
      size: { width: 90, height: 100 },
      imageSource: Leaf,
      x: 950,
      y: 300,
    },
    moon: {
      size: { width: 50, height: 80 },
      imageSource: Moon,
      x: 1100,
      y: 300,
    },
    orange: {
      size: { width: 80, height: 90 },
      imageSource: Orange,
      x: 800,
      y: 450,
    },
    star: {
      size: { width: 90, height: 90 },
      imageSource: Star,
      x: 950,
      y: 450,
    },
    virus: {
      size: { width: 90, height: 90 },
      imageSource: Virus,
      x: 1100,
      y: 450,
    },
    wing: {
      size: { width: 80, height: 90 },
      imageSource: Wing,
      x: 800,
      y: 600,
    },
    lick: {
      size: { width: 210, height: 80 },
      imageSource: Lick,
      x: 950,
      y: 550,
    },
    fence: {
      size: { width: 210, height: 60 },
      imageSource: Fence,
      x: 950,
      y: 650,
    },
  };
  

  const [stickers, setStickers] = useState([]);
  const [images, setImages] = useState([]);


  const [bounds, setBounds] = useState({ top: 0, left: 0, bottom: 0, right: 0 });
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchStickers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/scrap-pages/get-stickers');
  
        // Add default positions from stickerMapping if missing
        const updatedStickers = response.data.map(sticker => {
          const { stickerType } = sticker;
          const { size, imageSource, x = 0, y = 0 } = stickerMapping[stickerType] || {};
  
          return {
            id: stickerType,
            stickerType,
            x: sticker.position.x || x,
            y: sticker.position.y || y,
            size: size || { width: 80, height: 80 },
            imageSource: imageSource || "",
          };
        });
  
        setStickers(updatedStickers);  // Set the stickers with correct x and y values
      } catch (error) {
        console.error('Error fetching stickers:', error);
      }
    };
  
    fetchStickers();
  }, []);
  
  
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/scrap-pages/get-images');
        
        const fetchedImages = response.data.map((image, index) => ({
          id: `image-${index}`,
          x: image.position.x || -600,
          y: image.position.y || index * 200,
          size: image.size,
          base64: image.base64,
        }));
        
        setImages(fetchedImages); // Update the images state with fetched data
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images.');
      }
    };
  
    fetchImages();
  }, []);

  

  useEffect(() => {
    if (pageRef.current) {
      const rect = pageRef.current.getBoundingClientRect();

      setBounds({
        top: 0,
        left: 0,
        bottom: rect.height,
        right: rect.width,
      });
    }
  }, []);

  const handleDragEnd = (event) => {
    const { delta, active } = event;

    setStickers((prevStickers) =>
      prevStickers.map((item) =>
        item.id === active.id
          ? {
              ...item,
              x: Math.min(Math.max(item.x + delta.x, bounds.left), bounds.right - item.size.width),
              y: Math.min(Math.max(item.y + delta.y, bounds.top), bounds.bottom - item.size.height),
            }
          : item
      )
    );
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === active.id
          ? {
              ...image,
              x: Math.min(Math.max(image.x + delta.x, bounds.left), bounds.right - image.size.width),
              y: Math.min(Math.max(image.y + delta.y, bounds.top), bounds.bottom - image.size.height),
            }
          : image
      )
    );
  };


  const handleSave = async () => {
    const stickerData = stickers.map((sticker) => ({
      stickerType: sticker.stickerType,
      position: { x: sticker.x, y: sticker.y },
    }));

    const imageData = images.map((image) => ({
      position: { x: image.x, y: image.y },
      base64: image.base64,
      size: image.size,
    }));
  
    
    try {
      await axios.put('http://localhost:4000/scrap-pages/save-stickers', {
        pageId: 'testPageID', // Replace with actual page ID
        stickers: stickerData,
      });
      await axios.put('http://localhost:4000/scrap-pages/save-images', {
        pageId: 'testPageID', // Replace with actual page ID
        images: imageData,
      });

      alert('Images and Stickers saved successfully!');
    } catch (err) {
      console.error('Error saving', err);
      alert('Failed to save.');
    }
  };
  
  

  return (
    <DndContext onDragEnd={handleDragEnd}>
        <Page ref={pageRef} size={750} color="#ece7f1">
        {error && <p>{error}</p>}
        {images.length > 0 ? (
          images.map((image, index) => (
            <DraggableImage
              key={index}
              id={image.id}
              position={{ x: image.x, y: image.y }}
              size={image.size}
              imageSource={image.base64}
            />
          ))
        ) : (
          <p>Loading images...</p>
        )}
          {stickers.map((item) => (
            <DraggableImage
              key={item.id}
              id={item.id}
              position={{ x: item.x, y: item.y }}
              size={item.size}
              imageSource={item.imageSource}
            />
          ))}
        </Page>
        <button
        onClick={handleSave}
        style={{
          marginTop: '20px',
          backgroundColor: '#007BFF',  // Blue background
          color: 'white',              // White text
          border: 'none',              // No border
          padding: '10px 20px',        // Padding around the text
          fontSize: '16px',            // Font size
          borderRadius: '10px',       // Rounded corners
          cursor: 'pointer',          // Pointer cursor on hover
          display: 'block',            // Center the button
          marginLeft: 'auto',          // Center horizontally
          marginRight: 'auto',         // Center horizontally
          textAlign: 'center',        // Center text
          transition: 'background-color 0.3s ease', // Smooth transition for hover effect
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')} // Hover effect
        onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')} // Hover effect
      >
        Save
      </button>

    </DndContext>
  );
  
  
  
}
