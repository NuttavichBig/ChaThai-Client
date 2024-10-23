import React from 'react'
import { useEffect } from 'react'
import useRoomStore from '../stores/room-store'
export default function () {
    const disconnect = useRoomStore(state=>state.disconnect)
    useEffect(()=>{
        disconnect();
    },[])
  return (
    <></>
  )
}
