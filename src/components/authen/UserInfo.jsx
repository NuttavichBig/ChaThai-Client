import  { useState } from 'react'
import useUserStore from '../../stores/user-store'
import { useShallow } from 'zustand/shallow'
import {EditIcon} from "../../icon/icon"
import { Link } from 'react-router-dom'

export default function UserInfo() {
  const {user,token,logout,update} = useUserStore(useShallow(state => ({
    user : state.user,
    token : state.token,
    logout : state.logout,
    update : state.update
  })))

  const [input , setInput] = useState({
    displayName : user.displayName,
    file : null,
    update : false,
    loading : false,
  })

  const hdlDisplayNameInput = (e)=>{
    setInput(prv=>({...prv,displayName : e.target.value}))
  }

  const hdlDisplayNameUpdate = async() => {
    try{
    if(input.update && input.displayName !== user.displayName){
      const body = new FormData()
      body.append('displayName', input.displayName)
      await update(body,token)
    }
    setInput(prv=>({...prv,update : !input.update}))
  }catch(err){
    const errMsg = err?.response?.data?.message || err.message
    console.log(errMsg)
  }}

  const hdlFileChange = async(e)=>{
    try{
      setInput(prv=>({...prv, loading : true}))
      const body = new FormData()
      body.append('profileImage',e.target.files[0])
      await update(body,token)
    }catch(err){
    const errMsg = err?.response?.data?.message || err.message
    console.log(errMsg)
    }finally {
      setInput(prv=>({...prv,loading : false}))
    }
  }

  return (
    <div className='w-1/2 bg-white rounded-l-xl px-12 py-16 max-md:w-3/4 max-md:self-center max-md:rounded-none'>
      <div className='flex flex-col items-center justify-center w-full gap-2'>
        {input.loading && <span className="loading loading-dots loading-xs"></span>}
        <div className='p-1 border-2 border-main rounded-full'>
            <div className='h-24 w-24 rounded-full bg-white hover:cursor-pointer'
                onClick={() => document.getElementById('input-file').click()}>
                <input type="file" className='hidden' id='input-file'
                    onChange={hdlFileChange} />
                <img src={user.profileImage ? user.profileImage : 'https://www.svgrepo.com/show/522440/profile.svg'} className='w-full h-full rounded-full' />
                <div className='bg-black opacity-0 h-24 w-24 rounded-full text-center content-center text-white font-semibold relative -top-24 z-10 hover:opacity-75'>Click</div>
            </div>
        </div>
        <div className='flex justify-center items-center flex-col line'>

          <div className='flex gap-1 font-semibold font-itim items-center text-lg'>
            {
              input.update?<input type='text' value={input.displayName} onChange={hdlDisplayNameInput}/>:<p>{user.displayName || 'John Doe'}</p>
            }
            <EditIcon className='w-5 h-5 hover:scale-110' onClick={hdlDisplayNameUpdate} />
          </div>
          <p className='text-sm opacity-50'>@{user.username}</p>
        </div>
        <Link to={'/collection'} className='btn p-0 w-full bg-main text-white text-xl font-itim hover:bg-black'>View My Collection</Link>
        <button className='w-full rounded-lg border-2 border-gray-400 bg-white text-gray-400 font-itim py-1 hover:border-black hover:text-black'
        onClick={logout}>Log out</button>
            
        
        

      </div>

    </div>
  )
}
