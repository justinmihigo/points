import Link from 'next/link'
import Image from 'next/image'
import user from '../../../public/user.svg'
const DashboardNavbar = ({name}:{name:string}) => {
    return (
        <div className='inset-0 flex flex-row justify-center p-3 py-5 bg-primary w-full mb-10'>
            <div className='flex flex-row justify-around w-full'>
                <div className='flex flex-row gap-x-4'>
                <Link href='/' className='text-secondary'>Home</Link>
                <Link href='/about' className='text-secondary'>About</Link>
                </div>
                
                <div>
                    <Link href='/contact' className='text-secondary flex flex-row justify-center items-center gap-x-5'>
                        <Image src={user} alt='user' className=' w-5' />
                        <span>{name}</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default DashboardNavbar