import React, { useEffect, useState } from 'react'
import GameInfo from '../components/game/GameInfo'
import useRoomStore from '../stores/room-store'
import {  useNavigate } from 'react-router-dom'
import PlayerList from '../components/game/PlayerList';
import { useShallow } from 'zustand/shallow';
import useUserStore from '../stores/user-store';
import Playing from '../components/game/Playing';

export default function GameRoom() {
  const navigate = useNavigate();
  const user = useUserStore(state => state.user)
  const { socket, currentRoom, players, roomUpdateListener } = useRoomStore(useShallow(state => ({
    socket: state.socket,
    currentRoom: state.currentRoom,
    players: state.players,
    roomUpdateListener: state.roomUpdateListener
  })))
  const [self, setSelf] = useState(null)
  useEffect(() => {
    if (!socket) navigate('/')
  }, [socket])
  useEffect(() => {
    if (players) {
      const self = players?.filter(el => el.userId === user.id)[0]
      setSelf(self)
    }
  }, [players])
  useEffect(() => {
    roomUpdateListener();
  }, [])

  return (
    <div className='mt-16 flex'>
      {
        currentRoom?.status === 'PLAYING' ?
          <Playing self={self} />
          : 
          <>
            <GameInfo />
            <PlayerList self={self} />
          </>
      }
    </div>
  )
}
