import React from 'react'
import RegisterForm from '../components/authen/RegisterForm'

export default function RegisterPage() {
    return (
        <div className='mt-8 flex justify-center items-center max-md:items-start h-[calc(100vh-64px)]'>
            <div className='w-1/5 bg-white rounded-xl px-6 py-10 max-md:w-3/4 max-md:self-center max-md:rounded-none shadow-xl'>
                <RegisterForm />
            </div>
        </div>
    )
}
