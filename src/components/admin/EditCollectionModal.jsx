import React, { useEffect, useState } from 'react'
import { PhotoIcon } from '../../icon/icon'

export default function EditCollectionModal(props) {
    const { selected, updateData, setPageData } = props
    const [input, setInput] = useState({
        title: '',
        description: '',
        file: null,
        deleteImage: false,
        err: '',
        loading: false,
    })
    useEffect(() => {
        document.getElementById('input-file').value = ''
        if (selected) {
            setInput(prv => ({ ...prv, title: selected.title, description: selected.description, file: null, deleteImage: false, err: '' }))
        }
    }, [selected])
    const hdlFileChange = (e) => {
        setInput(prv => ({ ...prv, file: e.target.files[0] }))
    }
    const hdlChange = (e) => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
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
        setPageData(prv => ({ ...prv, selected: { ...selected, coverImage: null } }))
        setInput(prv => ({ ...prv, deleteImage: true }))
    }
    const hdlSubmit = (e) => {
        e.preventDefault();
        try {
            setInput(prv => ({ ...prv, loading: true }))
            const data = new FormData()
            if (!input.title.trim()) throw new Error("Title should be provided")
            if (input.title !== selected.title) {
                data.append('title', input.title)
            }
            if(input.description !== selected.description){
                data.append('description',input.description)
            }
            if(input.file){
                data.append('coverImage',input.file)
            }else{
                if(input.deleteImage){
                    data.append('deleteImage',input.deleteImage)
                }
            }
            updateData(selected.id,data)
            setInput(prv => ({ ...prv, title: selected.title, description: selected.description  || '',file : null ,deleteImage : false , err : ''}))
            e.target.closest('dialog').close()
        } catch (err) {
            const errMsg = err?.response?.data?.message || err.message
            console.log(errMsg)
            setPageData(prv => ({ ...prv, err: errMsg }))
        } finally {
            setInput(prv => ({ ...prv, loading: false }))
        }
    }
    return (
        <dialog id="edit_collection_modal" className="modal">
            <form className="modal-box max-w-none w-1/2 bg-white p-8 max-sm:w-3/4" onSubmit={hdlSubmit}>
                <div className='flex gap-6 max-md:flex-col'>
                    {/* Profile image */}
                    <div className='relative w-24 h-24 border-main border-2 rounded-full items-center justify-center flex'
                        onClick={() => document.getElementById('input-file').click()}>

                        <input type="file" className='hidden' id='input-file'
                            onChange={hdlFileChange} />
                        {input.file ? <>
                            <img src={URL.createObjectURL(input.file)} className='w-20 h-20 rounded-full object-contain border-2' />
                            <button className='btn btn-sm btn-circle btn-outline border-gray-300 absolute -top-1 -right-1 op opacity-0 hover:opacity-100 bg-white' onClick={hdlClose}>X</button>
                        </> : selected?.coverImage ?
                            <>
                                <img src={selected?.coverImage} className='w-20 h-20 rounded-full object-contain border-2' />
                                <button className='btn btn-sm btn-circle btn-outline border-gray-300 absolute -top-1 -right-1 op opacity-100 hover:opacity-100 bg-white' onClick={hdlDeleteImage}>X</button>
                            </>

                            : <PhotoIcon className="w-12 h-12" />
                        }
                    </div>
                    <div className='flex flex-col gap-4 w-3/4 max-lg:w-4/5 max-md:w-full'>
                        <input type="text" value={input.title} placeholder='Title'
                            className='p-2 rounded-md bg-white border-main border text-black'
                            name='title' onChange={hdlChange} />
                        <textarea value={input.description} placeholder='Description'
                            className='p-2 rounded-md bg-white border-main border text-black'
                            name='description' onChange={hdlChange}></textarea>

                    </div>
                </div>
                <div className='flex justify-end gap-2 mt-4'>
                    <p className='text-sm text-red-500'>{input.err}</p>
                    <button type='submit' className='btn btn-confirm border-0 h-10 min-h-10 w-1/6 max-lg:w-1/4 max-md:w-1/3 rounded-full text-lg'>{input.loading ? <span className="loading loading-spinner loading-md"></span> : 'Confirm'}</button>
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
