import React from 'react'
import { useDraggable } from '@dnd-kit/core'

const DraggableNote = ({ id, position, children }) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({id});
  const style = {
    position: 'absolute',
    left: (position?.x || 0) + (transform ? transform.x : 0),
    top: (position?.y || 0) + (transform ? transform.y : 0),
    zIndex: 10,
    cursor: 'move',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

const Note = ({title, content, id, position}) => {
  return (
    <DraggableNote id={id} position={position}>
      <div className='flex flex-col items-center justify-center w-40 h-40'>
         <button className='cursor-pointer'><img src="/src/assets/notes.webp" alt="" /></button>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </DraggableNote>
  )
}

export default Note
