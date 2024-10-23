import React, { useEffect } from 'react'
import useRoomStore from '../../stores/room-store'
import { Link } from 'react-router-dom'
import { useShallow } from 'zustand/shallow'

export default function GameSummary() {
    const {score} = useRoomStore(useShallow(state=>({
      score : state.score,

    })))
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
        <div className='text-6xl text-main'>Total Score</div>
        <div className='text-5xl text-main'>{score}</div>
        <Link to={'/game/room'} className='btn text-xl btn-skip border-0 shadow-xl rounded-none text-white w-96'>Bact to Room</Link>
        <Link to={'/'} className='btn text-lg bg-gray-500 shadow-xl rounded-none border-0 text-white w-72'>Exit to main menu</Link>
    </div>
  )
}
