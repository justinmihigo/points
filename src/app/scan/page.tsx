'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Scanner } from "@yudiel/react-qr-scanner"
import { useDispatch} from 'react-redux';
import { addResult } from '@/utils/scan/scanResSlice';
import CryptoJS, { AES } from "crypto-js"

const scan = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const text = AES.encrypt('active', '123');
  console.log("cypherText", text.toString());
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
          <Scanner 
          components={{ audio: false, }}
          onScan={(result) => {
            console.log(result);
            const decryptedResult = AES.decrypt(result[0].rawValue,'123');
            const realWord= decryptedResult.toString(CryptoJS.enc.Utf8);
            console.log('realWord', realWord);
            if (realWord=="active" || realWord==="inactive") {
              dispatch(addResult(result[0].rawValue));
              router.push('/register')
            }
            if (result[0].rawValue==="500"){
              // router.push('/dashboard')
              dispatch(addResult(result[0].rawValue));
              router.push('/dashboard');
            }
            if (result[0].rawValue==="-500"){
              dispatch(addResult(result[0].rawValue));
              router.push('/dashboard')
            }
          }
          } />
         
          
          
        </div>
      </div>

    </div>
  )
}

export default scan