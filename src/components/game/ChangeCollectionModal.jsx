import React, { useEffect, useState } from 'react'
import useCollectionStore from '../../stores/collection-store'
import useUserStore from '../../stores/user-store'
import { useShallow } from 'zustand/shallow'
import CollectionCard from '../collection/CollectionCard'
import CategoryButton from '../collection/CategoryButton'
import { NextPage2Icon, PrevPage2Icon } from '../../icon/icon'
import useRoomStore from '../../stores/room-store'

export default function ChangeCollectionModal() {
    const user = useUserStore(state => state.user)
    const { getOfficialCollection, getCommunityCollection, getOwnCollection } = useCollectionStore(useShallow(state => ({
        getOfficialCollection: state.getOfficialCollection,
        getCommunityCollection: state.getCommunityCollection,
        getOwnCollection: state.getOwnCollection,
    })))
    const {currentRoom,socket,changeCollection} = useRoomStore(useShallow(state=>({
        currentRoom : state.currentRoom,
        socket : state.socket,
        changeCollection : state.changeCollection

    })))
    const [activePage, setActivePage] = useState({
        category: 'Official',
        page: 1,
        limit: 5,
        collections: [],
        err: '',
    })
    const [selected, setSelected] = useState(null)
    const [socketErr , setsocketErr] = useState('')
    useEffect(() => {
        try{
            setActivePage(prv=>({...prv,loading:true}))
            hdlCollectionGet()
        }catch(err){
            const errMsg = err?.response?.data?.message || err.message
            console.log(errMsg)
            setActivePage(prv => ({ ...prv, err: errMsg }))
        }finally{
            setActivePage(prv=>({...prv,loading:false}))
        }

    }, [activePage.category, activePage.page])

    useEffect(() => {
        setSelected(activePage.collections[0]?.id)
    }, [activePage.collections])
    useEffect(()=>{
        if(socket){
          socket.on('error', message => {
            console.log('error join room', message)
            setsocketErr(message)
            disconnect();
          })
        }
        return ()=>{
          if(socket)socket.off('error')
        }
      },[socket])


    const hdlCollectionGet = async () => {
        let result = []
        if (activePage.category === 'Official') result = await getOfficialCollection(activePage.page, activePage.limit)
        if (activePage.category === 'Community') result = await getCommunityCollection(activePage.page, activePage.limit)
        if (activePage.category === 'Favorite') console.log('this feature soon')
        if (activePage.category === 'Own') result = await getOwnCollection(user.id, activePage.page, activePage.limit)
        // console.log(result)
        setActivePage(prv => ({ ...prv, collections: result }))
    }
    const hdlClickCategory = (e) => {
        setActivePage(prv => ({ ...prv, page: 1, category: e.target.name }))
    }
    const hdlPageChange = (val) => {
        if (activePage.page + val < 1 || (activePage.collections.length < 5 && val === 1)) {
            console.log('Page cannot change')
            return
        }
        setActivePage(prv => ({ ...prv, page: activePage.page + val }))
    }
    const hdlConfirm = (e)=>{
        try{
            if(socket){
                console.log(selected,currentRoom.collectionId)
                if(selected !== currentRoom.collectionId)changeCollection(selected)
                e.target.closest('dialog').close();
            }
        }catch(err){
            const errMsg = err?.response?.data?.message || err.message
            console.log(errMsg)
            setsocketErr(errMsg)
        }
    }
    return (
        <dialog id="change_collection" className="modal">
            <div className="modal-box max-w-none w-1/2">
                <div className='w-full'>
                    <CategoryButton hdlClick={hdlClickCategory} category={activePage.category} className='flex font-itim bg-none w-full' />
                    <div className='flex justify-between bg-sub w-full'>
                        <div className='arrow-bg-90deg w-20 flex items-center justify-start hover:cursor-pointer hover:backdrop-contrast-75'
                            onClick={() => hdlPageChange(-1)}><PrevPage2Icon className="w-10 h-10 hover:-scale-90" /></div>
                        <div className='flex flex-wrap gap-2 justify-center py-4 text-black w-full'>

                            {activePage.collections.map(el => selected !== el.id ? <CollectionCard key={el.id} collection={el} func={() => {
                                setSelected(el.id)
                            }} /> : <div key={el.id} className='btn-confirm rounded-lg p-2 '><CollectionCard collection={el} func={() => {
                                setSelected(el.id)
                            }} /></div>)}

                        </div>
                        <div className='arrow-bg-270deg w-20 flex items-center justify-end hover:cursor-pointer hover:backdrop-contrast-75'
                            onClick={() => hdlPageChange(1)}><NextPage2Icon className="w-10 h-10 hover:scale-90" /></div>
                    </div>
                </div>
                <div className='flex justify-end gap-2 mt-4'>
                    <p className='text-sm text-red-500'>{socketErr}</p>
                    <button className='btn min-h-10 h-10 text-lg font-semibold w-1/6 btn-confirm text-white rounded-full border-0  shadow-lg'
                        onClick={hdlConfirm}>Change</button>
                    <button className='btn-cancel rounded-full min-h-10 h-10  w-1/6 hover:border-black hover:text-black text-lg'
                        onClick={(e) => { e.target.closest('dialog').close(); }}>Cancel</button>
                </div>
            </div>
        </dialog>
    )
}
