import React from 'react'
import { CrownIcon } from '../../icon/icon'
import useRoomStore from '../../stores/room-store'

export default function PlayerBox(props) {
  const changeMaster = useRoomStore(state=>state.changeMaster)
    const {player,self} = props
    console.log(player)


    const hdlMasterChange = (e)=>{
      if(confirm("Promote this player to be Master?")){
        changeMaster(player.userId)
      }
    }
  return (
    <div className={`w-1/2 py-1 px-4 rounded-full flex justify-start items-center gap-2 shadow-lg ${player?.isReady? 'bg-confirm' : 'bg-white'}`}>
        <div className='p-1 border-2 border-main rounded-full relative'>

        <img src={player?.users?.profileImage || 'https://www.svgrepo.com/show/522440/profile.svg'} alt="profile pic"
        className='w-10 h-10 rounded-full'/>
        {self?.isMaster && <div className='w-12 h-12 rounded-full absolute bg-black flex justify-center items-center bottom-0 left-0 opacity-0 hover:opacity-75'
        onClick={hdlMasterChange}>
          <CrownIcon className="w-6 h-6"/></div>}
        </div>
        <p className='text-xl text-main text-center'>{player?.users?.displayName}</p>
    </div>
  )
}
