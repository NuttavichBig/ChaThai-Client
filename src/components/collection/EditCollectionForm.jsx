import React, { useState } from 'react'
import AddPhoto from './AddPhoto'
import WordListInput from './WordListInput'
import { Link, useNavigate } from 'react-router-dom'
import useCollectionStore from '../../stores/collection-store'
import useUserStore from '../../stores/user-store'
import { useShallow } from 'zustand/shallow'


export default function EditCollectionForm() {
    const {currentCollection,updateCollection,loading,setLoading}= useCollectionStore(useShallow(state => ({
        currentCollection : state.currentCollection,
        loading : state.loading,
        updateCollection :state.updateCollection,
        setLoading : state.setLoading
    })))
    const token = useUserStore(state => state.token)
    const [input, setInput] = useState({
        title: currentCollection?.title,
        description: currentCollection?.description || '',
        file: null,
        wordList: [...currentCollection?.words].map(el=>el.word),
        imgDeleted : false,
        error :"",
    })
    const navigate = useNavigate();
    const maximumWord = 50

    const hdlChange = (e) => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlAddWord = () => {
        if (input.wordList.length < maximumWord) {
            let newArr = [...input.wordList]
            newArr.push('')
            setInput(prv => ({ ...prv, wordList: newArr }))
        }
    }

    const hdlSubmit = async(e) => {
        try {
            e.preventDefault();
            setLoading(true)
            if(!input.title.trim())throw new Error("Title must be provided")
            input.wordList.forEach((item) => {
                if (item.trim() == '') {
                    const err = new Error("Please don't leave input empty and at least 10 words")
                    throw err
                }
            })
            console.log(input)
            const body = new FormData()
            body.append('title', input.title)
            body.append('description', input.description)
            if (input.file) {
                body.append('coverImage', input.file)
            }else{
                if(input.imgDeleted){
                    body.append('deleteImage' , input.imgDeleted)
                }
            }
            input.wordList.forEach((item, index) => {
                body.append(`words[${index}]`, item)
            })
            console.log(body)
            await updateCollection(token, currentCollection?.id ,body)
            setInput(prv=>({...prv,error : ''}))
            navigate('/collection')
        } catch (err) {
            const errMsg = err?.response?.data?.message || err.message
            console.log(errMsg)
            setInput(prv => ({ ...prv, error: errMsg }))
        }finally{
            setLoading(false)
        }
    }
    return (
        <form className='flex flex-col py-4 px-16 justify-center w-2/3 max-xl:w-2/3 max-lg:w-3/4 max-md:w-full max-md:flex-col max-2xl:w-1/2 shadow-xl bg-white gap-8 rounded-xl'
            onSubmit={hdlSubmit}>
            <h1 className='text-5xl max-md:text-4xl max-2xl:text-4xl font-bold font-itim py-2 bg-text rounded-3xl w-1/2 max-2xl:w-3/4 max-md:w-full text-center text-white shadow-xl'>
                Edit Collection</h1>
            <div className='flex gap-2'>
                <div className='flex justify-center items-center'>
                    <AddPhoto file={input.file} setInput={setInput} currentImage={currentCollection?.coverImage} className="flex justify-center items-center bg-sub hover:bg-slate-200 w-[160px] h-[160px] max-lg:w-[120px] max-lg:h-[120px]  rounded-lg relative cursor-pointer border" />
                </div>
                <div className='flex flex-col gap-2 w-[calc(100%-160px)] max-lg:w-[calc(100%-100px)]'>
                    <input className='bg-sub text-4xl font-itim p-4 text-main rounded-xl shadow-lg max-lg:text-2xl'
                        type='text' placeholder='Collection Name'
                        name='title' value={input.title}
                        onChange={hdlChange} />
                    <textarea className='bg-sub text-xl font-itim py-2 px-4 text-main rounded-xl h-48 shadow-lg max-lg:text-md'
                        type='text' placeholder='Description'
                        name='description' value={input.description}
                        onChange={hdlChange} />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-4xl font-semibold font-itim py-2 bg-text rounded-xl text-center text-white shadow-lg'>Word List</h1>
                <div className='py-4 px-[20%] max-lg:px-[5%] max-xl:px-[12%] bg-sub rounded-xl shadow-xl max-2xl:px-[16%]'>
                    <div className='flex flex-col gap-2'>
                        {input.wordList.map((item, index) => (
                            <WordListInput key={index} index={index} input={input} setInput={setInput} />
                        ))}
                    </div>
                    {input.wordList.length < maximumWord && <button type="button" 
                    className='btn-confirm rounded-full text-2xl text-center py-2 px-6 shadow-lg mt-2 w-full btn border-0'
                        onClick={hdlAddWord}>Add New Word +</button>}
                </div>
            </div>
            <div className='w-full flex justify-between'>

                <p className='text-red-500'>
                        {input.error && input.error}
                </p>
                <div className='w-1/2 justify-end gap-4 flex pr-4'>
                        {loading ? <span className="loading loading-bars loading-md"></span> 
                        :
                        <>
                        <button type='submit' className='btn-confirm py-2 px-8 rounded-full shadow-lg text-xl font-semibold btn border-0'>Confirm</button>
                        <Link to={'/collection'} type="button"
                        className='btn-cancel py-1.5 px-8 rounded-full text-xl font-semibold hover:text-black hover:border-black'>Cancel</Link>
                        </>}
                        
                </div>
            </div>
        </form>
    )
}
