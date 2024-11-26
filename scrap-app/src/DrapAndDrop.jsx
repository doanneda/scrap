import React, { useRef, useState, useEffect } from 'react';
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

  const [items, setItems] = useState([
    { id: 'image1', x: -650, y: 0, imageSource: 'https://media.discordapp.net/attachments/1297781942590378108/1309054813966958663/IMG_2665.jpg?ex=67461e8c&is=6744cd0c&hm=d5f0cc84085405dbd0d93bcf06de9a563d937450185e9cf22f8fb9f7fe65f3fc&=&format=webp&width=1248&height=936', size: { width: 220, height: 160 } },
    { id: 'image2', x: -650, y: 180, imageSource: 'https://media.discordapp.net/attachments/1297781942590378108/1301389329817403493/IMG_4203.jpg?ex=6745eb02&is=67449982&hm=5b979ddda8b16fd29cd520d5517f4f70937bcfc8ff6ef81d58a4859587a72187&=&format=webp&width=1248&height=936', size: { width: 220, height: 160 } },
    { id: 'image3', x: -650, y: 360, imageSource: 'https://media.discordapp.net/attachments/1297781942590378108/1301389323136139316/IMG_4216.jpg?ex=6745eb01&is=67449981&hm=0ad9bb43552bf79000e4cc6b7617f4f2eb5efb60bde25463290dc740d5dd98cb&=&format=webp&width=1248&height=936', size: { width: 220, height: 160 } },
    { id: 'image4', x: -650, y: 540, imageSource: 'https://media.discordapp.net/attachments/1297781942590378108/1300694734745894962/IMG_4197.jpg?ex=6746071e&is=6744b59e&hm=1867ef71732da34c8e6afc380e8a11d4a30e5ad2180e91523877a7b1ec2c345e&=&format=webp&width=1248&height=936', size: { width: 220, height: 160 } },
    { id: 'frog', x: 400, y: 0, imageSource: Frog, size: { width: 80, height: 80 } },
    { id: 'lotus', x: 550, y: 0, imageSource: Lotus, size: { width: 100, height: 90 } },
    { id: 'clothespin', x: 700, y: 0, imageSource: Clothespin, size: { width: 50, height: 100 } },
    { id: 'dipper', x: 400, y: 150, imageSource: Dipper, size: { width: 140, height: 90 } },
    { id: 'flower', x: 550, y: 150, imageSource: Flower, size: { width: 80, height: 80 } },
    { id: 'heart', x: 700, y: 150, imageSource: Heart, size: { width: 80, height: 80 } },
    { id: 'humanheart', x: 400, y: 300, imageSource: HumanHeart, size: { width: 90, height: 120 } },
    { id: 'leaf', x: 550, y: 300, imageSource: Leaf, size: { width: 90, height: 100 } },
    { id: 'moon', x: 700, y: 300, imageSource: Moon, size: { width: 50, height: 80 } },
    { id: 'orange', x: 400, y: 450, imageSource: Orange, size: { width: 80, height: 90 } },
    { id: 'star', x: 550, y: 450, imageSource: Star, size: { width: 90, height: 90 } },
    { id: 'virus', x: 700, y: 450, imageSource: Virus, size: { width: 90, height: 90 } },
    { id: 'wing', x: 400, y: 600, imageSource: Wing, size: { width: 80, height: 90 } },
    { id: 'lick', x: 550, y: 550, imageSource: Lick, size: { width: 210, height: 80 } },
    { id: 'fence', x: 550, y: 650, imageSource: Fence, size: { width: 210, height: 60 } },
  ]);
  

  const [bounds, setBounds] = useState({ top: 0, left: 0, bottom: 0, right: 0 });

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

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === active.id
          ? {
              ...item,
              x: Math.min(Math.max(item.x + delta.x, bounds.left), bounds.right - item.size.width),
              y: Math.min(Math.max(item.y + delta.y, bounds.top), bounds.bottom - item.size.height),
            }
          : item
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
        <Page ref={pageRef} size={750} color="#ece7f1">
          {items.map((item) => (
            <DraggableImage
              key={item.id}
              id={item.id}
              position={{ x: item.x, y: item.y }}
              size={item.size}
              imageSource={item.imageSource}
            />
          ))}
        </Page>
    </DndContext>
  );
  
  
  
}
