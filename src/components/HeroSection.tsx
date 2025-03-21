import Image from 'next/image'
import React from 'react'
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className='px-20 py-30 h-fit flex flex-col-reverse md:flex-row md:min-h-screen justify-center items-center gap-10' style={{ background: '#FFF9E5' }}>
        <div className='sm: w-auto'>
            <h1 className='text-4xl leading-10 text-black md:text-7xl md:leading-25'>Rocket single <br /> seater</h1>
            <Link href="/shop" className='text-2xl mt-10 block'>
                <button className='py-2 border-b border-black cursor-pointer'>
                    Shop Now
                </button>
            </Link>
        </div>
        <div>
            <Image src="images/hero-section-image.png" alt='Image of Rocket single seater' width={400} height={300} className='object-contain'  />
        </div>
    </section>
  )
}

export default HeroSection