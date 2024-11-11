'use client'
import React from 'react'
const Admin = () => {
    const pointsRef = React.useRef(null);
    const typeRef= React.useRef(null);
    const dedicated = React.useRef(null);
    const nameRef = React.useRef(null);

  return (
    <>
     <div className='w-[100%] my-5'>
                <h1 className='text-xl font-bold py-5 text-center'>Generate</h1>
                {/* <form action=""> */}
                <div className='flex flex-col justify-center pt-[50px] gap-y-5 w-[80%] m-auto'>
                    <label htmlFor="name"> Name <span className='text-red-400'>*</span></label>
                    <input ref={nameRef} className='border-2 rounded-xl p-2 py-3 w-full' type="text" id='name' name='name' placeholder="e.g John Doe" />

                    <label htmlFor="points"> Email </label>
                    <input ref={pointsRef} className='border-2 rounded-xl p-2 py-3 w-full' type="number" id='points' name='points' placeholder="e.g John Doe" />

                    <label htmlFor="type">Type <span className='text-red-400'>*</span></label>
                    <select ref={pointsRef} className='border-2 rounded-xl p-2 py-3 w-full pr-3' id="gender" name="gender">
                        <option value="registration">Registration</option>
                        <option value="points">Points</option>
                        <option value="penalty">Penalty</option>
                    </select>
                     <label htmlFor="dedicated">Dedicated </label>

                    </div>
                    </div>
    </>
  )
}

export default Admin