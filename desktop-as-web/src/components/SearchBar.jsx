import React from 'react'

const SearchBar = ({sideBar, setSideBar}) => {
  
  return (
    <div>
      <div className='w-full h-8 bg-gradient-to-t from-blue-800 to-blue-500 rounded flex items-center justify-between'>
        <button
          id='start'
          className='cursor-pointer hover:brightness-110 transition-all duration-100 h-8'
          onClick={() => {
            if (!window._winxpAudioPlayed) {
              window._winxpAudioPlayed = true;
              const audio = new Audio('/src/assets/winxp.mp3');
              audio.play();
            }

            setSideBar(!sideBar);
          }}
        >
          <img src="/src/assets/startButton.png" alt="startButton" className='w-25'/>
        </button>
        <div id='utilities' className='bg-blue-500 w-20 h-8 rounded flex justify-center items-center gap-1'>
             <img src="/src/assets/sound.png" alt="startButton" className="w-4 h-4"/>
             <img src="/src/assets/computerIcon.png" alt="startButton" className="w-4 h-4"/>
             <img src="/src/assets/virus.png" alt="startButton" className="w-4 h-4"/>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
