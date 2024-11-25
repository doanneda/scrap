import React, { forwardRef } from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableSticker = forwardRef(({ position, size = { width: 100, height: 100 }, imageFile }, ref) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `sticker-${imageFile}`, // Unique ID for each sticker
  });

  const style = {
    transform: `translate(${position.x + (transform?.x || 0)}px, ${position.y + (transform?.y || 0)}px)`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    cursor: 'pointer',
    position: 'absolute', // Ensure proper stacking and positioning
  };

  return (
    <img
      ref={(node) => {
        setNodeRef(node); // Register for dragging
        if (ref) ref.current = node; // Assign ref if provided
      }}
      src={imageFile} // Use local image file
      alt="Sticker"
      style={style}
      {...listeners}
      {...attributes}
    />
  );
});

export default DraggableSticker;
