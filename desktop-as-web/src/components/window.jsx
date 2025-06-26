import React from 'react'

const ClassicTextEditorWindow = () => {
  return (
    <div style={{
      width: 400,
      height: 250,
      border: '2px solid #000',
      background: '#fff',
      boxShadow: '2px 2px 0 #888',
      fontFamily: 'Tahoma, Geneva, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Title Bar */}
      <div style={{
        background: '#000080',
        color: '#fff',
        padding: '2px 8px',
        fontWeight: 'bold',
        fontSize: 15,
        display: 'flex',
        alignItems: 'center',
        height: 24
      }}>
        <span style={{marginRight: 8, fontSize: 14}}>📄</span>
        <span style={{flex: 1}}>Text File Editor - README.TXT</span>
        <span style={{fontWeight: 'normal', fontSize: 13, marginRight: 6, cursor: 'pointer'}}>?</span>
        <span style={{fontWeight: 'normal', fontSize: 13, cursor: 'pointer'}}>▢</span>
        <span style={{fontWeight: 'normal', fontSize: 13, marginLeft: 6, cursor: 'pointer'}}>✕</span>
      </div>
      {/* Menu Bar */}
      <div style={{
        background: '#c0c0c0',
        color: '#000',
        padding: '2px 8px',
        fontSize: 14,
        borderBottom: '1px solid #888',
        height: 22,
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }}>
        <span>File</span>
        <span>Edit</span>
        <span>Sizes</span>
        <span>Window</span>
      </div>
      {/* Content Area */}
      <div style={{
        background: '#fff',
        height: 'calc(100% - 46px)',
        overflow: 'auto',
        position: 'relative',
        borderRight: '1px solid #888',
        borderBottom: '1px solid #888',
        borderLeft: '1px solid #888',
        borderTop: 'none',
        margin: 0,
        padding: 0
      }}>
        {/* Empty content, like the image */}
      </div>
      {/* Scrollbar (visual only) */}
      <div style={{
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
        alignItems: 'center'
      }}>
        <div style={{
          width: 12,
          height: 40,
          background: '#c0c0c0',
          border: '1px solid #888',
          marginTop: 4,
          borderRadius: 2
        }}></div>
      </div>
    </div>
  )
}

export default ClassicTextEditorWindow
