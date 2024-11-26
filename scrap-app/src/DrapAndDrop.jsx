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
        left: 0,
        bottom: rect.height,
        right: rect.width,
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
        <Page ref={pageRef} size={700}>
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
