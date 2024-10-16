import React from 'react'
import CollectionCard from './CollectionCard'
import { NextPageIcon, PrevPageIcon } from '../../icon/icon'
import useCollectionStore from '../../stores/collection-store'

export default function CollectionPageBox(props) {
  const {activePage , setActivePage}= props
  const getCollectionDetail = useCollectionStore(state=>state.getCollectionDetail)

  const hdlPageChange = (val)=>{
    console.log(val)
    if(activePage.page+val < 1 || (activePage.collections.length < 12 && val ===1)) {
      console.log('Page cannot change')
      return
    }
    setActivePage(prv=>({...prv,page : activePage.page+val}))
  }
  return(
    <div className='flex flex-wrap gap-4 p-3 bg-sub '>
        {/* Map array for card */}
        {activePage.collections.map(el=><CollectionCard key={el.id} collection={el} func={(collectionId)=>{
                      document.getElementById('collection_detail_modal').showModal();
                      getCollectionDetail(collectionId)
                    }}/>)}
        <div className='flex gap-4 items-center w-full justify-center'>
          <button onClick={()=>hdlPageChange(-1)}><PrevPageIcon className=" w-5 h-5 hover:-scale-90"/></button>
          <p className='font-semibold'>Page {activePage.page}</p>
          <button onClick={()=>hdlPageChange(1)}><NextPageIcon className=" w-5 h-5 hover:scale-90"/></button>
        </div>
    </div>
  )
}
