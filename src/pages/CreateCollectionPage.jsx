
import { useEffect } from 'react'
import CreateCollectionForm from '../components/collection/CreateCollectionForm'
import useRoomStore from '../stores/room-store'

export default function CreateCollectionPage() {
    const disconnect = useRoomStore(state=>state.disconnect)
    useEffect(()=>{
        disconnect();
    },[])
    return (
        <div className='mt-16 flex justify-center items-start max-md:items-start h-[calc(100vh-32px)]'>
           <CreateCollectionForm/>
        </div>
    )
}
