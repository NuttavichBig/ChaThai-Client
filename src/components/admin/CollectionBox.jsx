import React from 'react'
import { BinIcon, EditIcon } from '../../icon/icon'
import useCollectionStore from '../../stores/collection-store'



export default function CollectionBox(props) {
    const {item,deleteData,setPageData} = props
    const getCollectionDetail = useCollectionStore(state=>state.getCollectionDetail)
    const setNullCurrent = useCollectionStore(state=>state.setNullCurrent)

    const hdlGetDetail = async()=>{
        try{
            const result = await getCollectionDetail(item.id)
            setNullCurrent()
            setPageData(prv => ({ ...prv, selected: result }))
            document.getElementById('edit_collection_modal').showModal()
        }catch(err){
            const errMsg = err?.response?.data?.message || err.message
            console.log(errMsg)
            setPageData(prv => ({ ...prv, pageErr: errMsg }))
        }

    }
  return (
    <div className='bg-white rounded-full w-3/4  flex justify-between p-2 text-black shadow-md
        max-sm:flex-col max-sm:items-center max-sm:w-3/4 max-sm:self-center max-md:rounded-none max-xl:w-10/12 max-lg:w-full
        hover:scale-105 transition-all'>
            <div className='flex items-center max-sm:flex-col max-md:flex-wrap max-md:gap-y-4 max-md:justify-center max-sm:flex-nowrap max-sm:gap-y-0'>

                <div className='justify-center items-center flex w-10 h-10 min-w-10 min-h-10 border-black border-2 rounded-full
                max-sm:w-16 max-sm:h-16'>
                    <img src={item.coverImage || 'https://www.svgrepo.com/show/451131/no-image.svg'} alt="image" 
                    className='w-8 h-8 rounded-full max-sm:w-14 max-sm:h-14' />
                </div>
                <p className='ml-4'>{`id : ${item.id}`}</p>
                <div className="divider divider-horizontal divider-warning max-sm:hidden"></div>
                <p>{`${item.title || '-'}`}</p>
                <div className="divider divider-horizontal divider-warning max-sm:hidden"></div>
                <p>{`author_id : ${item.authorId}`}</p>
                <div className="divider divider-horizontal divider-warning max-sm:hidden"></div>
                <p className='max-md:block'>{`created_at : ${item.updatedAt}`}</p>
            </div>
            <div className='flex items-center gap-2'>
                <div onClick={hdlGetDetail} className='hover:cursor-pointer hover:scale-90'>
                    <EditIcon className="w-8 h-8" />

                </div>
                <div className='p-2 bg-red-500 rounded-full hover:bg-black' onClick={() => {deleteData(item.id)}}>
                    <BinIcon className="w-6 h-6" />

                </div>
            </div>


        </div>
  )
}
