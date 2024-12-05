import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DraggableImage from './DraggableImage';
import Page from './Page';
import { DndContext } from '@dnd-kit/core';
import { stickerMapping } from './stickerMapping';
import { useNavigate } from 'react-router-dom';

export default function DragAndDrop() {
  const { pageId } = useParams();
  const pageRef = useRef(null);

  const [stickers, setStickers] = useState([]);
  const [images, setImages] = useState([]);
  const [bounds, setBounds] = useState({ top: 0, left: 0, bottom: 0, right: 0 });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Initialize stickers from stickerMapping
  useEffect(() => {
    const initializedStickers = Object.keys(stickerMapping).map((key) => ({
      id: key,
      stickerType: key,
      ...stickerMapping[key],
    }));
    setStickers(initializedStickers);
  }, []);

  // Fetch images from backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post('http://localhost:4000/scrap-pages/get-images', { pageId });

        const fetchedImages = response.data.map((image, index) => ({
          id: `image-${index}`,
          x: 0, // Place images on the left side
          y: index * 120, // Space out images vertically
          size: image.size || { width: 100, height: 100 }, // Default size if not provided
          base64Data: `${image.base64Data}`,
        }));

        setImages(fetchedImages);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images.');
      }
    };

    fetchImages();
  }, [pageId]);

  // Set bounds for dragging
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

  // Handle drag end
  const handleDragEnd = (event) => {
    const { delta, active } = event;

    const updatePosition = (items) =>
      items.map((item) =>
        item.id === active.id
          ? {
              ...item,
              x: Math.min(Math.max(item.x + delta.x, bounds.left), bounds.right - item.size.width),
              y: Math.min(Math.max(item.y + delta.y, bounds.top), bounds.bottom - item.size.height),
            }
          : item
      );

    setStickers((prevStickers) => updatePosition(prevStickers));
    setImages((prevImages) => updatePosition(prevImages));
  };

  // Handle save
  const handleSave = async () => {
    const stickerData = stickers.map((sticker) => ({
      stickerType: sticker.stickerType,
      position: { x: sticker.x, y: sticker.y },
    }));

    const imageData = images.map((image) => ({
      position: { x: image.x, y: image.y },
      base64Data: image.base64Data,
      size: image.size,
    }));

    try {
      await axios.put('http://localhost:4000/scrap-pages/save-stickers', {
        pageId: pageId,
        stickers: stickerData,
      });
      await axios.put('http://localhost:4000/scrap-pages/save-images', {
        pageId: pageId,
        images: imageData,
      });

      alert('Images and Stickers saved successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error saving:', err);
      alert('Failed to save.');
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Page ref={pageRef} size={750} color="#ece7f1">
        {error && <p>{error}</p>}
        {images.length > 0 ? (
          images.map((image) => (
            <DraggableImage
              key={image.id}
              id={image.id}
              position={{ x: image.x, y: image.y }}
              size={image.size}
              imageSource={image.base64Data} // Ensure the base64 data is correctly passed
            />
          ))
        ) : (
          <p>Loading images...</p>
        )}
        {stickers.map((sticker) => (
          <DraggableImage
            key={sticker.id}
            id={sticker.id}
            position={{ x: sticker.x, y: sticker.y }}
            size={sticker.size}
            imageSource={sticker.imageSource}
          />
        ))}
      </Page>
      <button
        onClick={handleSave}
        style={{
          marginTop: '20px',
          backgroundColor: '#5C4033',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '10px',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#3A2011')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#5C4033')}
      >
        Save
      </button>
    </DndContext>
  );
}