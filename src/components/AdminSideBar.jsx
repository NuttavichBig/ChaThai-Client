import React from 'react'
import { EditCollectionIcon, EditUserIcon } from '../icon/icon'
import { Link } from 'react-router-dom'

export default function AdminSideBar() {
    return (
        <div className='flex flex-col -left-40 absolute top-1/2 '>
            <Link to={'/admin/user'} className='pr-2 pl-20 py-2 bg-black flex justify-end items-center relative 
            hover:translate-x-20 transition-transform hover:bg-slate-600'>
                <p className=' text-white text-center text-lg pr-2'>User</p><EditUserIcon className="w-10 h-10" />
            </Link>
            <Link to={'/admin/collection'} className='pr-2 pl-20 py-2 bg-black flex justify-end items-center relative 
            hover:translate-x-32 transition-transform hover:bg-slate-600'>
                <p className=' text-white text-center text-lg pr-2'>Collection</p><EditCollectionIcon className="w-10 h-10" />
            </Link>
        </div>
    )
}
