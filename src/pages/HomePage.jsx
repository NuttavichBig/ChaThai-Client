import Joingame from '../components/game/Joingame'
import Login from '../components/authen/Login'
import UserInfo from '../components/authen/UserInfo'
import useUserStore from '../stores/user-store'
import { useEffect, useState } from 'react'
import AdminSideBar from '../components/AdminSideBar'
import { useShallow } from 'zustand/shallow'

export default function HomePage() {
  const {user,getMe,token} = useUserStore(useShallow(state=>({
    user : state.user,
    getMe : state.getMe,
    token : state.token
  })))
  const [render,setRender] = useState(false)
  useEffect(()=>{
    checkRole();
  },[token])


  const checkRole=async()=>{
    try {
      const result = await getMe(token)
      if(result.role === "ADMIN"){
          return setRender(true)
      }
      setRender(false)

  } catch (err) {}

  }
  return (

    <div className='mt-16 flex justify-center items-center max-md:items-start h-[calc(100vh-64px)]'>
      {render && <AdminSideBar/>}
      <div className='flex justify-center w-5/12 max-xl:w-2/3 max-lg:w-3/4 max-md:w-full max-md:flex-col max-2xl:w-1/2 shadow-xl'>
        {user ? <UserInfo /> : <Login /> }
        <Joingame />
      </div>
    </div>
  )
}
