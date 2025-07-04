import React from 'react'
import useStore from '../store/useStore';

const Panel = () => {
  const handleCreateNote = useStore((state) => state.createNote);

  return (
    <div className='bg-gradient-to-b from-blue-800 to-blue-500 w-90 h-115 rounded z-50' >
        <div className='p-2 border-b-1' style={{ borderBottomColor: 'orange' }}>
            <div className='flex items-center gap-5'>
                <img src="/assets/selfie.jpeg" alt="" className='w-10 h-10 border-2 border-white rounded' />
                <h1 className='bold text-lg text-white'>Fabian</h1>
            </div>
        </div>

        <div className='flex items-center'>
            <div className='flex flex-col bg-white w-50 h-90 absolute bottom-10.5 p-1 gap-1'>
                <div className='hover:bg-blue-800 hover:text-white px-3 py-2 rounded cursor-pointer w-full flex gap-4'>
                    <img src="/assets/sound.png" alt="" /> <span>My Resume</span>
                </div>
                <div className='hover:bg-blue-800  hover:text-white px-3 py-2 rounded cursor-pointer w-full flex gap-4'>
                    <img src="/assets/virus.png" alt="" /><span>Github</span>
                </div>
                <div className='hover:bg-blue-800  hover:text-white px-3 py-2 rounded cursor-pointer w-full flex gap-4'>
                    <img src="/assets/computerIcon.png" alt="" /><span>Linkedin</span>
                </div>
                <div className='hover:bg-blue-800  hover:text-white px-3 py-2 rounded cursor-pointer w-full flex gap-4'>
                    <img src="/assets/sound.png" alt="" /> <span>some work</span>
                </div>
                <div className='hover:bg-blue-800  hover:text-white px-3 py-2 rounded cursor-pointer w-full flex gap-4'>
                   <img src="/assets/virus.png" alt="" /><span>Paint</span>
                </div>
            </div>

            <div className='flex flex-col bg-blue-200 w-50 h-90 absolute bottom-10.5 right-0 p-1 gap-1 flex-end'>
                    <button className='cursor-pointer hover:bg-blue-500' onClick={handleCreateNote}>Leave a note</button>
                    <div className='mt-2 flex flex-col gap-2'>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Panel
