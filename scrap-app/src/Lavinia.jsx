import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import Droppable from './Droppable';
import Draggable from './Draggable';
import {Translate} from '@dnd-kit/core';

export default function App() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );

  const [{translate}, setTranslate] = useState<{
    initialTranslate: Translate,
    translate: Translate,
  }>({initialTranslate: defaultCoordinates, translate: defaultCoordinates});
  
  return (
    <DndContext
      onDragMove={({delta}) => {
        setTranslate(({initialTranslate}) => ({
          initialTranslate,
          translate: {
            x: initialTranslate.x + delta.x - initialWindowScroll.x,
            y: initialTranslate.y + delta.y - initialWindowScroll.y,
          },
        }));
      }}
      onDragEnd={() => {
        setTranslate(({translate}) => {
          return {
            translate,
            initialTranslate: translate,
          };
        });
        setInitialWindowScroll(defaultCoordinates);
      }}
      onDragCancel={() => {
        setTranslate(({initialTranslate}) => ({
          translate: initialTranslate,
          initialTranslate,
        }));
        setInitialWindowScroll(defaultCoordinates);
      }}
      >
        <DraggableItem
          axis={axis}
          label={label}
          handle={handle}
          style={style}
          translate={translate}
        />
    </DndContext>
  );

    function DraggableItem({
      axis,
      label,
      style,
      translate,
      handle,
    }) {
      const {attributes, isDragging, listeners, setNodeRef} = useDraggable({
        id: 'draggable',
      });
    
      return (
        <Draggable
          ref={setNodeRef}
          dragging={isDragging}
          handle={handle}
          label={label}
          listeners={listeners}
          style={style}
          translate={translate}
          axis={axis}
          {...attributes}
        />
      );
    }
  
};