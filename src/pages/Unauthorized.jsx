import React from 'react'
import { Link } from 'react-router-dom'


export default function Unauthorized() {

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-4'>
      <img src="https://img.freepik.com/premium-vector/grunge-yellow-black-diagonal-stripes-industrial-warning-background_322958-5484.jpg?w=1380" alt="" className='w-screen absolute -z-10'/>
    <h2 className='text-8xl text-red-500 font-extrabold'>You are not permitted</h2>
    <Link to={'/'} className='btn border-0 bg-indigo-600 text-3xl text-white w-96 h-16 mt-8'>Go Back</Link>
</div>
  )
}
