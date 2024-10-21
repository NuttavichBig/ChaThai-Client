import React, { useEffect } from 'react'
import CreateGameCollection from '../components/game/CreateGameCollection'
import useUserStore from '../stores/user-store'
import { useNavigate } from 'react-router-dom'
import useRoomStore from '../stores/room-store'

export default function CreateGamePage() {
    const token = useUserStore(state => state.token)
    const disconnect = useRoomStore(state=>state.disconnect)
    useEffect(()=>{
        disconnect();
    },[])
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/unauthorized');
        }
    }, [])
    return (
        <div className='mt-16 flex justify-center items-center max-md:items-start h-[calc(100vh-32px)]'>
            <div className='flex flex-col py-4 px-12 justify-center w-1/2 max-xl:w-2/3 max-lg:w-3/4 max-md:w-full max-md:flex-col max-2xl:w-1/2 shadow-xl bg-white gap-4 rounded-xl'>
                <div className="divider divider-warning text-main text-3xl font-bold text-center font-itim">Create Game</div>
                <CreateGameCollection />
            </div>
        </div>
    )
}
