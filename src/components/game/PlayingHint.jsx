import React from 'react'
import useRoomStore from '../../stores/room-store'
import { useShallow } from 'zustand/shallow'

export default function PlayingHint() {
  const {word,timer}  = useRoomStore(useShallow(state=>({
    word : state.word,
    timer : state.timer
  })))
  return (
    <div className='flex flex-col gap-8'>
      {word ?
      <>
      <div className='text-8xl text-main text-center'>{word}</div>
      <div className='text-6xl text-main text-center'>{timer}</div>
      </>
      :
      <span className="loading loading-dots loading-lg text-black"></span>
    }
    </div>
  )
}
