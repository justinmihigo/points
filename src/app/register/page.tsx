'use client'
import Navbar from '@/components/Navbar'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import { setUser } from '@/utils/user/user'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import Link from 'next/link'
const Register = () => {
    const ENV_PRODUCTION= process.env.ENV_PRODUCTION || 'https://points-be.onrender.com';
    const phoneRef = useRef<any>(null);
    const fullnameRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<any>(null);
    const activityRef = useRef<any>(null);
    const emailRef = useRef<any>(null);
    const [checked, setChecked]= useState<any>();
    const [warning, setWarning] = useState<string>();

    const user = useSelector((state: RootState) => state.userInfo.user);
    console.log(user);
    const dispatch = useDispatch();

    const handleSaveUser = async (user: any) => {
        const form = await fetch(`${ENV_PRODUCTION}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        return form;
    }
    const handleSubmit = async (event: any) => {
        console.log(phoneRef.current?.value, checked)
        event.preventDefault();
        console.log(genderRef.current?.value, activityRef.current.value, emailRef.current.value)
        if(!checked){
            setWarning('Please agree to Terms and Conditions');
            return;
        }
        if (phoneRef.current?.value && fullnameRef.current?.value && activityRef.current?.value) {
            dispatch(setUser(
                {
                    name: fullnameRef.current.value,
                    phone: phoneRef.current.value,
                    favoriteActivity: activityRef.current.value,
                    email: emailRef.current.value,
                    gender: genderRef.current.value,
                    type: user.type, hasScanned: user.hasScanned,
                    points: user.points,
                }));
            localStorage.setItem('user', JSON.stringify(
                {
                    name: fullnameRef.current.value,
                    phone: phoneRef.current.value,
                    favoriteActivity: activityRef.current.value,
                    email: emailRef.current.value,
                    gender: genderRef.current.value,
                    type: user.type, hasScanned: user.hasScanned,
                    points: user.points
                }));
            const response = await handleSaveUser({
                fullname: fullnameRef.current.value,
                phone: phoneRef.current.value,
                gender: genderRef.current.value,
                favoriteActivity: activityRef.current.value,
                email: emailRef.current.value,
                status: user.type,
                hasScanned: user.hasScanned,
                points: user.points
            });
            const data = await response.json();
            console.log(data);
            if (data) {
                console.log('User saved successfully')
                dispatch(setUser(
                    {
                        ...user,
                        name: data.user.fullname,
                        phone: data.user.phone,
                        gender: data.user.gender,
                        status: data.user.type
                    }));
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
    useEffect(() => {
        const userFromLs = JSON.parse(localStorage.getItem('user')!);
        if (userFromLs?.token!) {
            router.push('/dashboard');
        }
    }, []);
    window.onbeforeunload=()=>{
        return "By reloading this page you might loose your points are sure you want to relaod"
    }
    return (
        <>
            <Navbar />
            <div className='w-[100%] my-5'>
                <h2 className='font-bold  text-center text-xl'>Welcome to the FitBeat 2.0 Concert</h2>
                <h1 className='text-xl font-bold py-5 text-center'>Register</h1>
                {/* <form action=""> */}
                <div className='flex flex-col justify-center pt-[50px] gap-y-5 w-[80%] m-auto'>
                    <label htmlFor="name"> Full name <span className='text-red-400'>*</span></label>
                    <input ref={fullnameRef} className='border-2 rounded-xl p-2 py-3 w-full' type="text" id='name' name='name' placeholder="e.g John Doe" />

                    <label htmlFor="name"> Email </label>
                    <input ref={emailRef} className='border-2 rounded-xl p-2 py-3 w-full' type="email" id='name' name='name' placeholder="e.g John Doe" />

                    <label htmlFor="name"> Phone Number <span className='text-red-400'>*</span></label>
                    <PhoneInput ref={phoneRef} defaultCountry='ke' inputClassName='w-full h-full' inputStyle={{ border: "none" }} className='border-2 rounded-xl p-2 py-3 w-full' placeholder="Enter phone number" />

                    <label htmlFor="gender">Gender <span className='text-red-400'>*</span></label>
                    <select ref={genderRef} className='border-2 rounded-xl p-2 py-3 w-full pr-3' id="gender" name="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <label htmlFor="favactivity"> Favorite Activity <span className='text-red-400'>*</span></label>
                    <select ref={activityRef} className='border-2 rounded-xl p-2 py-3 w-full pr-3' name='favactivity' id='favactivity'>
                        <option value=''>Select</option>
                        <option value="BeatStrike">Cardiovascular endurance, Agility and Power</option>
                        <option value="BeatGroove">Aerobic Base, Coordination and rhythm</option>
                        <option value="BeatStrong">Muscle strength, endurance and functional movement</option>
                        <option value="BeatFlow">Flexibility, mobility, balance, mind- body connection</option>
                        <option value="Inactive">Here for the vibes!</option>
                    </select>
                    <div className='flex flex-row gap-x-4 items-center'>
                        <input type="checkbox" onChange={(event)=>setChecked(event.target.value)} id='terms' name='terms' className='w-5 h-5' />
                        <label htmlFor='terms'>I accept <Link href='/terms' className='text-blue-500 underline'>Terms and conditions</Link></label>
                    </div>
                    <div>
                        {warning && <p className='text-red-500'>{warning}</p>}
                    </div>
                    <button onClick={handleSubmit} className={`flex flex-row justify-center items-center text-center bg-secondary text-primary rounded-full px-3 py-4 my-5 ${!checked?'opacity-50 cursor-not-allowed':''}`}>
                        Register
                    </button>


                </div>
                {/* </form> */}
            </div>
        </>
    )
}

export default Register