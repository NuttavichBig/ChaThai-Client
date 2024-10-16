import React from 'react'
import { Link } from 'react-router-dom'

export default function Joingame() {
  return (
    <div className='w-1/2 flex items-center bg-sub rounded-r-xl px-12 py-16 max-md:w-3/4 max-md:self-center max-md:rounded-none'>
    <div className='flex flex-col justify-center w-full gap-2'>

      <p className='text-center font-itim text-2xl font-bold'>Join Game</p>
      <input type='text' placeholder='GAME CODE'
            className='px-8 py-2 text-xl rounded-full shadow-inner border-2 border-gray-200 text-center'/>
      <button className='btn rounded-full bg-black border-none text-white text-xl font-itim shadow-xl hover:text-black'>Join Game</button>
      <Link to={'/game/create'} className='btn rounded-full bg-white border-none text-black text-xl font-itim shadow-xl'>Create Game</Link>
    </div>

  </div>
  )
}
