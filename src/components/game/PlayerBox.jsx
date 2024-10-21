import React from 'react'

export default function PlayerBox(props) {
    const {player} = props
    console.log(player)
  return (
    <div className='w-1/2 bg-white py-1 px-4 rounded-full flex justify-start items-center gap-2 shadow-lg'>
        <div className='p-1 border-2 border-main rounded-full'>

        <img src={player?.users?.profileImage || 'https://www.svgrepo.com/show/522440/profile.svg'} alt="profile pic"
        className='w-10 h-10 rounded-full'/>
        </div>
        <p className='text-xl text-main text-center'>{player?.users?.displayName}</p>
    </div>
  )
}
