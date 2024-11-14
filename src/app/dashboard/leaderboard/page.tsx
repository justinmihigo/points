'use client'
import Navbar from '@/components/dashboard/navbar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/store'

const Leaderboard = () => {
    const ENV_PRODUCTION= process.env.ENV_PRODUCTION || 'https://points-be.onrender.com';
    const user= useSelector((state:RootState)=> state.userInfo);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [maleActive, setMaleActive] = useState<any>([]);
    const [femaleActive, setFemaleActive] = useState<any>([]);
    const [maleInactive, setMaleInactive] = useState<any>([]);
    const [femaleInactive, setFemaleInactive] = useState<any>([]);
    const getUsers = async () => {
        try {
            const response = await fetch(`${ENV_PRODUCTION}/api/users/getUsers`);
            if (response.ok) {
                const data = await response.json();
                const active = data.activeUsers;
                if (data) {
                    const maleActiveI: any[] = active.filter((info: any) => info._id.gender === 'male');
                    const femaleActiveI: any[] = active.filter((info: any) => info._id.gender === 'female');
                    const femaleInactiveI: any[] = data.inactiveUsers.filter((info: any) => info._id.gender === 'female');
                    const maleInactiveI: any[] = data.inactiveUsers.filter((info: any) => info._id.gender === 'male');
                    setMaleActive(maleActiveI[0]?.users);
                    setFemaleActive(femaleActiveI[0]?.users);
                    setFemaleInactive(femaleInactiveI[0]?.users);
                    setMaleInactive(maleInactiveI[0]?.users);
                    handleLeaderboard();
                }
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
    const handleLeaderboard = async () => {
        try {
            const responseUsers = await fetch(`${ENV_PRODUCTION}/api/users/getAllUsers`);
            if (responseUsers.ok) {
                const users = await responseUsers.json();
                setUsers(users);
            }
        } catch (error) {
            console.log('error', error);
        }
    }
    useEffect(() => {
        getUsers();
        console.log('get users', maleActive);

    }, []);
    return (
        <>
            <Navbar name={user.user.name} />
            <div className='m-10'>


                <section>
                    <h2 className='text-[20px] font-bold py-5'>Leaderboard</h2>
                    <div>
                        <h1 className='font-bold py-8'>Active Top Males</h1>
                        <div className='flex flex-col gap-y-5'>
                            {
                                loading ? (<p>Loading...</p>) :
                                    maleActive && (maleActive.slice(0,2).map((item: any, index: number) => (
                                        <div key={index} className={`flex flex-row gap-x-10 w-[80%] ${index == 0 ? 'bg-primary text-secondary p-2' : ' '}`}>
                                            <p className='text-secondary text-[15px]'>{index + 1}</p>
                                            <p className='w-[35%] text-[15px]'>{item.fullname}</p>
                                            <p className='font-bold text-secondary text-[15px]'>{item.points} points</p>
                                        </div>
                                    )))
                            }

                        </div>
                        <div className='flex flex-col gap-y-5 py-8'>
                            <h1 className='font-bold'>Active Top Females</h1>
                            {
                                loading ? (<p>Loading...</p>) :
                                    femaleActive && (femaleActive.slice(0,2).map((item: any, index: number) => (
                                        <div key={index} className={`flex flex-row gap-x-10 w-[80%] ${index == 0 ? 'bg-primary text-secondary p-2' : ' '}`}>
                                            <p className='text-secondary text-[15px]'>{index + 1}</p>
                                            <p className='w-[35%] text-[15px]'>{item.fullname}</p>
                                            <p className='font-bold text-secondary text-[15px]'>{item.points} points</p>
                                        </div>
                                    )))
                            }

                        </div>
                        <div className='flex flex-col gap-y-5 pb-8'>
                            <h1 className='font-bold'>Inactive Top Males</h1>
                            {
                                loading ? (<p>Loading...</p>) :
                                    maleInactive && (maleInactive.slice(0).map((item: any, index: number) => (
                                        <div key={index} className={`flex flex-row gap-x-10 w-[80%] ${index == 0 ? 'bg-primary text-secondary p-2' : ' '}`}>
                                            <p className='text-secondary text-[15px]'>{index + 1}</p>
                                            <p className='w-[35%] text-[15px]'>{item.fullname}</p>
                                            <p className='font-bold text-secondary text-[15px]'>{item.points} points</p>
                                        </div>
                                    )))
                            }

                        </div>
                        <div className='flex flex-col gap-y-5 pb-8'>
                            <h1 className='font-bold'>Inactive Top Females</h1>
                            {
                                loading ? (<p>Loading...</p>) :
                                    femaleInactive && (femaleInactive.slice(0).map((item: any, index: number) => (
                                        <div key={index} className={`flex flex-row gap-x-10 w-[80%] ${index == 0 ? 'bg-primary text-secondary p-2' : ' '}`}>
                                            <p className='text-secondary text-[15px]'>{index + 1}</p>
                                            <p className='w-[35%] text-[15px]'>{item.fullname}</p>
                                            <p className='font-bold text-secondary text-[15px]'>{item.points} points</p>
                                        </div>
                                    )))
                            }

                        </div>
                        <div className='flex flex-col gap-y-5 pb-8'>
                            <h1 className='font-bold'>The full leaderboard</h1>
                            {
                                loading ? (<p>Loading...</p>) :
                                    users && (users.map((item: any, index: number) => (
                                        <div key={index} className={`flex flex-row gap-x-10 w-[80%] ${index == 0 ? 'bg-primary text-secondary p-2' : ' '}`}>
                                            <p className='text-secondary text-[15px]'>{index + 1}</p>
                                            <p className='w-[35%] text-[15px]'>{item.fullname}</p>
                                            <p className='font-bold text-secondary text-[15px]'>{item.points} points</p>
                                        </div>
                                    )))
                            }

                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default Leaderboard