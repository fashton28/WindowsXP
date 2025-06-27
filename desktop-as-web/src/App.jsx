import { useState,useEffect } from 'react'  
import SearchBar from './components/SearchBar'
import Panel from './components/Panel'
import Note from './components/note'
import Tab from './components/window'
import { DndContext } from '@dnd-kit/core';
import './App.css'

function App() {
  const [sideBar, setSideBar] = useState(false);
  const [notes, setNotes] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [lastPosition, setLastPosition] = useState({x: 0, y: 0})

  const handleDragEnd = (event) => {
    const {active, delta} = event;
    
    // Handle notes (numeric IDs)
    if (typeof active.id === 'number') {
      const idx = notes.findIndex((_, i) => i === active.id);
      if (idx !== -1) {
        setNotes(notes => notes.map((note, i) => {
          if (i !== idx) return note;
          const prev = note.position || {x: 0, y: 0};
          return {
            ...note,
            position: {
              x: prev.x + delta.x,
              y: prev.y + delta.y
            }
          };
        }));
      }
    }
    
    // Handle tabs (string IDs with 'tab-' prefix)
    if (typeof active.id === 'string' && active.id.startsWith('tab-')) {
      const tabId = parseInt(active.id.replace('tab-', ''));
      setTabs(tabs => tabs.map((tab, i) => {
        if (i !== tabId) return tab;
        const prev = tab.position || {x: 100 + i * 50, y: 100 + i * 50};
        return {
          ...tab,
          position: {
            x: prev.x + delta.x,
            y: prev.y + delta.y
          }
        };
      }));
    }
  };

  return (
    <div
      className='w-screen h-screen bg-cover bg-center bg-no-repeat bg-[url(/src/assets/windowsxp.jpeg)] overflow-hidden'
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div id='panel' className='absolute bottom-8'>
        {sideBar ? <Panel notes = {notes} setNotes = {setNotes} setSideBar = {setSideBar} lastPosition = {lastPosition} setLastPosition = {setLastPosition} /> : null}
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className=' bg-transparent w-100 h-100 flex-col '>
          {notes && notes.map((note, idx) => (
            <Note
              key={idx}
              id={idx}
              title={note.title}
              content={note.content}
              position={note.position}
              lastPosition = {lastPosition}
              setLastPosition = {setLastPosition}
              idx={idx}
              tabs ={tabs}
              setTabs = {setTabs}
            />
          ))}
        </div>
      </DndContext>

      <div>
        {tabs.length > 0 && tabs.map((tab, idx) => (
              <Tab
                key={idx}
                id={idx}
                title={tab.mainTitle?.title || `Tab ${idx + 1}`}
                content={tab.innerText || ""}
                position={tab.position || { x: 100 + idx * 50, y: 100 + idx * 50 }}
              />
            ))}
      </div>

      <div className='absolute bottom-0 w-full'>
        <SearchBar sideBar = {sideBar} setSideBar={setSideBar}/>
      </div>
    </div>
  )
}

export default App
