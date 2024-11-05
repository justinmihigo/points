'use client'
import Navbar from '@/components/dashboard/navbar'
import { useRouter } from 'next/navigation'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import ReactConfetti from 'react-confetti'
import { leaderBoardData } from './data'
import { setUser } from '@/utils/user/user'

const Dashboard = () => {
    const router = useRouter();
    let user = useSelector((state: RootState) => state.userInfo.user);
    const result = useSelector((state: RootState) => state.scanResults.results);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState<Record<string, any>>();

    const display = () => {
        if (result.includes('500')) {
            return (<div>
                <ReactConfetti tweenDuration={1000} recycle={false} />
            </div>)
        }
    }

    // const getUser= async (id:string, token:any)=>{
    //     console.log(token?.token)
    //     const response = await fetch(`https://points-be.onrender.com/api/users/getuser/${id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token.token}`
    //         }
    //     });
    //     if (response.ok) {
    //         const data = await response.json();
    //         dispatch(setUser({...user, name: data.fullname, phone: data.phone, data: data.points }));
    //         return data;
    //     } else {
    //         console.log(response)
    //         console.log('Error fetching user');
    //     }
    // }
    // useEffect(() => {
    //     const authtoken = localStorage.getItem('token');
    //     const users = JSON.parse(localStorage.getItem('user')!);
    //     if (authtoken && users) {
    //         const userId = users.user._id;
    //         console.log(authtoken, userId);
    //         setUserInfo({ token: JSON.parse(authtoken), userId });
    //     }
    // }, []);

    // useEffect(()=>{
    //     console.log(userInfo);
    //     console.log(userInfo?.userId, userInfo?.token);
    //     if (userInfo) {
    //         getUser(userInfo.userId, userInfo.token);
    //     }
    // }, [userInfo]);
    const getUserInfo=()=>{
        const users = JSON.parse(localStorage.getItem('user')!);
        if (users) {
            setUserInfo(users);
        }
        else{
            router.push('/');
        }
        
    }
    useEffect(()=>{
        getUserInfo();
        console.log('userInfo',userInfo);
    },[]);
    return (
        <>
            <div>
                <Navbar name={userInfo?.user.fullname || ''} />
                <div className='m-10'>

                    {display()}

                    <div>
                        <h1 className='text-[25px] font-bold'>Dashboard</h1>
                        <h1 className=''>Hi, {userInfo?.user.fullname}</h1>
                    </div>
                    <section className='py-10 flex flex-col items-center justify-center'>
                        <h2 className='text-[20px] font-bold py-5'>Points</h2>
                        <p className=''>You have</p>
                        <div>
                            <p className='text-secondary text-[2rem] font-bold'>{userInfo?.user.points}</p>
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