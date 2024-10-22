import React, { useEffect, useState } from 'react'
import CollectionCard from '../collection/CollectionCard'
import { NextPage2Icon, PrevPage2Icon } from '../../icon/icon'
import useCollectionStore from '../../stores/collection-store'
import { useShallow } from 'zustand/shallow'
import useUserStore from '../../stores/user-store'
import CategoryButton from '../collection/CategoryButton'
import { Link, useNavigate } from 'react-router-dom'
import useRoomStore from '../../stores/room-store'

export default function CreateGameCollection() {
    const user = useUserStore(state => state.user)
    const navigate = useNavigate();
    const { getOfficialCollection, getCommunityCollection, getOwnCollection } = useCollectionStore(useShallow(state => ({
        getOfficialCollection: state.getOfficialCollection,
        getCommunityCollection: state.getCommunityCollection,
        getOwnCollection: state.getOwnCollection,
    })))

    const { createGame, connect, joinRoom, currentRoom, socket, disconnect } = useRoomStore(useShallow(state => ({
        createGame: state.createGame,
        connect: state.connect,
        joinRoom: state.joinRoom,
        currentRoom: state.currentRoom,
        socket: state.socket,
        disconnect: state.disconnect
    })))
    const [activePage, setActivePage] = useState({
        category: 'Official',
        page: 1,
        limit: 5,
        collections: [],
        err: '',
        loading : false
    })
    const [selected, setSelected] = useState(null)
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
    useEffect(() => {
        if (currentRoom) navigate('/game/room')
    }, [currentRoom])


    //  real time socket error handle
    useEffect(() => {
        if (socket) {
            socket.on('error', message => {
                console.log('error join room', message)
                setActivePage(prv => ({ ...prv, err: message }))
            })
        }
        return () => {
            if (socket) socket.off('error')
        }
    }, [socket])


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

    const hdlCreateGame = async () => {
        try {
            if (selected) {
                const result = await createGame(selected)
                console.log(result.data.room.code)
                connect();
                joinRoom(result.data.room.code);
                setActivePage(prv => ({ ...prv, err: '' }))
            }
        } catch (err) {
            const errMsg = err?.response?.data?.message || err.message
            console.log(err.message)
            setActivePage(prv => ({ ...prv, err: errMsg }))

        }
    }
    return (
        <>

            <div className='w-full'>
                <CategoryButton hdlClick={hdlClickCategory} category={activePage.category} className='flex font-itim bg-none w-full px-1' />
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
            <div className='flex gap-2 justify-end'>
                <p className='text-sm text-red-500'>{activePage.err}</p>
                <button className='btn min-h-10 h-10 w-1/5 border-0 text-lg btn-confirm  rounded-full shadow-lg font-semibold font-itim max-2xl:w-1/4 max-lg:w-1/3'
                    onClick={hdlCreateGame}>
                    Create Game</button>
                <Link to={'/'} className='min-h-10 h-10 w-1/5 flex items-center justify-center max-xl:w-1/4 max-lg:w-1/3'><button className='w-full h-full text-lg btn-cancel rounded-full  font-semibold hover:border-black hover:text-black font-itim'>
                    Back</button></Link>
            </div>
        </>
    )
}
