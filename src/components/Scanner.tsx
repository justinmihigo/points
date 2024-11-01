import React from 'react'
import { Scanner } from "@yudiel/react-qr-scanner"; // Corrected import name from 'Scanner' to 'QrScanner'

const QrScanner = () => {
  return (
    <div className='flex flex-row justify-center'>
      <div className='w-[300px] h-[300px]'>
        <Scanner onScan={(result) => {
          console.log(result)
        }
        } />
      </div>
    </div>
  )
}

export default QrScanner