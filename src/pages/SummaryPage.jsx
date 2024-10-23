import React, { useEffect } from 'react'
import GameSummary from '../components/game/GameSummary'
import useRoomStore from '../stores/room-store'
import { useNavigate } from 'react-router-dom'

export default function SummaryPage() {
    const socket = useRoomStore(state=>state.socket)
    const navigate = useNavigate();
    useEffect(() => {
        if (!socket) navigate('/')
      }, [socket])

  return (
    <div className='mt-16 flex'>\
      <div className='flex justify-center items-center w-screen h-[calc(100vh-64px)]'>
            <GameSummary/>
        </div>
    </div>
  )
}
