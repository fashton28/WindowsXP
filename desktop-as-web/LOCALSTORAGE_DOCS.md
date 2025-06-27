# LocalStorage Documentation
## Windows XP Desktop App - Data Persistence Guide

### Table of Contents
1. [Basic LocalStorage Methods](#basic-localstorage-methods)
2. [React Hooks for LocalStorage](#react-hooks-for-localstorage)
3. [Windows XP App Use Cases](#windows-xp-app-use-cases)
4. [Best Practices](#best-practices)
5. [Error Handling](#error-handling)
6. [Examples](#examples)

---

## Basic LocalStorage Methods

### Core Methods
```javascript
// Store data
localStorage.setItem(key, value)

// Retrieve data
localStorage.getItem(key)

// Remove specific item
localStorage.removeItem(key)

// Clear all data
localStorage.clear()

// Get number of items
localStorage.length

// Get key by index
localStorage.key(index)
```

### Important Notes
- **Data Types**: LocalStorage only stores strings
- **Storage Limit**: ~5-10MB (varies by browser)
- **Domain Specific**: Data is isolated per domain
- **Synchronous**: Operations are blocking

---

## React Hooks for LocalStorage

### Custom Hook for LocalStorage
```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
```

### Usage Example
```javascript
function App() {
  const [windows, setWindows] = useLocalStorage('windows', []);
  const [wallpaper, setWallpaper] = useLocalStorage('wallpaper', 'default');
  
  return (
    <div>
      {/* Your app content */}
    </div>
  );
}
```

---

## Windows XP App Use Cases

### 1. Window Management
```javascript
// Save open windows
const [windows, setWindows] = useLocalStorage('windows', []);

// Save window positions and states
const saveWindowState = (windowId, position, size, isOpen) => {
  setWindows(prev => {
    const updated = prev.map(win => 
      win.id === windowId 
        ? { ...win, position, size, open: isOpen }
        : win
    );
    return updated;
  });
};
```

### 2. Notepad Content
```javascript
// Save notepad text
const [notepadContent, setNotepadContent] = useLocalStorage('notepad', '');

// Auto-save on text change
const handleTextChange = (text) => {
  setNotepadContent(text);
};
```

### 3. Desktop Icons
```javascript
// Save desktop icon positions
const [desktopIcons, setDesktopIcons] = useLocalStorage('desktopIcons', [
  { id: 'notepad', name: 'Notepad', x: 50, y: 50, icon: 'notepad.png' },
  { id: 'explorer', name: 'File Explorer', x: 50, y: 120, icon: 'explorer.png' }
]);
```

### 4. User Preferences
```javascript
// Save user settings
const [settings, setSettings] = useLocalStorage('settings', {
  wallpaper: 'default',
  theme: 'classic',
  soundEnabled: true,
  autoSave: true
});
```

---

## Best Practices

### 1. Error Handling
```javascript
const safeLocalStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('LocalStorage get error:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('LocalStorage set error:', error);
      return false;
    }
  }
};
```

### 2. Data Validation
```javascript
const validateWindowData = (data) => {
  return Array.isArray(data) && data.every(win => 
    win.id && 
    typeof win.open === 'boolean' &&
    win.position && 
    typeof win.position.x === 'number' &&
    typeof win.position.y === 'number'
  );
};

const [windows, setWindows] = useLocalStorage('windows', [], validateWindowData);
```

### 3. Storage Limits
```javascript
const checkStorageSpace = () => {
  const testKey = '__storage_test__';
  try {
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};
```

---

## Error Handling

### Comprehensive Error Handler
```javascript
class LocalStorageManager {
  static set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return { success: true };
    } catch (error) {
      console.error('LocalStorage set failed:', error);
      return { 
        success: false, 
        error: error.message,
        code: error.name 
      };
    }
  }

  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error('LocalStorage get failed:', error);
      return defaultValue;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
      return { success: true };
    } catch (error) {
      console.error('LocalStorage remove failed:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }
}
```

---

## Examples

### Complete Window Management Example
```javascript
import { useState, useEffect } from 'react';

function useWindowManager() {
  const [windows, setWindows] = useLocalStorage('windows', []);
  const [nextId, setNextId] = useLocalStorage('nextWindowId', 1);

  const openWindow = (type, title) => {
    const newWindow = {
      id: nextId,
      type,
      title,
      open: true,
      zIndex: Math.max(...windows.map(w => w.zIndex), 0) + 1,
      position: { x: 100, y: 100 },
      size: { width: 400, height: 300 }
    };

    setWindows(prev => [...prev, newWindow]);
    setNextId(prev => prev + 1);
  };

  const closeWindow = (id) => {
    setWindows(prev => 
      prev.map(win => 
        win.id === id ? { ...win, open: false } : win
      )
    );
  };

  const focusWindow = (id) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      return prev.map(win =>
        win.id === id ? { ...win, zIndex: maxZ + 1 } : win
      );
    });
  };

  const updateWindowPosition = (id, position) => {
    setWindows(prev =>
      prev.map(win =>
        win.id === id ? { ...win, position } : win
      )
    );
  };

  return {
    windows: windows.filter(w => w.open),
    openWindow,
    closeWindow,
    focusWindow,
    updateWindowPosition
  };
}
```

### Notepad with Auto-Save
```javascript
function Notepad({ windowId }) {
  const [content, setContent] = useLocalStorage(`notepad-${windowId}`, '');
  const [lastSaved, setLastSaved] = useState(null);

  const handleTextChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setLastSaved(new Date());
  };

  return (
    <div className="notepad-window">
      <textarea
        value={content}
        onChange={handleTextChange}
        placeholder="Start typing..."
        className="w-full h-full p-2 resize-none"
      />
      {lastSaved && (
        <div className="text-xs text-gray-500">
          Last saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
```

### Settings Manager
```javascript
function useSettings() {
  const [settings, setSettings] = useLocalStorage('settings', {
    wallpaper: 'default',
    theme: 'classic',
    soundEnabled: true,
    autoSave: true,
    desktopIcons: true,
    taskbarPosition: 'bottom'
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings({
      wallpaper: 'default',
      theme: 'classic',
      soundEnabled: true,
      autoSave: true,
      desktopIcons: true,
      taskbarPosition: 'bottom'
    });
  };

  return { settings, updateSetting, resetSettings };
}
```

---

## Migration and Versioning

### Data Migration Example
```javascript
const migrateLocalStorage = () => {
  const version = localStorage.getItem('dataVersion') || '1.0';
  
  if (version === '1.0') {
    // Migrate from v1.0 to v1.1
    const oldWindows = localStorage.getItem('windows');
    if (oldWindows) {
      const parsed = JSON.parse(oldWindows);
      const migrated = parsed.map(win => ({
        ...win,
        size: win.size || { width: 400, height: 300 },
        minimized: false
      }));
      localStorage.setItem('windows', JSON.stringify(migrated));
    }
    localStorage.setItem('dataVersion', '1.1');
  }
};
```

---

## Performance Tips

1. **Batch Updates**: Group multiple localStorage operations
2. **Debounce Saves**: Don't save on every keystroke
3. **Compress Data**: Use shorter keys and values
4. **Clean Up**: Remove unused data periodically

```javascript
// Debounced save example
const debouncedSave = useCallback(
  debounce((key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, 1000),
  []
);
```

---

This documentation provides everything you need to implement robust data persistence in your Windows XP desktop app using LocalStorage! 