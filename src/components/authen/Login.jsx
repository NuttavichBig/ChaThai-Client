import React, { useState } from 'react'
import useUserStore from '../../stores/user-store'
import { useShallow } from 'zustand/shallow'
import { Link } from 'react-router-dom'

export default function Login() {
  const {login} = useUserStore(useShallow(state=>({
    login :state.login,
    errMsg : state.errMsg
  })))
  const [input,setInput] = useState({
    username : '',
    password : ''
  })
  const [loading,setLoading] = useState({
    isLoading : false,
    err : ''
  })
  
  const hdlChange = (e)=>{
    setInput(prv=>({...prv,[e.target.name]:e.target.value}))
  }

  const hdlLogin = async(e)=>{
    try{
      e.preventDefault();
      setLoading(prv=>({...prv,isLoading : true}))
      await login(input.username,input.password)
      }catch(err){
          console.log(err)
          const errMsg = err?.response?.data?.message || err.message
          console.log(errMsg)
          setLoading(prv=>({...prv,err : errMsg}))
      }finally{
          setLoading(prv=>({...prv,isLoading: false}))
      }
    
    
  }
  return (
    <div className='w-1/2 bg-white rounded-l-xl px-12 py-10 max-md:w-3/4 max-md:self-center max-md:rounded-none'>
      <form className='flex flex-col justify-center w-full gap-2' onSubmit={hdlLogin}>
      <p className='text-center font-itim text-2xl font-bold'>Login</p>
      <p className='text-center font-itim'>Login for more collection featured</p>
        <input type='text' placeholder='username'
              className='px-8 py-2 text-xl rounded-full shadow-inner border-2 border-gray-200 bg-white text-black'
              name='username'
              value={input.username}
              onChange={hdlChange}/>
        <input type='password' placeholder='password'
              className='px-8 py-2 text-xl rounded-full shadow-inner border-2 border-gray-200 bg-white text-black'
              name='password'
              value={input.password}
              onChange={hdlChange}/>
        {loading.err? <p className='text-red-500 text-sm'>{loading.err}</p>: <></>}
        <button className='btn rounded-full bg-main border-none text-white text-xl font-itim shadow-xl hover:bg-black'>Login</button>
        <Link className='rounded-full border-4 border-main bg-white text-center text-button font-itim py-1 hover:border-black hover:text-black'
        to="/register">register</Link>
      </form>

    </div>
  )
}
