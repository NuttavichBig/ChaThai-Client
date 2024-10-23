
import useUserStore from '../stores/user-store'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'

export default function ProtectionRoute(props) {
    console.log(props)
    const {element,reqRole} =props
    const {token,getMe} = useUserStore(useShallow(state =>({ 
        token : state.token,
        getMe : state.getMe
    })))
    const [isAllow, setIsAllow] = useState(null)

    useEffect(()=>{
        checkRole()
    },[])


    const checkRole = async () => {
        try {
            const result = await getMe(token)
            const role = result.role;
            if(role == "ADMIN" || role == reqRole){
                return setIsAllow(true)
            }
            setIsAllow(false)

        } catch (err) {
            const errCode = err?.response?.status || err.status
            if(errCode === 401){
                setIsAllow(false)
            }else{
                const errMsg = err?.response?.data.message || err.message
                console.log(errMsg)
                setIsAllow(false)
            }
        }

    }
    console.log(isAllow)
    if(isAllow === null) return <div>Loading</div>
    if(isAllow) return element
    return <Navigate to={'/unauthorized'}/>
}
