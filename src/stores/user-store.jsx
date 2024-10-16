import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const API = import.meta.env.VITE_API




const useUserStore = create(persist((set,get)=>({
    user : null,
    token : '',
    login : async(username,password)=>{
        const result = await axios.post(API+'/auth/login',{username,password})
        set({token : result.data.token , user : result.data.user})
    },
    logout : ()=>{
        set({user:null,token:''})
    },
    update : async(body,token)=>{
        const result = await axios.patch(API+'/auth/update',body,{
            headers :{
                Authorization : `Bearer ${token}`
            }
        }
        )
        set({user : result.data})
    },
    register : async(body)=>{
        console.log(body)
        await axios.post(API+'/auth/register',body)
    },
    getMe : async(token)=>{
        const result = await axios.get(API+"/auth/getMe",{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })
        return result.data
    }
})
,{
    name : "stateUserData",
    storage : createJSONStorage(()=>localStorage)
}
))



export default useUserStore