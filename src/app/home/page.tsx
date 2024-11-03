'use client'
import Navbar from '@/components/Navbar'
import { RootState } from '@/utils/store'
import Link from 'next/link'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addResult } from '@/utils/scan/scanResSlice'

const Home = () => {
  const dispatch=useDispatch();
  const results= useSelector((state:RootState)=> state.scanResults.results);
  console.log('results', results, typeof results);
  return (
    <div>
      <Navbar />
      <div className='flex flex-row justify-center items center'>
        <div className='flex flex-col gap-y-8'>
          <h1 className='font-bold text-lg text-[2rem] text-secondary' onClick={()=>dispatch(addResult('500'))}>Welcome To our E-Scan</h1>
          <p className='text-center'>Get enrolled by scanning the Qr code only</p>
          <Link href={'/scan'} className='flex flex-row justify-center mt-[100px] '>
            <p className='h-[200px] w-[200px] p-4 flex flex-col font-bold justify-center items-center rounded-full bg-[#C8D9E6] text-center text-lg text-secondary' >Scan QR Code</p>
          </Link>
        </div>
      </div>
    </div >

  )
}

export default Home