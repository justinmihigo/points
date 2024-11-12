'use client'
import Navbar from '@/components/dashboard/navbar'
import React, { useEffect, useState } from 'react'
import { leaderBoardData } from '../data'

const Leaderboard = () => {
    const [loading,setLoading]= useState(true);
    const [users, setUsers]= useState<any>([]);
    const getUsers = async () => {
        try {
            const response = await fetch('https://points-be.onrender.com/api/users/getUsers');
            if (response.ok) {
                const data = await response.json();
                setUsers(data.user);
                console.log(data);
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
    useEffect(()=>{
        getUsers();
        console.log(users)
    },[])
    return (
        <>
        <Navbar name={''} />
            <div className='m-10'>
                

                <section>
                    <h2 className='text-[20px] font-bold py-5'>Leaderboard</h2>
                    <div>
                        <div className='flex flex-col gap-y-5'>
                            {
                                loading ? (<p>Loading...</p>):
                              users && ( users.map((item:any, index:number) => (
                                    <div key={index} className={`flex flex-row gap-x-10 w-[80%] ${index==0?'bg-primary text-secondary p-2':' ' }`}>
                                        <p className='text-secondary text-[15px]'>{index + 1}</p>
                                        <p className='w-[35%] text-[15px]'>{item.fullname}</p>
                                        <p className='font-bold text-secondary text-[15px]'>{item.points} points</p>
                                    </div>
                                )))
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