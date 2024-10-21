
import { Navigate, useNavigate } from 'react-router-dom'
import EditCollectionForm from '../components/collection/EditCollectionForm'
import useCollectionStore from '../stores/collection-store'
import useUserStore from '../stores/user-store'
import { useShallow } from 'zustand/shallow'
import { useEffect } from 'react'
import useRoomStore from '../stores/room-store'

export default function EditCollectionPage() {
    const currentCollection = useCollectionStore(state=>state.currentCollection)
    const {token,getMe} = useUserStore(useShallow(state =>({ 
        token : state.token,
        getMe : state.getMe
    })))
    const disconnect = useRoomStore(state=>state.disconnect)
    useEffect(()=>{
        disconnect();
    },[])
    const navigate = useNavigate();
    useEffect(()=>{
        if(!currentCollection){
           return navigate('/collection')
        }
        userCheck()
    },[])
    const userCheck = async()=>{
        const user = await getMe(token)
        if(user.id !== currentCollection?.author?.id){
            navigate('/unauthorized')
        }
    }
    return (
        <div className='mt-16 flex justify-center items-start max-md:items-start h-[calc(100vh-32px)]'>
           {currentCollection && <EditCollectionForm/>}
        </div>
    )
}
