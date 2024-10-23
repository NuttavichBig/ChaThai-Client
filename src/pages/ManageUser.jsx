import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useUserStore from '../stores/user-store'
import UserBox from '../components/admin/UserBox'
import AdminSideBar from '../components/AdminSideBar'
import EditUserModal from '../components/admin/EditUserModal'
const API = import.meta.env.VITE_API
export default function ManageUser() {
  const token = useUserStore(state => state.token)
  const [pageData, setPageData] = useState({
    userData: [],
    pageErr: '',
    selected: null,
  })
  useEffect(() => {
    getUserData();
  }, [])

  const getUserData = async () => {
    try {
      const result = await axios.get(`${API}/admin`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(result)
      setPageData(prv => ({ ...prv, userData: result.data }))
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message
      console.log(errMsg)
      setPageData(prv => ({ ...prv, pageErr: errMsg }))
    }
  }

  const updateUser = async (id, data) => {
    try {
      if (confirm("Confirm to update")) {
        const result = await axios.patch(`${API}/admin/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const newArr = [...pageData.userData]
        newArr.splice(newArr.findIndex(el => el.id === id), 1, result.data)
        setPageData(prv => ({ ...prv, userData: newArr }))
      }
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message
      console.log(errMsg)
      setPageData(prv => ({ ...prv, pageErr: errMsg }))
    }
  }

  const deleteUser = async (id) => {
    try {
      if (confirm("Are you sure to delete this user?")) {

        const result = await axios.delete(`${API}/admin/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(result)
        setPageData(prv => ({ ...prv, userData: pageData.userData.filter(item => item.id !== id) }))
      }
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message
      console.log(errMsg)
      setPageData(prv => ({ ...prv, pageErr: errMsg }))
    }
  }
  return (
    <>
      <AdminSideBar />
      <div className='mt-16 h-[calc(100vh-64px)]'>
        <h2 className='text-black text-4xl font-bold pl-8 py-6'>User Management</h2>
        <p className='text-sm text-red-500 pl-16 pb-2'>{pageData.pageErr}</p>
        <div className='pl-16 max-lg:pl-8 max-md:p-2 flex flex-col gap-2 overflow-hidden'>
          {pageData?.userData.map((item, index) => <UserBox key={index} item={item} deleteUser={deleteUser} setPageData={setPageData} />)}
        </div>
      </div>
      <EditUserModal updateUser={updateUser} setPageData={setPageData} selected={pageData.selected} />
    </>
  )
}
