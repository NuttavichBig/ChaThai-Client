import React, { useEffect } from 'react'
import RegisterForm from '../components/authen/RegisterForm'
import useRoomStore from '../stores/room-store';

export default function RegisterPage() {
    const disconnect = useRoomStore(state=>state.disconnect)
    useEffect(()=>{
        disconnect();
    },[])
    return (
        <div className='mt-8 flex justify-center items-center max-md:items-start h-[calc(100vh-64px)]'>
            <div className='w-1/5 bg-white rounded-xl px-6 py-10 max-md:w-3/4 max-md:self-center max-md:rounded-none shadow-xl'>
                <RegisterForm />
            </div>
        </div>
    )
}
