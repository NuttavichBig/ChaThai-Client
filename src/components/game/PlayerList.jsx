import React, { useEffect, useState } from 'react'
import PlayerBox from './PlayerBox'
import useRoomStore from '../../stores/room-store'
import { useShallow } from 'zustand/shallow'
import useUserStore from '../../stores/user-store'

export default function PlayerList() {
  const { socket,players,playerUpdateListener,playerJoinListener,ready,gameStart} = useRoomStore(useShallow(state => ({
    socket : state.socket,
    players: state.players,
    playerUpdateListener: state.playerUpdateListener,
    playerJoinListener : state.playerJoinListener,
    ready : state.ready,
    gameStart : state.gameStart

  })))
  const user = useUserStore(state=>state.user)
  const [playerByRole, setPlayerByRole] = useState({
    guess: [],
    hint: [],
    self : null,
  })
  const [pageErr,setPageErr]=useState('')
  useEffect(() => {
    const hint = players.filter(el => el.playerRole === 'HINT')
    const guess = players.filter(el => el.playerRole === 'GUESS')
    const self = players.filter(el=>el.userId === user.id)
    setPlayerByRole(prv => ({ ...prv, guess, hint,self : self[0] }))
  }, [players])

  useEffect(()=>{
    playerJoinListener();
    playerUpdateListener();
  },[])
  useEffect(()=>{
    if(socket){
      socket.on('error', message => {
        console.log('error game room', message)
        setPageErr(message)
      })
    }
    return ()=>{
      if(socket)socket.off('error')
    }
  },[socket])

  const hdlReady = ()=>{
    ready();
  }

  const hdlStartGame = ()=>{
    if(players.find(el=>el.isReady === false))return
    if(playerByRole?.self?.isMaster){
      gameStart();
    }
  }
  return (
    <div className='w-2/3 overflow-y-scroll h-[calc(100vh-64px)]'>
      <div className='flex flex-col py-10 px-8 gap-8'>\
        <div className='flex flex-col gap-2'>
        <p className='text-sm text-red-500'>{pageErr}</p>
        <div className='flex gap-2'>
          {playerByRole.self?.isMaster && <button className='btn-confirm btn border-0 shadow-md text-xl px-12'
          onClick={hdlStartGame}>Game Start</button>}
            <button className='btn-confirm btn border-0 shadow-md text-xl px-12'
            onClick={hdlReady}>Ready</button>
          </div>        
        <div>
        </div>
          <h3 className='text-5xl text-main font-semibold font itim pb-8'>Guess</h3>
          {playerByRole?.guess?.map((item, index) =>
            <PlayerBox key={index} player={item} />
          )}
        </div>
        <div className='flex flex-col gap-8 overflow-y-scroll'>
          <h3 className='text-5xl text-main font-semibold font itim'>Hint</h3>
          {playerByRole?.hint?.map((item, index) =>
            <PlayerBox key={index} player={item} self={playerByRole.self} />
          )}
        </div>
      </div>

    </div>
  )
}
