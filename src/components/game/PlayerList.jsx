import React, { useEffect, useState } from 'react'
import PlayerBox from './PlayerBox'
import useRoomStore from '../../stores/room-store'
import { useShallow } from 'zustand/shallow'
import { Link } from 'react-router-dom'

export default function PlayerList(props) {
  const { self } = props
  const { socket, players, playerUpdateListener, playerJoinListener, ready, gameStart } = useRoomStore(useShallow(state => ({
    socket: state.socket,
    players: state.players,
    playerUpdateListener: state.playerUpdateListener,
    playerJoinListener: state.playerJoinListener,
    ready: state.ready,
    gameStart: state.gameStart

  })))
  const [playerByRole, setPlayerByRole] = useState({
    guess: [],
    hint: [],
  })
  const [pageErr, setPageErr] = useState('')
  useEffect(() => {
    const hint = players.filter(el => el.playerRole === 'HINT')
    const guess = players.filter(el => el.playerRole === 'GUESS')
    setPlayerByRole(prv => ({ ...prv, guess, hint }))
  }, [players])

  useEffect(() => {
    playerJoinListener();
    playerUpdateListener();
  }, [])
  useEffect(() => {
    if (socket) {
      socket.on('error', message => {
        console.log('error game room', message)
        setPageErr(message)
      })
    }
    return () => {
      if (socket) socket.off('error')
    }
  }, [socket])

  const hdlReady = () => {
    ready();
  }

  const hdlStartGame = () => {
    try {

      console.log('hdlStart')
      if (players.find(el => el.isReady === false)) {
        throw new Error('Everyone must be ready')
      }
      if (!self?.isMaster) {
        throw new Error('You are not the Master')
      }
      gameStart();
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message
      console.log(errMsg)
      setPageErr(errMsg)
    }
  }
  return (
    <div className='w-2/3 overflow-y-scroll h-[calc(100vh-64px)]'>
      <div className='flex flex-col py-10 px-8 gap-8'>
        <div className='flex flex-col gap-2'>
          <p className='text-md text-red-500'>{pageErr}</p>
          <div className='flex gap-2'>
            {self?.isMaster && <button className='btn-confirm btn border-0 shadow-md text-xl px-12'
              onClick={hdlStartGame}>Game Start</button>}
            <button className='btn-confirm btn border-0 shadow-md text-xl px-12'
              onClick={hdlReady}>Ready</button>
            <Link to={'/'} className='btn-cancel text-xl px-12 rounded-lg btn bg-inherit'
              >Leave</Link>
          </div>
          <div>
          </div>
          <h3 className='text-5xl text-main font-semibold font itim pb-8'>Guess</h3>
          {playerByRole?.guess?.map((item, index) =>
            <PlayerBox key={index} player={item} />
          )}
        </div>
        <div className='flex flex-col gap-8'>
          <h3 className='text-5xl text-main font-semibold font itim'>Hint</h3>
          <div className='flex flex-col gap-8 overflow-y-scroll'>

          {playerByRole?.hint?.map((item, index) =>
            <PlayerBox key={index} player={item} self={self} />
          )}
          </div>
        </div>
      </div>

    </div>
  )
}
