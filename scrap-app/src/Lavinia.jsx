import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function DraggableButton() {
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
      <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        Drag Me
      </button>
    );
  }

  const handleDragEnd = (event) => {
    const { delta } = event;
    setPosition((prevPosition) => ({
      x: prevPosition.x + delta.x,
      y: prevPosition.y + delta.y,
    }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <DraggableButton />
      </div>
    </DndContext>
  );
}

export default App;
