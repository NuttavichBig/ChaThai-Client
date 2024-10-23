import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    
  return (
    <div className='flex flex-col justify-center items-center h-screen gap-4'>
        <h1 className='text-9xl text-main font-extrabold'>404</h1>
        <h2 className='text-5xl text-main font-extrabold'>... Page Not Found ...</h2>
        <Link to={'/'} className='btn border-0 bg-indigo-600 text-3xl text-white w-96 h-16 mt-8'>Home Page</Link>
    </div>
  )
}
