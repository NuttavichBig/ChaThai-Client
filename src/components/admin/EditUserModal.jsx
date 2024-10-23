import React, { useEffect, useState } from 'react'
import { PhotoIcon } from '../../icon/icon'

export default function EditUserModal(props) {
    const { selected, updateUser, setPageData } = props
    const [input, setInput] = useState({
        email: '',
        status: '',
        password: '',
        file: null,
        deleteImage: false,
        err : '',
        loading : false,

    })
    useEffect(() => {
        document.getElementById('input-file').value = ''
        if (selected) {
            setInput(prv => ({ ...prv, email: selected.email, status: selected.status ,file : null ,deleteImage : false , err : '', password: ''}))
        }
    }, [selected])
    const hdlFileChange = (e) => {
        setInput(prv => ({ ...prv, file: e.target.files[0] }))
    }
    const hdlClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInput(prv => ({ ...prv, file: null }))
        document.getElementById('input-file').value = ''
    }
    const hdlDeleteImage = (e) => {
        e.preventDefault()
        e.stopPropagation();
        setPageData(prv => ({ ...prv, selected: { ...selected, profileImage: null } }))
        setInput(prv => ({ ...prv, deleteImage: true }))
    }
    const hdlChange = (e)=>{
        setInput(prv=>({...prv,[e.target.name] : e.target.value}))
    }
    const validateFormData = (e)=>{
        e.preventDefault();
        try{
            setInput(prv=>({...prv, loading : true}))
            const data = new FormData()
            if(!input.email.trim())throw new Error("Email should be provided")
            if(input.email !==selected.email){
                data.append('email', input.email)
            }
            if(input.status !== selected.status){
                data.append('status', input.status)
            }
            if(input.password.trim() !== ''){
                data.append('password', input.password)
            }
            if(input.file){
                data.append('profileImage',input.file)
            }else{
                if(input.deleteImage){
                    data.append('deleteImage',input.deleteImage)
                }
            }
            updateUser(selected.id ,data)
            setInput(prv => ({ ...prv, email: selected.email || '', status: selected.status ,file : null ,deleteImage : false , err : '', password: ''}))
            e.target.closest('dialog').close();
        }catch(err){
            const errMsg = err?.response?.data?.message || err.message
            console.log(errMsg)
            setPageData(prv => ({ ...prv, err: errMsg }))
        }finally{
            setInput(prv=>({...prv, loading : false}))
        }
    }
    return (
        <dialog id="edit_user_modal" className="modal">
            <form className="modal-box max-w-none w-1/2 bg-white p-8 max-sm:w-3/4" onSubmit={validateFormData}>
                <div className='flex gap-6 max-md:flex-col'>
                    {/* Profile image */}
                    <div className='relative w-24 h-24 border-main border-2 rounded-full items-center justify-center flex'
                        onClick={() => document.getElementById('input-file').click()}>

                        <input type="file" className='hidden' id='input-file'
                            onChange={hdlFileChange} />
                        {input.file ? <>
                            <img src={URL.createObjectURL(input.file)} className='w-20 h-20 rounded-full object-contain border-2' />
                            <button className='btn btn-sm btn-circle btn-outline border-gray-300 absolute -top-1 -right-1 op opacity-0 hover:opacity-100 bg-white' onClick={hdlClose}>X</button>
                        </> : selected?.profileImage ?
                            <>
                                <img src={selected?.profileImage} className='w-20 h-20 rounded-full object-contain border-2' />
                                <button className='btn btn-sm btn-circle btn-outline border-gray-300 absolute -top-1 -right-1 op opacity-100 hover:opacity-100 bg-white' onClick={hdlDeleteImage}>X</button>
                            </>

                            : <PhotoIcon className="w-12 h-12" />
                        }
                    </div>
                    <div className='flex flex-col gap-4 w-1/3 max-2xl:w-1/2 max-lg:w-3/4 max-md:w-full'>
                        <div className='flex flex-col'>

                    <h2 className='text-2xl text-black font-semibold'>{selected?.displayName}</h2>
                    <h3 className='text-lg '>@{selected?.username}</h3>
                        </div>
                    <input type="text" value={input.email} 
                    className='p-2 rounded-md bg-white border-main border text-black' 
                    name='email' onChange={hdlChange}/>
                    <select className='p-2 rounded-md bg-white border border-main text-black' value={input.status}
                    name='status' onChange={hdlChange}>
                        <option value='ACTIVE'>ACTIVE</option>
                        <option value='INACTIVE'>INACTIVE</option>
                        <option value='BANNED'>BANNED</option>
                    </select>
                    <div className='flex flex-col'>
                        <p className='pl-1 text-black'>Change Password (Optional)</p>
                    <input type="password" value={input.password} 
                    className='p-2 rounded-md bg-white border-main border text-black' 
                    name='password' onChange={hdlChange} placeholder='New Password'/>
                    </div>
                    </div>
                </div>
                <div className='flex justify-end gap-2 mt-4'>
                    <p className='text-sm text-red-500'>{input.err}</p>
                    <button type='submit' className='btn btn-confirm border-0 h-10 min-h-10 w-1/6 max-lg:w-1/4 max-md:w-1/3 rounded-full text-lg'>{input.loading?<span className="loading loading-spinner loading-md"></span>:'Confirm'}</button>
                    <button type='button' className='btn-cancel rounded-full min-h-10 h-10  w-1/6 max-lg:w-1/4 max-md:w-1/3 hover:border-black hover:text-black text-lg'
                        onClick={(e) => {
                            setPageData(prv => ({ ...prv, selected: null }))
                            e.target.closest('dialog').close();
                        }}>Close</button>
                </div>

            </form>
        </dialog>
    )
}
