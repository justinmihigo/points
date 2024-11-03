'use client'
import Navbar from '@/components/dashboard/navbar'
import { useRouter } from 'next/navigation'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import ReactConfetti from 'react-confetti'
import { leaderBoardData } from './data'

const Dashboard = () => {
    const user = useSelector((state: RootState) => state.userInfo.user);
    


    const result = useSelector((state: RootState) => state.scanResults.results);
    console.log('result:  ', result);
    console.log(result);
    const display = () => {
        if (result.includes('500')) {
            return(<div>
                <ReactConfetti tweenDuration={1000} recycle={false} />
            </div>)
        }


    }
    const router = useRouter();
    return (
        <>
            <div>
                <Navbar />
                <div className='m-10'>
                    
                        {display()}
                    
                    <div>
                        <h1 className='text-[25px] font-bold'>Dashboard</h1>
                        <h1 className=''>Hi, Jules Sentore</h1>
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