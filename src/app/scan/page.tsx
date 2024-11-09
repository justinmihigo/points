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
  const [userFromLs, setUserFromLs] = useState<any>({});
  // const [message, setMessage] = useState<any>(null);
  const [qrResult, setQrResult] = useState(null);
  console.log(userFromLs)
  const user = useSelector((state: RootState) => state.userInfo.user);
  const results = useSelector((state: RootState) => state.scanResults.results);
  const dispatch = useDispatch();
  // const text = AES.encrypt('inactive', '123');
  // console.log("cypherText", text.toString());
  // const decrypt = AES.decrypt(text, '123');
  // console.log("decrypted", decrypt.toString(CryptoJS.enc.Utf8));

  const updateUser = async (id: string, token: string, points: any, hasScanned: any) => {
    const response = await fetch(`http://localhost:3005/api/users/updateUser/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ points: points, hasScanned: hasScanned })
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // dispatch(setUser({...user, points: user.points + data.points}));
    }
    else {
      console.log('error', response.status, response)
    }
  }

  const getQrResult = async (id: string) => {
    const response = await fetch(`http://localhost:3005/api/qrs/getQr/${id}`);
    if (response.ok) {
      const data = await response.json();
      console.log('data', data.qrcode);
      setQrResult(data.qrcode);
      return data.qrcode;
    }
    else {
      console.log('error', response.status)
    }
  }

  const handleRegistration = (result: any) => {
    console.log('register', result);

    if (!userFromLs && result && result.type === 'registration') {
      dispatch(addResult({ result: result.points, message: "Thanks for the registration" }));
      dispatch(setUser({ ...user, type: result.dedicated === 'active' ? 'active' : 'inactive', isActive: result.dedicated === 'active', hasScanned: [result.name], points: result.points }));
      localStorage.setItem('user', JSON.stringify({ ...user, type: result.dedicated === 'active' ? 'active' : 'inactive', isActive: result.dedicated === 'active', points: result.points, hasScanned: [result.name] }));
      console.log(user);
      router.push('/register')
      return;
    }
    if(userFromLs && result.type==='registration') {
      dispatch(addResult({results:'', message:"already registered"}))
      router.push('/dashboard');
      return;
    }
  }
  const handlePoints = async (data: any) => {
    console.log('points', data);
    if (userFromLs && data && data.type !== 'registration') {
      const value = data.points;
      const userls = JSON.parse(localStorage.getItem('user') as any);
      const before = Number(userls.user.points);
      console.log('userls', userls.user.points);
      console.log('user', userls.user.hasScanned.includes(data.name))
      if (userls && !userls.user.hasScanned.includes(data.name)) {
        userls.user.points += value;
        userls.user.hasScanned.push(data.name);
        let message='';
        switch(data.name){
        case 'BeatStrike': 
        message=`Feel the Pulse! Your heart is racing, your strength is rising. BeatStrike just pushed you one step closer to peak power!`
        break;
        case 'BeatGroove':
        message=`Feel that groove? It's all yours! 1100 points scored for mastering the BeatGroove. Keep moving to the beat!`
        break;
        case 'BeatStrong':
        message=`Strength unleashed!  You're building muscle and resilience—1300 points added. Keep up the power!`
        break;
        case 'BeatFlow':
        message=`You're in perfect harmony! Flexibility, balance, and mind-body alignment—1000 points well-earned. Keep that flow going!`
        break;
        case 'Penalty':
        message=`Uh-oh! Looks like you missed a beat or two, but there's always a comeback!`
        break;
        default:
        message=`Hooray!`
        }
        console.log('message', message);
        dispatch((addResult({ results: data.points, message: message })));
        dispatch(setUser({ ...user, points: userls.user.points, hasScanned: userls.user.hasScanned }));
        localStorage.setItem('user', JSON.stringify(userls));
        updateUser(userls.user._id, userls.token, userls.user.points, userls.user.hasScanned);
        router.push('/dashboard');
        return;
      }
      if (userls.user.hasScanned.includes(data.name)) {
        console.log('User has already scanned this QR code');
        dispatch((addResult({ results: '', message: 'Already scanned this QR code' })));

        router.push('/dashboard');
        return;
      }
    }

  }
  const handleScan = async (result: any) => {
    if (result[0].rawValue.length === 24) {
      // Wait for the qrResult to be updated
      const fetchedData = await getQrResult(result[0].rawValue);
      console.log(fetchedData);
      if (fetchedData && fetchedData.type === 'registration') {
        handleRegistration(fetchedData);
      }
      else if (fetchedData) {
        handlePoints(fetchedData);
      }
    }
  };
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
            onScan={handleScan
              // (result) => {
              //   console.log('result', result);
              //   if(result[0].rawValue.length==24){
              //    await getQrResult(result[0].rawValue);
              //     if(qrResult){
              //       setTimeout(()=>{
              //         handleRegistration(qrResult);
              //       }, 100);

              // }

              // router.push('/dashboard');
              // return;
              // }
              //   const decryptedResult = AES.decrypt(result[0].rawValue, '123');
              //   const realWord = decryptedResult.toString(CryptoJS.enc.Utf8);
              //   setResult(realWord);
              //   console.log('realWord', realWord);
              //   console.log('user', userFromLs);
              //   if ((realWord === "active" || realWord === "inactive") && !userFromLs) {
              //     dispatch(addResult(result[0].rawValue));
              //     dispatch(setUser({ ...user, type: realWord, isActive: realWord === 'active' }));
              //     localStorage.setItem('user', JSON.stringify({ ...user, type: realWord, isActive: realWord === 'active' }));
              //     router.push('/register')
              //   }
              //   if ((realWord === 'active' || realWord === "inactive") && userFromLs) {
              //     router.push('/dashboard');
              // }

              //   if (realWord === "500" || realWord === "-500") {
              //     // router.push('/dashboard')

              // const value = Number(`${realWord==="500"?'500':'-500'}`);
              // const before = Number(user.points);
              // const userls = JSON.parse(localStorage.getItem('user') as any);
              // console.log('userls', userls.user.points);
              // if (userls) {
              //   userls.user.points+=value ;
              //   dispatch((addResult(realWord)));
              //   dispatch(setUser({ ...user, points: userls.user.points }));
              //   localStorage.setItem('user', JSON.stringify(userls));
              //   updateUser(userls.user._id, userls.token, userls.user.points);
              //   router.push('/dashboard');
              //     }

              //   }
              //   if (realWord === "-500") {
              //     const value = Number(realWord);
              //     const before = Number(user.points);

              //     dispatch((addResult(realWord)));
              //     dispatch(setUser({ ...user, points: before - value }));
              //     localStorage.setItem('userPoints', JSON.stringify(user));
              //     router.push('/dashboard');
              //   }
              // }
            } />



        </div>
      </div>

    </div>
  )
}

export default scan