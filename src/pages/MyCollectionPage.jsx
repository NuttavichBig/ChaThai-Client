import React, { act, useEffect, useState } from 'react'
import CollectionPageBox from '../components/collection/CollectionPageBox'
import { useShallow } from 'zustand/shallow'
import { Link } from 'react-router-dom'
import useCollectionStore from '../stores/collection-store'
import useUserStore from '../stores/user-store'
import CategoryButton from '../components/collection/CategoryButton'
import useRoomStore from '../stores/room-store'

export default function MyCollectionPage() {
  // get data from store
  const user = useUserStore(state => state.user)
  const { currentCollection, getOfficialCollection, getCommunityCollection, getOwnCollection } = useCollectionStore(useShallow(state => ({
    currentCollection: state.currentCollection,
    getOfficialCollection: state.getOfficialCollection,
    getCommunityCollection: state.getCommunityCollection,
    getOwnCollection: state.getOwnCollection,
  })))
  const disconnect = useRoomStore(state=>state.disconnect)
  useEffect(()=>{
      disconnect();
  },[])


  // Check selected category
  const [activePage, setActivePage] = useState({
    category: 'Official',
    page: 1,
    collections: [],
  })



  // Get data when category switch
  useEffect(() => {

    hdlCollectionGet()
  }, [activePage.category, activePage.page])


  // Get data function
  const hdlCollectionGet = async () => {
    let result = []
    if (activePage.category === 'Official') result = await getOfficialCollection(activePage.page)
    if (activePage.category === 'Community') result = await getCommunityCollection(activePage.page)
    if (activePage.category === 'Favorite') console.log('this feature soon')
    if (activePage.category === 'Own') result = await getOwnCollection(user.id, activePage.page)
    // console.log(result)
    setActivePage(prv => ({ ...prv, collections: result }))
  }

  // handle category's buttons click
  const hdlClick = (e) => {
    setActivePage(prv => ({ ...prv, page: 1, category: e.target.name }))
  }
  console.log(currentCollection)
  return (
    <>
      <div className='mt-16 flex justify-center items-center max-md:items-start h-[calc(100vh-64px)] text-black'>
        <div className='flex flex-col py-4 px-12 justify-center w-1/2 max-xl:w-2/3 max-lg:w-3/4 max-md:w-full max-md:flex-col max-2xl:w-1/2 shadow-xl bg-white gap-4 rounded-xl'>
          <div className="divider divider-warning text-main text-3xl font-bold text-center font-itim">My Collection</div>
          <div className='flex flex-col'>
            <CategoryButton hdlClick={hdlClick} category={activePage.category} className='flex font-itim' />
            {/* Collection box depend on category selected */}
            <CollectionPageBox activePage={activePage} setActivePage={setActivePage} />

          </div>
          <div className='flex justify-between gap-2'>
            <Link to={'/collection/create'} className='min-h-10 h-10 flex-1 flex items-center justify-center'><button className='btn w-full h-full min-h-full border-0 text-lg btn-confirm  rounded-full shadow-lg font-semibold font-itim'>
              Create New +</button></Link>
            <Link to={'/'} className='min-h-10 h-10 w-1/5 flex items-center justify-center'><button className='w-full h-full text-lg btn-cancel rounded-full  font-semibold hover:border-black hover:text-black font-itim'>
              Back</button></Link>
          </div>
        </div>
      </div>
      
    </>
  )
}
