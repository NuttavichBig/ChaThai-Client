import React from 'react'
import { CheckIcon } from '../../icon/icon'
import useRoomStore from '../../stores/room-store'
import { useShallow } from 'zustand/shallow'

export default function PlayingGuess() {
  const {socket,timer} = useRoomStore(useShallow(state=>({
    socket : state.socket,
    timer : state.timer
  })))

  const hdlSkip = (value)=>{
    if(socket){
      socket.emit('score',value)
    }
  }
  return (
    <div className='flex flex-col gap-8'>
      <div className='text-6xl text-main text-center'>{timer}</div>
      <div className='flex justify-center items-center'>
        <button className='btn border-0 w-60 h-32 btn-confirm shadow-xl rounded-lg'
        onClick={()=>hdlSkip(1)}><CheckIcon className="w-24 h-24"/></button>
        <button className='btn border-0 w-60 h-32 btn-skip text-4xl font-itim shadow-xl rounded-lg text-white'
        onClick={()=>hdlSkip(0)}>Skip</button>
      </div>
    </div>
  )
}
