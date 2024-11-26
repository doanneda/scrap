import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function DraggableButton({ position, onDragEnd }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable-button',
  });

  const style = {
    transform: `translate(${position.x + (transform?.x || 0)}px, ${position.y + (transform?.y || 0)}px)`,
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    position: 'relative',
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      Drag Me
    </button>
  );
}

export default DraggableButton;
