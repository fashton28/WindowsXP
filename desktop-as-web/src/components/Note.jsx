import React, { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'

const DraggableNote = ({ id, position, children, dragListeners }) => {
  const {attributes, setNodeRef, transform} = useDraggable({id});
  const style = {
    position: 'absolute',
    left: (position?.x || 0) + (transform ? transform.x : 0),
    top: (position?.y || 0) + (transform ? transform.y : 0),
    zIndex: 10,
    cursor: 'move',
  };
//Create New Tab with Dragability just like the notes. and a text area

  return (
    <div ref={setNodeRef} style={style} {...dragListeners} {...attributes}>
        {children}
    </div>
  );
};


const Note = ({title, content, id, position, tabs, setTabs}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const { listeners } = useDraggable({ id });

  const handleCreateTab = () => {
    const lastNote = notes.length > 0 ? notes[notes.length - 1] : null;
    const lastPos = lastNote && lastNote.position ? lastNote.position : { x: 0, y: 0 };
    const newPos = {x:lastPos.x, y:lastPos.y + 60};
    setLastPosition(newPos);
    setTabs([...tabs, { mainTitle: {title}, innerText: "" }]);
    console.log(tabs);
    
  };

  return (
    <DraggableNote id={id} position={position} dragListeners={isEditing ? {} : listeners}>
      <div className='flex flex-col items-center justify-center w-20 h-20'>
        <button className='cursor-pointer' onDoubleClick={handleCreateTab}><img src="/src/assets/notes.webp" alt="" /></button>
        {isEditing ? (
          <input
S            type="text"
            className='w-30 bg-blue-200 border-none outline-none'
            autoFocus
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={e => {
            if (e.key === 'Enter') {
              setIsEditing(false);
            }
          }}
          />
        ) : (
          <h1 onDoubleClick={() => setIsEditing(true)}>{inputValue}</h1>
        )}
        <p>{content}</p>
      </div>
    </DraggableNote>
  ) 
}

export default Note
