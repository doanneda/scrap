import React, { useRef, useState, useEffect } from 'react';
import DraggableImage from './DraggableImage';
import DraggableSticker from './DraggableSticker';
import Page from './Page';
import { DndContext } from '@dnd-kit/core';

// Import stickers
import Sticker1 from './assets/stickers/frog.png';
import Sticker2 from './assets/stickers/lotus.png';

export default function DragAndDrop() {
  const pageRef = useRef(null);

  // Define initial positions and image URLs for each image
  const [images, setImages] = useState([
    { id: 'image1', x: 0, y: 0,
      imageUrl: 'https://media.discordapp.net/attachments/1297781942590378108/1309054813966958663/IMG_2665.jpg?ex=6744cd0c&is=67437b8c&hm=f92f9225d7f41588f2e58f1e3dac31621bcca79b7800447a12d54bb127cd8831&=&format=webp&width=1248&height=936',
      size: {width: 220, height: 160} },
    { id: 'image2', x: 0, y: 200,
      imageUrl: 'https://media.discordapp.net/attachments/1297781942590378108/1301389329817403493/IMG_4203.jpg?ex=67454242&is=6743f0c2&hm=04ca92b4bf16431b923b3e631f9175f626e502b66482124d94347fc16c6211cf&=&format=webp&width=1248&height=936',
      size: {width: 220, height: 160}},
    { id: 'image3', x: -300, y: 0,
      imageUrl: 'https://media.discordapp.net/attachments/1297781942590378108/1300694734745894962/IMG_4197.jpg?ex=6744b59e&is=6743641e&hm=ec630912d3923374486fe760103bce798a3c367c74dfed3056fd58370713fdd2&=&format=webp&width=1248&height=936',
      size: {width: 220, height: 160}},
    { id: 'image4', x: -300, y: 200,
      imageUrl: 'https://media.discordapp.net/attachments/1297781942590378108/1301389323136139316/IMG_4216.jpg?ex=67454241&is=6743f0c1&hm=5f28de06a5df46166c363257a430e124e8a968b0524de275acc46cde515a37d1&=&format=webp&width=1248&height=936',
      size: {width: 220, height: 160}},
    { id: 'image5', x: -300, y: 400,
      imageUrl: 'https://media.discordapp.net/attachments/1297781942590378108/1300694735567982664/IMG_4194.jpg?ex=6744b59e&is=6743641e&hm=913b88a0d33155c7da1852b1e1b8e95f37d07c1f39cdfe23ca7ca6ed88f07cfc&=&format=webp&width=702&height=936',
      size: {width: 160, height: 200}},
  ]);

  const [stickers, setStickers] = useState([
    { id: 'sticker1', x: 300, y: 200, size: { width: 80, height: 80 }, file: Sticker1 },
    { id: 'sticker2', x: 100, y: 300, size: { width: 90, height: 90 }, file: Sticker2 },
  ]);

  const [bounds, setBounds] = useState({ top: 0, left: 0, bottom: 0, right: 0 });

  useEffect(() => {
    if (pageRef.current) {
      const rect = pageRef.current.getBoundingClientRect();

      setBounds({
        top: 0,
        left: -rect.width/2,
        bottom: rect.height,
        right: rect.width/2,
      });
    }
  }, []);

  const handleDragEnd = (event) => {
    const { delta, active } = event;

    // Handle images
    if (active.id.startsWith('image')) {
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
    }
    // Handle stickers
    if (active.id.startsWith('sticker')) {
      setStickers((prevStickers) =>
        prevStickers.map((sticker) =>
          sticker.id === active.id
            ? {
                ...sticker,
                x: Math.min(Math.max(sticker.x + delta.x, bounds.left), bounds.right - sticker.size.width),
                y: Math.min(Math.max(sticker.y + delta.y, bounds.top), bounds.bottom - sticker.size.height),
              }
            : sticker
        )
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Page ref={pageRef} size={700}>
        {images.map((image) => (
          <DraggableImage
            key={image.id}
            id={image.id}
            position={{ x: image.x, y: image.y }}
            size={image.size}
            imageUrl={image.imageUrl}
          />
        ))}
        {stickers.map((sticker) => (
          <DraggableSticker
            key={sticker.id}
            id={sticker.id}
            position={{ x: sticker.x, y: sticker.y }}
            size={sticker.size}
            imageFile={sticker.file}
          />
        ))}
      </Page>
    </DndContext>
  );
}
