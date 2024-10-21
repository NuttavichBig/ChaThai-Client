import React, { useEffect, useState } from 'react'
import PlayerBox from './PlayerBox'
import useRoomStore from '../../stores/room-store'
import { useShallow } from 'zustand/shallow'
import useUserStore from '../../stores/user-store'

export default function PlayerList() {
  const { players,playerUpdateListener,playerJoinListener} = useRoomStore(useShallow(state => ({
    players: state.players,
    playerUpdateListener: state.playerUpdateListener,
    playerJoinListener : state.playerJoinListener

  })))
  const user = useUserStore(state=>state.user)
  const [playerByRole, setPlayerByRole] = useState({
    guess: null,
    hint: null,
    self : null,
  })
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
  console.log(playerByRole)
  return (
    <div className='w-2/3 overflow-y-scroll h-[calc(100vh-64px)]'>
      <div className='flex flex-col py-10 px-8 gap-8'>
        <div className='flex gap-2'>
          {playerByRole.self?.isMaster && <button className='btn-confirm btn border-0 shadow-md text-xl px-12'>Game Start</button>}
            <button className='btn-confirm btn border-0 shadow-md text-xl px-12'>Ready</button>
          </div>        
        <div>
          <h3 className='text-5xl text-main font-semibold font itim pb-8'>Guess</h3>
          {playerByRole?.guess?.map((item, index) =>
            <PlayerBox key={index} player={item} />
          )}
        </div>
        <div className='flex flex-col gap-8 overflow-y-scroll'>
          <h3 className='text-5xl text-main font-semibold font itim'>Hint</h3>
          {playerByRole?.hint?.map((item, index) =>
            <PlayerBox key={index} player={item} />
          )}
        </div>
      </div>

    </div>
  )
}
