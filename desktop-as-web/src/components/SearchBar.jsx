import React from 'react'
import useStore from '../store/useStore';

const SearchBar = () => {
  const sideBar = useStore((state) => state.sideBar[0]);
  const setSideBar = useStore((state) => state.setSideBar);

  return (
    <div>
      <div className='w-full h-8 bg-gradient-to-t from-blue-800 to-blue-500 rounded flex items-center justify-between'>
        <button
          id='start'
          className='cursor-pointer hover:brightness-110 transition-all duration-100 h-8'
          onClick={() => {
            setSideBar((prev) => [!prev[0]]);
            if (!window._winxpAudioPlayed) {
              window._winxpAudioPlayed = true;
              const audio = new Audio('/assets/winxp.mp3');
              audio.play();
            }
          }}
        >
          <img src="/assets/startButton.png" alt="startButton" className='w-25'/>
        </button>
        <div id='utilities' className='bg-blue-500 w-20 h-8 rounded flex justify-center items-center gap-1'>
             <img src="/assets/sound.png" alt="startButton" className="w-4 h-4"/>
             <img src="/assets/computerIcon.png" alt="startButton" className="w-4 h-4"/>
             <img src="/assets/virus.png" alt="startButton" className="w-4 h-4"/>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
