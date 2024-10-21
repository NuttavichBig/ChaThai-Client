import Joingame from '../components/game/Joingame'
import Login from '../components/authen/Login'
import UserInfo from '../components/authen/UserInfo'
import useUserStore from '../stores/user-store'
import useRoomStore from '../stores/room-store'
import { useEffect } from 'react'

export default function HomePage() {
  const user = useUserStore(state =>state.user)
  const disconnect = useRoomStore(state=>state.disconnect)
  useEffect(()=>{
      disconnect();
  },[])
  return (

    <div className='mt-16 flex justify-center items-center max-md:items-start h-[calc(100vh-32px)]'>
      <div className='flex justify-center w-5/12 max-xl:w-2/3 max-lg:w-3/4 max-md:w-full max-md:flex-col max-2xl:w-1/2 shadow-xl'>
        {user ? <UserInfo /> : <Login /> }
        <Joingame />
      </div>
    </div>
  )
}
