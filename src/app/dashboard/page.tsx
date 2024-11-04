'use client'
import Navbar from '@/components/dashboard/navbar'
import { useRouter } from 'next/navigation'

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import ReactConfetti from 'react-confetti'
import { leaderBoardData } from './data'
import { setUser } from '@/utils/user/user'

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState<Record<string, string>>();
    useEffect(() => {
        const authtoken = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user')!);
        if (authtoken && user) {
            const userId = user.user._id;
            setUserInfo({ token: JSON.parse(authtoken), userId });
        }
    }, []);
    const getUser= async (id:string, token:string)=>{
        const response = await fetch(`http://localhost:3005/api/users/getuser/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser({...user, name: data.user.name, phone: data.user.phone, data: data.user.points}));
            console.log(data);
            return data;
        } else {
            console.log('Error fetching user');
        }
    }
    useEffect(()=>{
        if (userInfo) {
             getUser(userInfo.userId, userInfo.token);
            
        }
    }, [userInfo]);
    const user = useSelector((state: RootState) => state.userInfo.user);
    const result = useSelector((state: RootState) => state.scanResults.results);
    const dispatch = useDispatch()
    console.log('result:  ', result);
    console.log(result);
    const display = () => {
        if (result.includes('500')) {
            return (<div>
                <ReactConfetti tweenDuration={1000} recycle={false} />
            </div>)
        }


    }
    const router = useRouter();
    return (
        <>
            <div>
                <Navbar name={user.name || ''} />
                <div className='m-10'>

                    {display()}

                    <div>
                        <h1 className='text-[25px] font-bold'>Dashboard</h1>
                        <h1 className=''>Hi, {user.name}</h1>
                    </div>
                    <section className='py-10 flex flex-col items-center justify-center'>
                        <h2 className='text-[20px] font-bold py-5'>Points</h2>
                        <p className=''>You have</p>
                        <div>
                            <p className='text-secondary text-[2rem] font-bold'>{user.points}</p>
                            {/* {display()} */}
                        </div>
                        <button className='p-3 px-4 w-[80%] mx-auto rounded-full text-center text-lg text-white bg-secondary text-primary mt-10' onClick={() => router.push('/scan')}>Earn Points</button>
                    </section>
                    <section>
                        <h2 className='text-[20px] font-bold py-5'>Leaderboard</h2>
                        <div>
                            <div className='flex flex-col gap-y-5'>
                                {
                                    leaderBoardData.map((item, index) => (
                                        <div key={index} className='flex flex-row gap-x-10'>
                                            <p className='text-secondary text-[15px]'>{index + 1}</p>
                                            <p className='w-[35%] text-[15px]'>{item.name}</p>
                                            <p className='font-bold text-secondary text-[15px]'>{item.points} points</p>
                                        </div>
                                    ))
                                }
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