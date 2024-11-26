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

  const [stickers, setStickers] = useState([
    { id: 'frog', x: 400, y: 0, imageSource: Frog, stickerType: 'frog', size: { width: 80, height: 80 } },
    { id: 'lotus', x: 550, y: 0, imageSource: Lotus, stickerType: 'lotus', size: { width: 100, height: 90 } },
    { id: 'clothespin', x: 700, y: 0, imageSource: Clothespin, stickerType: 'clothespin', size: { width: 50, height: 100 } },
    { id: 'dipper', x: 400, y: 150, imageSource: Dipper, stickerType: 'dipper', size: { width: 140, height: 90 } },
    { id: 'flower', x: 550, y: 150, imageSource: Flower, stickerType: 'flower', size: { width: 80, height: 80 } },
    { id: 'heart', x: 700, y: 150, imageSource: Heart, stickerType: 'heart', size: { width: 80, height: 80 } },
    { id: 'humanheart', x: 400, y: 300, imageSource: HumanHeart, stickerType: 'humanheart', size: { width: 90, height: 120 } },
    { id: 'leaf', x: 550, y: 300, imageSource: Leaf, stickerType: 'leaf', size: { width: 90, height: 100 } },
    { id: 'moon', x: 700, y: 300, imageSource: Moon, stickerType: 'moon', size: { width: 50, height: 80 } },
    { id: 'orange', x: 400, y: 450, imageSource: Orange, stickerType: 'orange', size: { width: 80, height: 90 } },
    { id: 'star', x: 550, y: 450, imageSource: Star, stickerType: 'star', size: { width: 90, height: 90 } },
    { id: 'virus', x: 700, y: 450, imageSource: Virus, stickerType: 'virus', size: { width: 90, height: 90 } },
    { id: 'wing', x: 400, y: 600, imageSource: Wing, stickerType: 'wing', size: { width: 80, height: 90 } },
    { id: 'lick', x: 550, y: 550, imageSource: Lick, stickerType: 'lick', size: { width: 210, height: 80 } },
    { id: 'fence', x: 550, y: 650, imageSource: Fence, stickerType: 'fence', size: { width: 210, height: 60 } },
  ]);
  

  const [bounds, setBounds] = useState({ top: 0, left: 0, bottom: 0, right: 0 });
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);


  useEffect(() => {
    const fetchScrapData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/scrap-pages');
        
        const pageData = res.data[12]; // Change this index depending on what the current page is
        
        const imagesArray = pageData.binaryImages.map((image, index) => ({
          id: `image-${index}`,
          x: -600, 
          y: index*200,
          size: { width: 200, height: 200 },
          binaryImages: image,
        }));
        
        setImages(imagesArray);
      } catch (err) {
        console.error('Error fetching scrapbook data:', err);
        setError('Failed to load scrapbook data.');
      }
    };
  
    fetchScrapData();
  }, []);
  

  useEffect(() => {
    if (pageRef.current) {
      const rect = pageRef.current.getBoundingClientRect();

      setBounds({
        top: 0,
        left: -rect.width / 2,
        bottom: rect.height,
        right: rect.width / 2,
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
    const preparedData = stickers.map((sticker) => ({
      stickerType: sticker.stickerType,
      position: { x: sticker.x, y: sticker.y },
    }));

    try {
      await axios.post('http://localhost:4000/save-stickers', { stickers: preparedData });
      alert('Stickers saved successfully!');
    } catch (err) {
      console.error('Error saving stickers:', err);
      alert('Failed to save stickers.');
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
              imageSource={image.binaryImages}
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
        <button onClick={handleSave} style={{ marginTop: '20px' }}>
          Save Stickers
        </button>
    </DndContext>
  );
  
  
  
}
