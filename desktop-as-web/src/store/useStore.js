import { create } from 'zustand';

const useStore = create((set, get) => ({
    sideBar: [false],
    notes: [],
    tabs: [],
    lastPosition: [{ x: 0, y: 0 }],
    icons: [],
    // ... other state
  
    createNote: () => {
      const notes = get().notes;
      const lastNote = notes.length > 0 ? notes[notes.length - 1] : null;
      // const lastPos = lastNote && lastNote.position ? lastNote.position : { x: 0, y: 0 };
      // const newPos = { x: lastPos.x, y: lastPos.y + 60 };

      set((state) => ({
        sideBar: [false],
        // lastPosition: [newPos],
        notes: [
          ...state.notes,
          {
            title: `note${state.notes.length + 1}.txt`,
            content: "",
            // position: newPos,
            isOpen: false,
          },
        ],
      }));
    },
    setNotes: (notesUpdater) => set((state) => ({
      notes: typeof notesUpdater === 'function' ? notesUpdater(state.notes) : notesUpdater
    })),
    setTabs: (tabsUpdater) => set((state) => ({
      tabs: typeof tabsUpdater === 'function' ? tabsUpdater(state.tabs) : tabsUpdater
    })),
    setSideBar: (sideBarUpdater) => set((state) => ({
      sideBar: typeof sideBarUpdater === 'function' ? sideBarUpdater(state.sideBar) : [sideBarUpdater]
    })),
    setLastPosition: (lastPositionUpdater) => set((state) => ({
      lastPosition: typeof lastPositionUpdater === 'function' ? lastPositionUpdater(state.lastPosition) : [lastPositionUpdater]
    })),
  }));
  
  export default useStore;