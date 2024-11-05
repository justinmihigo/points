'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Scanner } from "@yudiel/react-qr-scanner"
import { useDispatch, useSelector } from 'react-redux';
import { addResult } from '@/utils/scan/scanResSlice';
import { setUser } from '@/utils/user/user';
import CryptoJS, { AES } from "crypto-js"
import { RootState } from '@/utils/store';
const scan = () => {
  // const secret_key= process.env.SECRET || '';
  // console.log("secret_key",secret_key);
  const router = useRouter();
  const [result, setResult] = useState('');
  const [userFromLs, setUserFromLs] = useState<any>({})
  console.log(userFromLs)
  const user = useSelector((state: RootState) => state.userInfo.user)
  const dispatch = useDispatch();
  const text = AES.encrypt('inactive', '123');
  console.log("cypherText", text.toString());
  const decrypt = AES.decrypt(text, '123');
  console.log("decrypted", decrypt.toString(CryptoJS.enc.Utf8));
  const updateUser= async (id:string,token:string, points:any)=>{
    const response= await fetch(`https://points-be.onrender.com/api/users/updateUser/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({points: points})
    });
    if(response.ok){
      const data= await response.json();
      console.log(data);
      // dispatch(setUser({...user, points: user.points + data.points}));
    }
    else{
      console.log('error', response.status)
    }
  }
  useEffect(() => {
    const userls = JSON.parse(localStorage.getItem('user') as string);
    console.log('userFromLs', userFromLs);
    setUserFromLs(userls);
    console.log(userFromLs);
  }, []);


  return (
    <div className=''>
      <div className='py-5 my-6 m-auto text-center'>
        <p> Scan the QR code using the following box</p>
        <p>Make sure to make the QR centered</p>
      </div>

      <div className='flex flex-row justify-center'>
        <div className='w-[300px] h-[300px]'>

          <Scanner
            components={{ audio: false, }}
            onScan={(result) => {
              console.log(result);
              const decryptedResult = AES.decrypt(result[0].rawValue, '123');
              const realWord = decryptedResult.toString(CryptoJS.enc.Utf8);
              setResult(realWord);
              console.log('realWord', realWord);
              console.log('user', userFromLs);
              if ((realWord === "active" || realWord === "inactive") && !userFromLs) {
                dispatch(addResult(result[0].rawValue));
                dispatch(setUser({ ...user, type: realWord, isActive: realWord === 'active' }));
                localStorage.setItem('user', JSON.stringify({ ...user, type: realWord, isActive: realWord === 'active' }));
                router.push('/register')
              }
              if ((realWord === 'active' || realWord === "inactive") && userFromLs) {
                router.push('/dashboard');
              }

              if (realWord === "500" || realWord === "-500") {
                // router.push('/dashboard')

                const value = Number(`${realWord==="500"?'500':'-500'}`);
                const before = Number(user.points);
                const userls = JSON.parse(localStorage.getItem('user') as any);
                console.log('userls', userls.user.points);
                if (userls) {
                  userls.user.points+=value ;
                  dispatch((addResult(`${realWord==="500"?'500':'-500'}`)));
                  dispatch(setUser({ ...user, points: userls.user.points }));
                  localStorage.setItem('user', JSON.stringify(userls));
                  updateUser(userls.user._id, userls.token, userls.user.points);
                  router.push('/dashboard');
                }

              }
              if (realWord === "-500") {
                const value = Number(realWord);
                const before = Number(user.points);

                dispatch((addResult(realWord)));
                dispatch(setUser({ ...user, points: before - value }));
                localStorage.setItem('userPoints', JSON.stringify(user));
                router.push('/dashboard');
              }
            }
            } />



        </div>
      </div>

    </div>
  )
}

export default scan