import React from 'react'
import useUserStore from '../stores/user-store'
import { Link } from 'react-router-dom'


export default function Header() {
  const user = useUserStore(state => state.user)
  return (
    <div className='w-screen bg-black flex flex-between justify-between items-center fixed h-16 px-12 top-0 z-50'>
      {/* Left */}
      <Link to={'/'} className='flex items-center'>
      <img src="https://res.cloudinary.com/dvtkfd3jj/image/upload/v1729607391/1_1729607388373_285.png" alt="logo"className='w-20' />
      <p className='text-white text-3xl font-extrabold font-itim'>ChaThai</p>
      </Link>
      {/* Right */}
      {user ?
        <div className='flex gap-3 items-center px-4 h-full'>
           <div className='p-1 border-2 border-main rounded-full'>
          <img src={user.profileImage} className='w-8 h-8 rounded-full bg-white' />
          </div>
          <p className='text-xl text-white'>{user.username}</p>
        </div>
        : <div className='flex gap-2 text-white mr-8'>
          <p>login</p><p>or</p><Link to={'/register'} className='underline'>register</Link>
        </div>
      }



    </div>
  )
}
