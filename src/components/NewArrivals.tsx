import React from 'react'
import Link from 'next/link';
import newArrivalImage from '../../public/images/asgard-sofa-1.png';
import Image from 'next/image';

const NewArrivals = () => {
  return (
    <section className='px-20 py-10 h-fit flex flex-col-reverse md:flex-row-reverse md:min-h-screen justify-center items-center gap-10' style={{ background: '#FFF9E5' }}>
        <div className='sm: w-auto flex flex-col justify-center items-center'>
            <h6 className='text-lg font-bold text-center'>New Arrivals</h6>
            <h4 className='text-4xl font-bold text-black md:text-6xl md:leading-25'>Asgaard Sofa</h4>
            <Link href="/shop" className='text-2xl mt-10 block'>
                <button className='py-3 px-5 border-1 border-black cursor-pointer'>
                    Order Now
                </button>
            </Link>
        </div>
        <div>
            <Image src={newArrivalImage} alt='Image of Asgard sofa' width={700} height={300} className='object-contain' unoptimized />
        </div>
    </section>
  )
}

export default NewArrivals