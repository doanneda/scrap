import React, { useRef, useState, useEffect } from 'react';
import DraggableImage from './DraggableImage';
import Page from './Page';
import { DndContext } from '@dnd-kit/core';

// Import stickers
import Sticker1 from './assets/stickers/frog.png';
import Sticker2 from './assets/stickers/lotus.png';

export default function DragAndDrop() {
  const pageRef = useRef(null);

  // Define initial positions and sources for draggable items
  const [items, setItems] = useState([
    { id: 'image1', x: 0, y: 0, imageSource: 'https://media.discordapp.net/attachments/1297781942590378108/1309054813966958663/IMG_2665.jpg?ex=67461e8c&is=6744cd0c&hm=d5f0cc84085405dbd0d93bcf06de9a563d937450185e9cf22f8fb9f7fe65f3fc&=&format=webp&width=1248&height=936', size: { width: 220, height: 160 } },
    { id: 'image2', x: 0, y: 200, imageSource: 'https://media.discordapp.net/attachments/1297781942590378108/1301389329817403493/IMG_4203.jpg?ex=67454242&is=6743f0c2&hm=04ca92b4bf16431b923b3e631f9175f626e502b66482124d94347fc16c6211cf&=&format=webp&width=1248&height=936', size: { width: 220, height: 160 } },
    { id: 'image3', x: -300, y: 0, imageSource: 'https://media.discordapp.net/attachments/1297781942590378108/1300694734745894962/IMG_4197.jpg?ex=6746071e&is=6744b59e&hm=1867ef71732da34c8e6afc380e8a11d4a30e5ad2180e91523877a7b1ec2c345e&=&format=webp&width=1248&height=936', size: { width: 220, height: 160 } },
    { id: 'image4', x: -300, y: 200, imageSource: 'https://media.discordapp.net/attachments/1297781942590378108/1301389323136139316/IMG_4216.jpg?ex=67454241&is=6743f0c1&hm=5f28de06a5df46166c363257a430e124e8a968b0524de275acc46cde515a37d1&=&format=webp&width=1248&height=936', size: { width: 220, height: 160 } },
    { id: 'image5', x: -300, y: 400, imageSource: 'https://media.discordapp.net/attachments/1297781942590378108/1300694735567982664/IMG_4194.jpg?ex=6744b59e&is=6743641e&hm=913b88a0d33155c7da1852b1e1b8e95f37d07c1f39cdfe23ca7ca6ed88f07cfc&=&format=webp&width=702&height=936', size: { width: 160, height: 200 } },
    { id: 'sticker1', x: 300, y: 200, imageSource: Sticker1, size: { width: 80, height: 80 } },
    { id: 'sticker2', x: 100, y: 300, imageSource: Sticker2, size: { width: 90, height: 90 } },
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
