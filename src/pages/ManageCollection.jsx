import React, { useEffect, useState } from 'react'
import AdminSideBar from '../components/AdminSideBar'
import useUserStore from '../stores/user-store'
import axios from 'axios'
import CollectionBox from '../components/admin/CollectionBox'
import EditCollectionModal from '../components/admin/EditCollectionModal'
import useCollectionStore from '../stores/collection-store'
const API = import.meta.env.VITE_API

export default function ManageCollection() {
  const token = useUserStore(state=>state.token)
  const [pageData , setPageData] = useState({
    collectionData : [],
    pageErr : '',
    selected : null,
  })
  const deleteCollection = useCollectionStore(state=>state.deleteCollection)
  const updateCollection = useCollectionStore(state=>state.updateCollection)
  useEffect(()=>{
    getCollectionData();
  },[])
  const getCollectionData =async()=>{
    try{
      const result = await axios.get(`${API}/collection?limit=300`)
      console.log(result)
      setPageData(prv=>({...prv,collectionData : result.data}))
    }catch(err){``
      const errMsg = err?.response?.data?.message || err.message
      console.log(errMsg)
      setPageData(prv => ({ ...prv, pageErr: errMsg }))
    }
  }
  const deleteData = async(id)=>{
    try{
      if(confirm('Delete this collection?')){
        await deleteCollection(token,id)
        setPageData(prv => ({ ...prv, collectionData: pageData.collectionData.filter(item => item.id !== id) }))
      }
    }catch(err){
      const errMsg = err?.response?.data?.message || err.message
      console.log(errMsg)
      setPageData(prv => ({ ...prv, pageErr: errMsg }))
    }
  }

  const updateData = async(id,data)=>{
    try{
      if(confirm('Confirm to update')){
        const result = await updateCollection(token,id,data)
        const newArr = [...pageData.collectionData]
        newArr.splice(newArr.findIndex(el => el.id === id), 1, result)
        console.log(newArr)
        setPageData(prv => ({ ...prv, collectionData: newArr }))
      }
    }catch(err){
      const errMsg = err?.response?.data?.message || err.message
      console.log(errMsg)
      setPageData(prv => ({ ...prv, pageErr: errMsg }))
    }
  }
  return (
    <>
    <AdminSideBar />
    <div className='mt-16 h-[calc(100vh-64px)]'>
      <h2 className='text-black text-4xl font-bold pl-8 py-6'>Collection Management</h2>
      <p className='text-sm text-red-500 pl-16 pb-2'>{pageData.pageErr}</p>
      <div className='pl-16 max-lg:pl-8 max-md:p-2 flex flex-col gap-2 overflow-hidden'>
      {pageData?.collectionData.map((item,index)=><CollectionBox key={index} item={item} setPageData={setPageData} deleteData={deleteData}/>)}
      </div>
    </div>
    <EditCollectionModal selected={pageData.selected} setPageData={setPageData} updateData={updateData}/>
  </>
  )
}
