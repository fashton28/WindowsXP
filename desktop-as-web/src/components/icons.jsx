import React from 'react'
import Note from './Note'
import useStore from '../store/useStore'    
const icons = () => {
    const notes = useStore((state) => state.notes);
  return (
    <div>
        <div className="fixed left-4 top-15 ml-6 flex flex-col items-center gap-10 z-10">
           <button className='cursor-pointer'>
                <img src="/assets/notes.webp" alt="" />
           </button>
           <button className='cursor-pointer'>
                <img src="/assets/notes.webp" alt="" />
           </button>
           <button className='cursor-pointer'>
                <img src="/assets/notes.webp" alt="" />
           </button>
           {notes && notes.map((note, idx) => (
            <Note
              key={idx}
              id={idx}
              title={note.title}
              content={note.content}
              idx={idx}
            />
           ))}
        </div>
    </div>
  )
}

export default icons