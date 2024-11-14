'use client'
import Navbar from '@/components/dashboard/navbar'
import { useRouter } from 'next/navigation'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import ReactConfetti from 'react-confetti'
import { ToastContainer, ToastTransition, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '@/utils/user/user'
import CountUp from 'react-countup'
const Dashboard = () => {
    const ENV_PRODUCTION= process.env.ENV_PRODUCTION || 'https://points-be.onrender.com';
    const router = useRouter();
    let user = useSelector((state: RootState) => state.userInfo.user);
    const result = useSelector((state: RootState) => state.scanResults.results);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<Record<string, any>>();
    const [users, setUsers] = useState<any>(['1', '2', '3']);


    const alert = () => {
            toast(result.message, {
                position: "top-center",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: {"Bounce" as ToastTransition}
        })
    }
    const display = () => {
        console.log('result', result.results);
        if (Number(result.results) > 0) {
            return (<div>
                <ReactConfetti tweenDuration={1000} recycle={false} />
            </div>)
        }
    }
    const getUsers = async () => {
        try {
            const response = await fetch(`${ENV_PRODUCTION}/api/users/top10`);
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.log('Error fetching users');
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }

    }
    
    
    const getUserInfo = () => {
        const users = JSON.parse(localStorage.getItem('user')!);
        if (users) {
            setUserInfo(users);
        }
        else {
            router.push('/');
        }

    }
    useEffect(() => {
        getUserInfo();
        console.log('userInfo', userInfo);
    }, []);
    useEffect(() => {
        getUsers();
        console.log(users);
    }, []);
    useEffect(()=>{
        if(result.message){
            alert();
        }
    },[]);
    return (
        <>
            <ToastContainer/>
            <div>
                <Navbar name={userInfo?.user?.fullname || ''} />
                <div className='m-10'>
                    <div>
                        {display()}
                    </div>
                    <div>
                        <h1 className='text-[25px] font-bold'>Dashboard</h1>
                        <h1 className=''>Hi, {userInfo?.user.fullname}</h1>
                    </div>
                    <section className='py-10 flex flex-col items-center justify-center'>
                        <h2 className='text-[20px] font-bold py-5'>Points</h2>
                        <p className=''>You have</p>
                        <div>
                            <p className='text-secondary text-[2rem] font-bold'><CountUp end={userInfo?.user.points}/></p>
                            {/* {display()} */}
                        </div>
                        <button className='p-3 px-4 w-[80%] mx-auto rounded-full text-center text-lg text-white bg-secondary text-primary mt-10' onClick={() => router.push('/scan')}>Earn Points</button>
                    </section>
                    <section>
                        <h2 className='text-[20px] font-bold py-5'>Leaderboard</h2>
                        <div>
                            <div className='flex flex-col gap-y-5'>
                                {loading ? (
                                    <p>Loading users...</p> // Show loading message while fetching

                                ) : users.users.length > 0 && (
                                    users.users.map((item: any, index: number) => (
                                        <div key={index} className='flex flex-row gap-x-10'>
                                            <p className='text-secondary text-[15px]'>{index + 1}</p>
                                            <p className='w-[35%] text-[15px]'>{item.fullname}</p>
                                            <p className='font-bold text-secondary text-[15px]'>{item.points} points</p>
                                        </div>
                                    ))
                                )}
                                <button className='p-3 px-4 rounded-full w-[80%] mx-auto text-center text-lg text-white bg-secondary text-primary mt-10' onClick={() => router.push('/dashboard/leaderboard')}>Full leaderboard</button>

                            </div>
                        </div>
                        <div>
                        </div>
                    </section>
                </div>

            </div>

        </>
    )
}

export default Dashboard