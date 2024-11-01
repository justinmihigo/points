import React from 'react'

const LeaderboardCard = ({name, points}:{name:string, points:string}) => {
    return (
        <div className='flex flex-row gap-x-10'>
            <h3 className='text-secondary text-[15px]'>1</h3>
            <p className='text-[18px]'>{name}</p>
            <p className='font-bold text-secondary text-[15px]'>{points} points</p>
        </div>
    )
}

export default LeaderboardCard