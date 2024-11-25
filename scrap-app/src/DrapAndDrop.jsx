import React, { useRef, useState, useEffect } from 'react';
import DraggableImage from './DraggableImage';
import { DndContext } from '@dnd-kit/core';

export default function DragAndDrop() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState({ top: 0, left: 0, bottom: 0, right: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const pageRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current) {
      const rect = pageRef.current.getBoundingClientRect();

      setBounds({
        top: 0,
        left: -rect.width/2,
        bottom: rect.height,
        right: rect.width/2, // Weird behavior with the x-coords but okay
      });
    }

    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setImageDimensions({ width, height });
    }
  }, []);

  const handleDragEnd = (event) => {
    const { delta } = event;

    setPosition((prev) => {
      const nextX = prev.x + delta.x;
      const nextY = prev.y + delta.y;

      return {
        x: Math.min(
          Math.max(nextX, bounds.left),
          bounds.right - imageDimensions.width
        ),
        y: Math.min(
          Math.max(nextY, bounds.top),
          bounds.bottom - imageDimensions.height
        ),
      };
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        ref={pageRef}
        style={{
          position: 'relative',
          width: '300px',
          height: '300px',
          border: '2px dashed black',
          margin: '50px auto',
        }}
      >
        <DraggableImage ref={imageRef} position={position} />
      </div>
    </DndContext>
  );
}
