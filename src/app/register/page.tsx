'use client'
import Navbar from '@/components/Navbar'
import React from 'react'
import { useRouter } from 'next/navigation'
const Register = () => {
    const router = useRouter();
    return (
        <>
        <Navbar/>
            <div className='w-[100%] my-5'>
                <h1 className='text-xl font-bold py-5 text-center'>Register</h1>
                {/* <form action=""> */}
                    <div className='flex flex-col justify-center pt-[50px] gap-y-5 w-[80%] m-auto'>
                        <label htmlFor="name"> Full name </label>
                        <input className='border-2 rounded-xl p-2 py-3 w-full' type="text" id='name' name='name' placeholder="e.g John Doe" />

                        <label htmlFor="name"> Phone Number </label>
                        <input className='border-2 rounded-xl p-2 py-3 w-full' type="phone" placeholder="phone number e.g 0782923093" />


                        <div className='flex flex-row justify-center items-center text-center bg-secondary text-primary rounded-full px-3 py-4 my-5'>
                            <button onClick={()=>{router.push('/dashboard')}}>Register</button>
                        </div>
                    </div>
                {/* </form> */}
            </div>
        </>
    )
}

export default Register