import React from 'react'
import followUsPoster from '../../public/images/follow-us-poster.png';

const FollowUs = () => {
  return (
    <section className='py-20 px-10 md:p-20 flex flex-col justify-center items-center h-fit md:h-[60dvh] bg-cover md:bg-contain bg-center' 
      style={{ backgroundImage: `url(${followUsPoster.src})` }}
    >
      <h4 className='text-4xl font-bold text-black capitalize text-center md:text-6xl'>Our Instagram</h4>
      <p className='text-lg md:text-xl text-center mt-5'>Follow our store on instagram</p>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className='mt-10 px-20 py-5 bg-white text-center hover:bg-[#FBEBB5] text-black text-md md:text-xl rounded-full shadow-2xl'>
          Follow Us
      </a>
    </section>
  )
}

export default FollowUs