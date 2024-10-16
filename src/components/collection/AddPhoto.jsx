import React from 'react'
import { PhotoIcon } from '../../icon/icon'
import useCollectionStore from '../../stores/collection-store'

export default function AddPhoto(props) {
    const { file, setInput,currentImage, ...restProps } = props
    const setNoImage = useCollectionStore(state=>state.setNoImage)
    const hdlFileChange = e => {
        setInput(prv => ({ ...prv, file: e.target.files[0] }))
    }
    console.log(currentImage)
    const hdlClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInput(prv => ({ ...prv, file: null }))
        document.getElementById('input-file').value = ''
    }
    const hdlDeleteImage = (e)=>{
        e.preventDefault()
        e.stopPropagation();  
        setNoImage();
        setInput(prv=>({...prv,imgDeleted : true}))
    }
    return (
        <div className='p-1 border rounded-lg'>
            <div {...restProps}
                onClick={() => document.getElementById('input-file').click()}>
                <input type="file" className='hidden' id='input-file'
                    onChange={hdlFileChange} />
                {file ? <>
                    <img src={URL.createObjectURL(file)} className='w-full h-full object-contain' />
                    <button className='btn btn-sm btn-circle btn-outline border-gray-300 absolute top-1 right-1 op opacity-0 hover:opacity-100' onClick={hdlClose}>X</button>
                </> : currentImage? 
                <>
                <img src={currentImage} className='w-full h-full object-contain' />
                <button className='btn btn-sm btn-circle btn-outline border-gray-300 absolute top-1 right-1 op opacity-0 hover:opacity-100' onClick={hdlDeleteImage}>X</button>
                </>
                
                :<PhotoIcon className="w-10 h-10" />
                }
            </div>
        </div>
    )
}
