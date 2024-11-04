'use client'
import Navbar from '@/components/Navbar'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import { setUser } from '@/utils/user/user'
const Register = () => {
    const phoneRef = useRef<HTMLInputElement>(null);
    const fullnameRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<any>(null);
    const [warning, setWarning] = useState<string>();

    const user = useSelector((state: RootState) => state.userInfo.user);
    console.log(user);
    const dispatch = useDispatch();
    // const handleName = (event: any) => {
    //     setFullname(event.target?.value);
    // }
    // const handlePhone = (event: any) => {
    //     setPhone(event.target.value);
    // }
    const handleSaveUser = async (user: any) => {
        const form = await fetch('http://localhost:3005/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        return form;
    }
    const handleSubmit = async (event: any) => {
        console.log(phoneRef.current?.value)
        event.preventDefault();
        console.log(genderRef.current?.value)
        if (phoneRef.current?.value && fullnameRef.current?.value) {
            dispatch(setUser({ name: fullnameRef.current.value, phone: phoneRef.current.value, gender: genderRef.current.value, type: user.type, hasScanned: true }));
            localStorage.setItem('user', JSON.stringify({ name: fullnameRef.current.value, phone: phoneRef.current.value, gender: genderRef.current.value, type: user.type, hasScanned: true }));
            const response = await handleSaveUser({ fullname: fullnameRef.current.value, phone: phoneRef.current.value, type: user.type, hasScanned: true });
            const data = await response.json();
            console.log(data);
            if (data) {
                console.log('User saved successfully')
                dispatch(setUser({ ...user, name: data.user.fullname, phone: data.user.phone, gender: data.user.gender }));
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('token', JSON.stringify({ token: data.token }))
                router.push('/dashboard');
            }

        }
        else {
            setWarning('Please fill in all fields');
        }
    }

    const router = useRouter();


    return (
        <>
            <Navbar />
            <div className='w-[100%] my-5'>
                <h1 className='text-xl font-bold py-5 text-center'>Register</h1>
                {/* <form action=""> */}
                <div className='flex flex-col justify-center pt-[50px] gap-y-5 w-[80%] m-auto'>
                    <label htmlFor="name"> Full name </label>
                    <input ref={fullnameRef} className='border-2 rounded-xl p-2 py-3 w-full' type="text" id='name' name='name' placeholder="e.g John Doe" />

                    <label htmlFor="name"> Phone Number </label>
                    <input ref={phoneRef} className='border-2 rounded-xl p-2 py-3 w-full' type="phone" placeholder="phone number e.g 0782923093" />
                    <label htmlFor="geender">Gender</label>
                    <select ref={genderRef} className='border-2 rounded-xl p-2 py-3 w-full pr-3' id="gender" name="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <div>
                        {warning && <p className='text-red-500'>{warning}</p>}
                    </div>
                    <div className='flex flex-row justify-center items-center text-center bg-secondary text-primary rounded-full px-3 py-4 my-5'>
                        <button onClick={handleSubmit}>Register</button>
                    </div>


                </div>
                {/* </form> */}
            </div>
        </>
    )
}

export default Register