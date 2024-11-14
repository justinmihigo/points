import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='inset-0 flex flex-row justify-center p-3 py-5 bg-primary w-full mb-10'>
        <div className='flex flex-row gap-x-10'>
            <Link href='/' className='text-secondary font-bold'>Home</Link>
            <Link href='/about' className='text-secondary font-bold'>About</Link>
            {/* <Link href='/contact' className='text-secondary'>Contact</Link> */}
        </div>
    </div>
  )
}

export default Navbar