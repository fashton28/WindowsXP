import { StrictMode } from 'react' //leave import
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // ADD STRICT MODE BACK AFTER APP DEVELOPMENT
    <App />
  ,
)
