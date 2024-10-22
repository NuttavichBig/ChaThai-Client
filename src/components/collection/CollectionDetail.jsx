
import { useShallow } from 'zustand/shallow'
import useCollectionStore from '../../stores/collection-store'
import useUserStore from '../../stores/user-store'
import { Link } from 'react-router-dom'

export default function CollectionDetail({setActivePage}) {
  const { token, user } = useUserStore(useShallow(state => ({
    user: state.user,
    token: state.token
  })))
  const { currentCollection, deleteCollection ,setNullCurrent} = useCollectionStore(useShallow(state => ({
    currentCollection: state.currentCollection,
    deleteCollection: state.deleteCollection,
    setNullCurrent : state.setNullCurrent
  }))
  )
  const hdlDeleteCollection = async (e) => {
    try {
      if(confirm("Delete this collection?")){
        await deleteCollection(token, currentCollection?.id)
        e.target.closest('dialog').close()
        setActivePage(prv=>{
          let newArr = [...prv.collections]
          newArr.splice(prv.collections.findIndex(el=>el.id === currentCollection.id),1)
          return ({...prv,collections : newArr})
        })
      }
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message
      console.log(errMsg)
    }
  }
  return (

    <dialog id="collection_detail_modal" className="modal">
      <div className="modal-box max-w-none w-1/2 bg-white">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:border-white hover:text-white hover:bg-black"
            id="close-modal" onClick={()=>setNullCurrent()}>✕</button>
        </form>

        <div className='flex gap-4'>
          <img src={currentCollection?.coverImage || 'https://res.cloudinary.com/dvtkfd3jj/image/upload/v1728969891/NoCover.png'} alt=""
            className='w-[160px] h-[160px] shadow-xl rounded-md bg-white object-contain' />
          <div className='flex flex-col gap-2 mt-2'>
            <div className='flex flex-col'>
              <h1 className="font-bold -main text-3xl">{currentCollection?.title}</h1>
              <p className='text-gray-500 px-1'>{'by ' + currentCollection?.author?.username}</p>

            </div>

            <p className="px-1">{currentCollection?.description || 'No description'}</p>


          </div>
        </div>
        <div className='flex justify-end gap-2 mt-4'>
          {user.id === currentCollection?.author?.id &&
            <>
              <Link to={'/collection/edit'} className='btn min-h-10 h-10 text-lg font-semibold w-1/6 btn-confirm rounded-full border-0  shadow-lg'>Edit</Link>
              <button className='btn min-h-10 h-10 text-lg font-semibold w-1/6 bg-red-500 text-white rounded-full border-0  shadow-lg'
                onClick={hdlDeleteCollection}>Delete</button>
            </>
          }
          <button className='btn-cancel rounded-full min-h-10 h-10  w-1/6 hover:border-black hover:text-black text-lg'
            onClick={(e) => { e.target.closest('dialog').close();
              setNullCurrent()
             }}>Close</button>
        </div>
      </div>
    </dialog>
  )
}
