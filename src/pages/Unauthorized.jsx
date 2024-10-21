import React, { useEffect } from 'react'
import useRoomStore from '../stores/room-store';

export default function Unauthorized() {
  const disconnect = useRoomStore(state=>state.disconnect)
  useEffect(()=>{
      disconnect();
  },[])
  return (
    <div>Unauthorized</div>
  )
}
