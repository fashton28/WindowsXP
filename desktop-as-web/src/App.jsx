import { useEffect } from 'react'
import SearchBar from './components/SearchBar'
import Panel from './components/Panel'
import Note from './components/Note'
import Tab from './components/window'
import { DndContext } from '@dnd-kit/core';
import './App.css'
import useStore from './store/useStore';
import Icons from './components/icons';

function App() {
  const sideBar = useStore((state) => state.sideBar[0]);
  const setSideBar = useStore((state) => state.setSideBar);
  const notes = useStore((state) => state.notes);
  const tabs = useStore((state) => state.tabs);
  const lastPosition = useStore((state) => state.lastPosition[0]);
  const setLastPosition = useStore((state) => state.setLastPosition);
  const setNotes = useStore((state) => state.setNotes);
  const setTabs = useStore((state) => state.setTabs);

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
      className='w-screen h-screen bg-cover bg-center bg-no-repeat bg-[url(/assets/windowsxp.jpeg)] overflow-hidden'
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div id='panel' className='absolute bottom-8'>
        {sideBar ? <Panel /> : null}
      </div>

      <div className=''>
        <Icons />
      </div>



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
        <SearchBar />
      </div>
    </div>
  )
}

export default App
