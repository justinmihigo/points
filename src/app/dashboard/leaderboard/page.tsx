'use client'
import Navbar from '@/components/dashboard/navbar'
import React from 'react'
import { leaderBoardData } from '../data'

const Leaderboard = () => {
    return (
        <>
        <Navbar name={''} />
            <div className='m-10'>
                

                <section>
                    <h2 className='text-[20px] font-bold py-5'>Leaderboard</h2>
                    <div>
                        <div className='flex flex-col gap-y-5'>
                            {
                                leaderBoardData.map((item, index) => (
                                    <div key={index} className={`flex flex-row gap-x-10 w-[80%] ${index==0?'bg-primary text-secondary p-2':' ' }`}>
                                        <p className='text-secondary text-[15px]'>{index + 1}</p>
                                        <p className='w-[35%] text-[15px]'>{item.name}</p>
                                        <p className='font-bold text-secondary text-[15px]'>{item.points} points</p>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    <div>
                    </div>
                </section>
            </div>

        </>
  )
}

export default Leaderboard