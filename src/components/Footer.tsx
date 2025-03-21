import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='p-10 md:p-20 bg-white flex flex-col justify-center items-center'>
            <div className='w-full grid justify-start items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-10'>
                <div className='self-center'>
                    <h6 className='text-xl text-gray-600'>400 University Drive Suite 200 Carol Gabies, FL 33134, USA</h6>
                </div>
                <div className='flex flex-col justify-start items-start'>
                    <h6 className='mb-10 text-xl text-gray-600'>Links</h6>
                    <nav className='flex gap-5 flex-col justify-start items-start'>
                        <Link href="/" className='text-lg font-normal text-black hover:text-gray-700'>Home</Link>
                        <Link href="/shop" className='text-lg font-normal text-black hover:text-gray-700'>Shop</Link>
                        <Link href="/about" className='text-lg font-normal text-black hover:text-gray-700'>About</Link>
                        <Link href="/contact" className='text-lg font-normal text-black hover:text-gray-700'>Contact</Link>
                    </nav>
                </div>
                <div className='flex flex-col justify-start items-start'>
                    <h6 className='mb-10 text-xl text-gray-600'>Help</h6>
                    <ul className='flex gap-5 flex-col justify-start items-start'>
                        <li className='text-lg font-normal text-black hover:text-gray-700'>Payment Options</li>
                        <li className='text-lg font-normal text-black hover:text-gray-700'>Returns</li>
                        <li className='text-lg font-normal text-black hover:text-gray-700'>Privacy Policies</li>
                    </ul>
                </div>
                <div className=''>
                    <h6 className='mb-10 text-xl text-gray-600'>Newsletter</h6>
                    <form action="" className='flex justify-start items-center gap-5'>
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder='Enter Your Email Address'
                            className='border-b border-black text-lg text-black py-2'
                        />
                        <button type="button" className='border-b border-black cursor-pointer capitalize text-lg text-black py-2'>
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <hr className='block m-10 w-full border-b-0 border-gray-400' />
            <p className='text-gray-600'>&copy; {new Date().getFullYear()} Meubel House. All rights reserved.</p>
        </footer>
    )
}

export default Footer