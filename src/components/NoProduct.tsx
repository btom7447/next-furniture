import React from 'react'
import noProductFound from '../../public/images/no-product-found.png';
import Image from 'next/image';

const NoProduct = () => {
  return (
    <section className='py-50 w-full min-h-[50dvh] flex flex-col justify-center items-center gap-10'>
        <Image 
            src={noProductFound}
            alt='No product found illustration'
            width={300}
            height={300}
            className='object-contain'
        />
        <h4 className='text-red-600 capitalize text-4xl text-center'>Product Not Found</h4>
    </section>
  )
}

export default NoProduct