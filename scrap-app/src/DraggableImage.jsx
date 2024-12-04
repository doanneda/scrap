import React, { forwardRef } from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableImage = forwardRef(
  ({ id, position, imageSource, size = { width: 100, height: 100 } }, ref) => {
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
    };

    // Determine the image source (URL or base64-encoded file)
    const getImageSource = () => {
      if (typeof imageSource === 'string') {
        return imageSource;
      }
    
      if (imageSource instanceof File) {
        return URL.createObjectURL(imageSource); // Create URL for the file
      }
    
      return 'https://via.placeholder.com/100'; // Fallback
    };
    

    return (
      <img
        ref={(node) => {
          setNodeRef(node);
          if (ref) ref.current = node;
        }}
        src={getImageSource()}
        alt="Draggable"
        style={style}
        {...listeners}
        {...attributes}
      />
    );
  }
);

export default DraggableImage;
