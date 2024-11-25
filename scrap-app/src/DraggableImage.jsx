import React, { forwardRef } from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableImage = forwardRef(({ id, position, imageUrl, size = { width: 100, height: 100 } }, ref) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: `translate(${position.x + (transform?.x || 0)}px, ${position.y + (transform?.y || 0)}px)`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    cursor: 'pointer',
    position: 'absolute', // Ensure proper stacking and positioning
    borderRadius: '15px', // Rounded corners
    border: '5px solid transparent', // Gradient border
    backgroundImage: 'linear-gradient(white, white), radial-gradient(circle, #ff9a9e, #fad0c4)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)', // Soft shadow
  };
  

  return (
    <img
      ref={(node) => {
        setNodeRef(node);
        if (ref) ref.current = node;
      }}
      src={imageUrl || 'https://via.placeholder.com/100'}
      alt="Draggable"
      style={style}
      {...listeners}
      {...attributes}
    />
  );
});

export default DraggableImage;
