'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Scanner } from "@yudiel/react-qr-scanner"
import navigate from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { addResult } from '@/utils/scan/scanResSlice';
import CryptoJS, { AES } from "crypto-js"
import { QrReader } from 'react-qr-reader';
const scan = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const text = AES.encrypt('Justin', '123');
  console.log("plain", text.toString());
  const decrypt = AES.decrypt(text, '123');
  console.log("decrypted", decrypt.toString(CryptoJS.enc.Utf8));
  return (
    <div className=''>
      <div className='py-5 my-6 m-auto text-center'>
        <p> Scan the QR code using the following box</p>
        <p>Make sure to make the QR centered</p>
      </div>

      <div className='flex flex-row justify-center'>
        <div className='w-[300px] h-[300px]'>
          {/* <Scanner 
          // components={{ audio: false, }}
          onScan={(result) => {
            console.log(result)
            if (result[0].rawValue==="status:active") {
              dispatch(addResult(result[0].rawValue));
              router.push('/register')
            }
            if (result[0].rawValue=="+500"){
              // router.push('/dashboard')
              dispatch(addResult(result[0].rawValue));
              router.push('/dashboard');
            }
            if (result[0].rawValue="-500"){
              dispatch(addResult(result[0].rawValue));
              router.push('/dashboard')
            }
          }
          } /> */}
          <QrReader className={'w-full'}   constraints={{ facingMode: 'user' }} onResult={(result, error) => {
            if (!!result) {
              console.log(result);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          
          />
        </div>
      </div>

    </div>
  )
}

export default scan