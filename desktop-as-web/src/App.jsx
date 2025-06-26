import { useState,useEffect } from 'react'  
import SearchBar from './components/SearchBar'
import Panel from './components/Panel'
import './App.css'

function App() {
  const [sideBar, setSideBar] = useState(false)
  useEffect (() =>{
    console.log(sideBar)
  },[sideBar])
  return (
    <div
      className='w-screen h-screen bg-cover bg-center bg-no-repeat bg-[url(/src/assets/windowsxp.jpeg)] overflow-hidden'
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>

    
      <div id='panel' className='absolute bottom-8'>
        {sideBar ? <Panel /> : null}
      </div>
















      <div className='absolute bottom-0 w-full'>
        <SearchBar sideBar = {sideBar} setSideBar={setSideBar}/>
      </div>
    </div>
  )
}

export default App
