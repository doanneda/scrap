// App.js
import React, { useState, useRef, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import DraggableButton from './DraggableButton';
import Page from './Page';

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const pageRef = useRef(null);
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

  // Calculate bounds on component mount and when pageRef changes
  useEffect(() => {
    if (pageRef.current) {
      const rect = pageRef.current.getBoundingClientRect();
      setBounds({
        left: 0 - rect.width/2 + 50,
        top: 0 - rect.height/2 + 25,
        right: rect.width/2 - 50, // Button width
        bottom: rect.height/2 - 25, // Button height
      });
    }
  }, [pageRef]);

  const handleDragEnd = (event) => {
    const { delta } = event;
    setPosition((prevPosition) => {
      const newX = prevPosition.x + delta.x;
      const newY = prevPosition.y + delta.y;

      // Constrain within bounds
      return {
        x: Math.max(bounds.left, Math.min(newX, bounds.right)),
        y: Math.max(bounds.top, Math.min(newY, bounds.bottom)),
      };
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Page ref={pageRef}>
        <DraggableButton position={position} />
      </Page>
    </DndContext>
  );
}

export default App;
