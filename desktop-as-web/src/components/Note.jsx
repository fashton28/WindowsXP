import React, { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import useStore from '../store/useStore';

const DraggableNote = ({ id, position, children, isEditing }) => {
  const {attributes, setNodeRef, transform} = useDraggable({id, disabled: isEditing});
  const style = {
    position: 'absolute',
    left: (position?.x || 0) + (transform ? transform.x : 0),
    top: (position?.y || 0) + (transform ? transform.y : 0),
    zIndex: 10,
    cursor: isEditing ? 'default' : 'move',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
        {children}
    </div>
  );
};

const Note = ({title, content, id, position, idx}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const tabs = useStore((state) => state.tabs);
  const setTabs = useStore((state) => state.setTabs);
  const notes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);
   const isOpen = useStore((state) => state.notes[id].isOpen);

  const handleCreateTab = () => {
    const newTab = {
      mainTitle: { title: inputValue },
      FinnerText: "",
      position: { x: 100 + tabs.length * 50, y: 100 + tabs.length * 50 }
    };
    setTabs([...tabs, newTab]);
    setNotes(notes => notes.map((note, i) => {
      if (i === id) {
        return { ...note, isOpen: true };
      }
      return note;
    }));
  };

  return (
    <DraggableNote id={id} position={position} isEditing={isEditing}>
      <div className='flex flex-col items-center justify-center w-20 h-20'>
        <button
          className='cursor-pointer'
          onDoubleClick={() => {
            setNotes(notes =>
              notes.map((note, i) =>
                i === id ? { ...note, isOpen: true } : note
              )
            );
            if (!notes[id].isOpen) {
              handleCreateTab();
            }
          }}
        >
          <img src="/assets/notes.webp" alt="" />
        </button>
        {isEditing ? (
          <input
            type="text"
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
