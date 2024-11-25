import React, { forwardRef } from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableImage = forwardRef(({ position, imageUrl }, ref) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable-image',
  });

  const style = {
    transform: `translate(${position.x + (transform?.x || 0)}px, ${position.y + (transform?.y || 0)}px)`,
    width: '100px',
    height: '100px',
    cursor: 'pointer',
    position: 'absolute', // Absolute positioning for precise placement
    border: '2px solid #007bff',
    borderRadius: '5px',
  };

  return (
    <img
      ref={(node) => {
        setNodeRef(node); // Set the draggable node reference
        if (ref && typeof ref === 'object' && ref.current !== node) {
          ref.current = node; // Forward the ref to the parent if it exists
        }
      }}
      src={imageUrl || 'https://www.corvallisadvocate.com/wp-content/uploads/2015/09/blob-fish.jpg'} // default image may be changed
      alt="Draggable"
      style={style}
      {...listeners}
      {...attributes}
    />
  );
});

export default DraggableImage;
