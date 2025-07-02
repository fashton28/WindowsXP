import React, { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import useStore from '../store/useStore';
import ReactMarkdown from 'react-markdown';


const DraggableTab = ({ id, position, children }) => {
  const {attributes, setNodeRef, transform} = useDraggable({id: `tab-${id}`});
  const style = {
    position: 'absolute',
    left: (position?.x || 0) + (transform ? transform.x : 0),
    top: (position?.y || 0) + (transform ? transform.y : 0),
    zIndex: 20,
    cursor: 'move',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
        {children}
    </div>
  );
};

const Tab = ({ id, title, content, position }) => {
  const [textContent, setTextContent] = useState(content);
  const isOpen = useStore((state) => state.notes[id]?.isOpen);
  const setNotes = useStore((state) => state.setNotes);
  const isExpanded = useStore((state) => state.notes[id]?.isExpanded);

  // Handler to close the tab (set isOpen to false for this note/tab)
  const handleClose = () => {
    setNotes((notes) =>
      notes.map((note, idx) =>
        idx === id ? { ...note, isOpen: false } : note
      )
    );
  };

  const handleExpand = () => {
    setNotes((notes) =>
      notes.map((note, idx) =>
        idx === id ? { ...note, isExpanded: !note.isExpanded } : note
      )
    );
  };

  if (!isOpen) return null;

  // If expanded, set styles for fullscreen, else use windowed styles
  const windowStyle = isExpanded
    ? {
        width: '100vw',
        height: '100vh',
        border: '2px solid #000',
        background: '#fff',
        boxShadow: '2px 2px 0 #888',
        fontFamily: 'Tahoma, Geneva, sans-serif',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        zIndex: 9999,
      }
    : {
        width: 400,
        height: 250,
        border: '2px solid #000',
        background: '#fff',
        boxShadow: '2px 2px 0 #888',
        fontFamily: 'Tahoma, Geneva, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      };

  const contentAreaStyle = isExpanded
    ? {
        background: '#fff',
        height: 'calc(100% - 46px)',
        overflow: 'auto',
        position: 'relative',
        borderRight: '1px solid #888',
        borderBottom: '1px solid #888',
        borderLeft: '1px solid #888',
        borderTop: 'none',
        margin: 0,
        padding: '8px',
        minHeight: 0,
      }
    : {
        background: '#fff',
        height: 'calc(100% - 46px)',
        overflow: 'auto',
        position: 'relative',
        borderRight: '1px solid #888',
        borderBottom: '1px solid #888',
        borderLeft: '1px solid #888',
        borderTop: 'none',
        margin: 0,
        padding: '8px',
      };

  return (
    <DraggableTab id={id} position={position} isExpanded={isExpanded}>
      <div style={windowStyle}>
        {/* Title Bar */}
        <div
          style={{
            background: '#000080',
            color: '#fff',
            padding: '2px 8px',
            fontWeight: 'bold',
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            height: 24,
          }}
        >
          <span style={{ marginRight: 8, fontSize: 14 }}>📄</span>
          <span style={{ flex: 1 }}>{title}</span>
          <span
            style={{
              fontWeight: 'normal',
              fontSize: 13,
              marginRight: 6,
              cursor: 'pointer',
            }}
          >
            ?
          </span>
          <span
            style={{
              fontWeight: 'normal',
              fontSize: 13,
              cursor: 'pointer',
            }}
            onClick={handleExpand}
          >
            ▢
          </span>
          <span
            id="close-tab"
            style={{
              fontWeight: 'normal',
              fontSize: 13,
              marginLeft: 6,
              cursor: 'pointer',
            }}
            onClick={handleClose}
          >
            ✕
          </span>
        </div>
        {/* Menu Bar */}
        <div
          style={{
            background: '#c0c0c0',
            color: '#000',
            padding: '2px 8px',
            fontSize: 14,
            borderBottom: '1px solid #888',
            height: 22,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span>File</span>
          <span>Edit</span>
          <span>Sizes</span>
          <span>Window</span>
        </div>
        {/* Content Area */}
        <div style={contentAreaStyle}>
          <textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontFamily: 'Tahoma, Geneva, sans-serif',
              fontSize: 14,
            }}
            placeholder="Start typing..."
          />
        </div>
        {/* Scrollbar (visual only) */}
        {!isExpanded && (
          <div
            style={{
              position: 'absolute',
              right: 2,
              top: 46,
              width: 16,
              height: 'calc(100% - 48px)',
              background: '#f0f0f0',
              borderLeft: '1px solid #888',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 12,
                height: 40,
                background: '#c0c0c0',
                border: '1px solid #888',
                marginTop: 4,
                borderRadius: 2,
              }}
            ></div>
          </div>
        )}
      </div>
    </DraggableTab>
  );
};

export default Tab
