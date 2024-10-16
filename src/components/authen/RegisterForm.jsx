import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserStore from '../../stores/user-store'
import { useShallow } from 'zustand/shallow'

export default function RegisterForm() {

    const { token, register, login } = useUserStore(useShallow(state => ({
        token: state.token,
        register: state.register,
        login: state.login
    })))
    const [input, setInput] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    })
    const [loading, setLoading] = useState({
        isLoading: false,
        err: '',
    })

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/')
        }

    })

    const hdlInputChange = (e) => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading({ err: '', isLoading: true })
            const body = {
                username: input.username,
                password: input.password,
                confirmPassword: input.confirmPassword,
                email: input.email,
            }
            await register(body)
            await login(input.username, input.password)
            navigate('/')
        } catch (err) {
            console.log(err)
            const errMsg = err?.response?.data?.message || err.message
            setLoading(prv => ({ ...prv, err: errMsg }))
        } finally {
            setLoading(prv => ({ ...prv, isLoading: false }))
        }
    }
    return (
        <form action="" className='flex flex-col mx-auto w-4/5 text-center gap-4'
            onSubmit={hdlSubmit}>
            <div className='flex justify-center'>
                <p className='text-2xl font-semibold font-itim'>Register</p>
            </div>
            <div className='flex flex-col gap-2'>
                <input type='text' placeholder='username'
                    className='px-8 py-2 text-xl rounded-full shadow-inner border-2 border-gray-200 text-center'
                    name='username'
                    onChange={hdlInputChange} />
                <input type='password' placeholder='password'
                    className='px-8 py-2 text-xl rounded-full shadow-inner border-2 border-gray-200 text-center'
                    name='password'
                    onChange={hdlInputChange} />
                <input type='password' placeholder='confirm password'
                    className='px-8 py-2 text-xl rounded-full shadow-inner border-2 border-gray-200 text-center'
                    name='confirmPassword'
                    onChange={hdlInputChange} />
                <input type='text' placeholder='Email'
                    className='px-8 py-2 text-xl rounded-full shadow-inner border-2 border-gray-200 text-center'
                    name='email'
                    onChange={hdlInputChange} />
                {loading.isLoading && <span className="loading loading-spinner text-accent self-center"></span>}
                {loading.err && <p className='text-sm text-red-500'>{loading.err}</p>}
            </div>
            <button className='btn rounded-full bg-black border-none text-white text-xl font-itim shadow-xl hover:text-black'>Confirm</button>
            <Link to={'/'} className='self-center w-4/5 py-1 rounded-full text-md font-itim btn-cancel hover:border-black hover:text-black'>Cancel</Link>
        </form>
    )
}
