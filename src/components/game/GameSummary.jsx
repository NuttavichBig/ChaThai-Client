import React from 'react'
import useRoomStore from '../../stores/room-store'
import { useShallow } from 'zustand/shallow'
import { Link } from 'react-router-dom'

export default function GameSummary() {
    const {score , joinRoom , currentRoom} = useRoomStore(useShallow(state=>({
        score : state.score,
        joinRoom : state.joinRoom,
        currentRoom : state.currentRoom
    })))

    const hdlRejoin=()=>{
        joinRoom(currentRoom.code)
    }
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
        <div className='text-6xl text-main'>Total Score</div>
        <div className='text-5xl text-main'>{score}</div>
        <button className='btn text-xl btn-skip border-0 shadow-xl rounded-none text-white w-96'
        onClick={hdlRejoin}>Bact to Room</button>
        <Link to={'/'} className='btn text-lg bg-gray-500 shadow-xl rounded-none border-0 text-white w-72'>Exit to main menu</Link>
    </div>
  )
}
