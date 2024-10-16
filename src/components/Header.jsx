import React from 'react'
import useUserStore from '../stores/user-store'

export default function Header() {
  const user = useUserStore(state => state.user)
  return (
    <div className='w-screen bg-black flex flex-between justify-between items-center fixed h-16 px-12 top-0 z-50'>
      {/* Left */}
      <p className='text-white text-3xl font-extrabold font-itim '>Logo</p>
      {/* Right */}
      {user ?
        <div className='flex gap-3 items-center hover:bg-gray-600 px-4 h-full'>
           <div className='p-1 border-2 border-main rounded-full'>
          <img src={user.profileImage} className='w-10 h-10 rounded-full bg-white' />
          </div>
          <p className='text-xl text-white'>{user.username}</p>
        </div>
        : <div className='flex gap-2 text-white mr-8'>
          <p>login</p><p>or</p><p className='underline'>register</p>
        </div>
      }

    </div>
  )
}
