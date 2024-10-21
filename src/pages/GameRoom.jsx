import React, { useEffect } from 'react'
import GameInfo from '../components/game/GameInfo'
import useRoomStore from '../stores/room-store'
import { useNavigate } from 'react-router-dom'
import PlayerList from '../components/game/PlayerList';

export default function GameRoom() {
  const navigate = useNavigate();
  const socket = useRoomStore(state=>state.socket)
  useEffect(()=>{
    if(!socket)navigate('/')
  },[socket])

  return (
    <div className='mt-16 flex'>
      <GameInfo/>
      <PlayerList/>
    </div>
  )
}
