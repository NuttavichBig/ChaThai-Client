import React from 'react'

export default function CollectionCard(props) {
  const { collection,func } = props
  return (
    <div className='flex flex-col justify-start items-center'>
      <div className='w-[100px] h-[120px]'>
        <img src={collection?.coverImage || 'https://res.cloudinary.com/dvtkfd3jj/image/upload/v1728969891/NoCover.png'} alt="" className='w-[100px] h-[120px] shadow-xl rounded-md bg-white' 
        onClick={()=>func(collection?.id)}/>
      </div>
      <p className='text-wrap w-[120px] text-center font-itim'>{collection?.title}</p>
    </div>
  )
}
