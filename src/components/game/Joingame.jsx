import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRoomStore from '../../stores/room-store'
import { useShallow } from 'zustand/shallow'
import useUserStore from '../../stores/user-store'
import HowToPlay from './HowToPlay'

export default function Joingame() {
  const [input, setInput] = useState({
    code: '',
    err: '',
  })
  const [isOpen,setIsOpen] = useState(false)
  const { connect, joinRoom, currentRoom, socket, disconnect } = useRoomStore(useShallow(state => ({
    currentRoom: state.currentRoom,
    connect: state.connect,
    joinRoom: state.joinRoom,
    disconnect: state.disconnect,
    socket: state.socket
  })))
  const token = useUserStore(state => state.token)
  const navigate = useNavigate();

  // navigate to other page after room found
  useEffect(() => {
    if (currentRoom) navigate('/game/room')
  }, [currentRoom])


  //  real time socket error handle
  useEffect(()=>{
    if(socket){
      socket.on('error', message => {
        console.log('error join room', message)
        setInput(prv => ({ ...prv, err: message }))
        disconnect();
      })
    }
    return ()=>{
      if(socket)socket.off('error')
    }
  },[socket])



  const hdlChange = (e) => {
    setInput(prv => ({ ...prv, code: e.target.value }))
  }

  const hdlConfirm = (e) => {
    e.preventDefault();
    try {
      // initial validate
      if (input.code.length < 6 || isNaN(+input.code)) {
        throw new Error("Game Code should be 6 number");
      }
      if(!token)throw new Error("Please Login")
      // call socket
      connect();
      joinRoom(input.code);
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message
      console.log(errMsg)
      setInput(prv => ({ ...prv, err: errMsg }))
    }
  }

  // create game button handle
  const hdlCreateGame = () => {
    if (token) navigate('/game')
    else setInput(prv => ({ ...prv, err: 'please login' }))
  }
  return (
    <>

    <div className='w-1/2 relative flex items-center bg-sub rounded-r-xl px-12 py-16 max-md:w-3/4 max-md:self-center max-md:rounded-none'>
        <div className='absolute bg-main rounded-full h-8 w-8 text-center shadow-xl top-4 hover:cursor-pointer hover:scale-105 transition-all right-8 hover:border text-white text-2xl'
        onClick={()=>setIsOpen(true)}>?</div>
      <div className='flex flex-col justify-center w-full gap-2'>
        <p className='text-center font-itim text-2xl font-bold text-main'>Join Game</p>
        <input className='px-8 py-2 text-xl rounded-full shadow-inner border-2 border-gray-200 text-center bg-white text-black'
          type='text' placeholder='GAME CODE' maxLength={6}
          onChange={hdlChange} />
        <p className='text-red-500 text-sm'>{input.err}</p>
        <button className='btn rounded-full bg-black border-none text-white text-xl font-itim shadow-xl hover:text-black'
          onClick={hdlConfirm}>Join Game</button>
        <button className='btn rounded-full bg-white border-none text-black text-xl font-itim shadow-xl'
          onClick={hdlCreateGame}>Create Game</button>
      </div>

    </div>
    {
      isOpen&&
      <HowToPlay setIsOpen={setIsOpen}/>
    }
    </>
  )
}
