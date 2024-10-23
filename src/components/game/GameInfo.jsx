import React, { useEffect, useState } from 'react'
import useRoomStore from '../../stores/room-store'
import useCollectionStore from '../../stores/collection-store'
import { useShallow } from 'zustand/shallow'
import useUserStore from '../../stores/user-store'
import ChangeCollectionModal from './ChangeCollectionModal'

export default function GameInfo() {
    const {currentRoom,players} = useRoomStore(useShallow(state=>({
     currentRoom : state.currentRoom,
     players : state.players,
     changeCollection : state.changeCollection,
    })))
    const user = useUserStore(state=>state.user)
    const getCollectionDetail = useCollectionStore(state=>state.getCollectionDetail)
    const [pageData,setPageData] = useState({
        collection : null,
        self : null,
    })
    useEffect(()=>{
        collectionDataCall()
    },[currentRoom])
    useEffect(()=>{
        const yourData = players.filter(el=>el.userId === user.id)
        setPageData(prv=>({...prv,self : yourData[0]}))
    },[players])


    const collectionDataCall =async()=>{
        const result = await getCollectionDetail(currentRoom.collectionId)
        setPageData(prv=>({...prv,collection : result}))
    }
    return (
        <>
        <div className='w-1/3 bg-white overflow-y-scroll h-[calc(100vh-64px)]'>
            <div className='flex flex-col items-center pt-16 px-8'>
                
                <p className='text-5xl text-main font-bold font-itim'>Game Code</p>
                <p className='text-5xl text-main font-bold pt-4 font-itim'>{currentRoom?.code}</p>
                <p className='text-xl text-red-500 pt-4'>** Please don't refresh while in game room **</p>
                <div className='divider divider-neutral  '></div>
                <div className=' p-1 border-2 border-main rounded-lg flex justify-center items-center relative'>
                <img src={pageData.collection?.coverImage || 'https://res.cloudinary.com/dvtkfd3jj/image/upload/v1728969891/NoCover.png'} alt="" className='w-40 h-40 rounded-lg shadow-xl object-contain' />
                {pageData.self?.isMaster && <div className='w-40 h-40 absolute op btn btn-sm bg-black opacity-0 hover:opacity-80' 
                onClick={()=>{document.getElementById('change_collection').showModal()}}>Click to change</div>}

                </div>
                <p className='text-3xl py-4 text-main font-semibold font-itim'>{pageData.collection?.title}</p>
                <div className='flex flex-col gap-2 py-2 text-center'>
                    <p className='text-xl text-main font-semibold font-itim'>Description</p>
                    <p className='text-lg text-main px-8 font-itim'>{pageData.collection?.description || 'No description'}</p>
                </div>
            </div>
        </div>
        <ChangeCollectionModal/>
        </>
    )
}
