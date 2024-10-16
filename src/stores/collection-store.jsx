import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const API = import.meta.env.VITE_API;




const useCollectionStore = create(persist((set,get)=>({
    currentCollection : null,
    loading : false,
    setLoading : (bool)=>{
        set({loading : bool})
    },
    getOfficialCollection : async(page,limit=12)=>{
        console.log('Get official')
        const result = await axios.get(`${API}/collection?role=ADMIN&page=${page}&limit=${limit}`)
        console.log(result)
        return result.data
    },
    getCommunityCollection : async(page,limit=12)=>{
        console.log('Get Community')
        const result = await axios.get(`${API}/collection?role=USER&page=${page}&limit=${limit}`)
        console.log(result)
        return result.data
    },
    getOwnCollection : async(id,page,limit=12)=>{
        console.log('Get Own')
        const result = await axios.get(`${API}/collection?author=${id}&page=${page}&limit=${limit}`)
        console.log(result)
        return result.data
    },
    createCollection : async(token,body)=>{
        // set({loading : true})
        const result = await axios.post(`${API}/collection`,body,{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })
        console.log(result)
        // set({loading : false})
    },
    getCollectionDetail : async(id)=>{
        set({loading : true})
        const result = await axios.get(`${API}/collection/${id}`)
        set({currentCollection : result.data,loading : false})
    },
    deleteCollection : async(token,id)=>{
        set({loading : true})
        const result = await axios.delete(`${API}/collection/${id}`,{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })
        console.log(result)
        set({loading : false})

    },
    setNullCurrent : ()=>{
        set({currentCollection : null})
    },
    updateCollection : async(token,id,body)=>{
        const result = await axios.patch(`${API}/collection/${id}`,body,{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })
        console.log(result)
    },
    setNoImage : async()=>{
        set({currentCollection : {...get().currentCollection,coverImage : null}})
    }


})
,{
    name : "statePostData",
    storage : createJSONStorage(()=>localStorage)
}
))



export default useCollectionStore