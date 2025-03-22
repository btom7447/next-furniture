import React from 'react'

const TrustBadge = () => {
  return (
    <div className='bg-[#fff4f4] flex flex-col md:flex-row flex-wrap items-start justify-center space-x-8 space-y-10 px-10 py-20 md:p-20'>
      <div className='md:flex-1/3 flex flex-col justify-start items-start'>
        <h4 className='text-black text-2xl md:text-3xl text-left font-bold mb-5'>Free Delivery</h4>
        <p className='text-gray-700 text-left text-lg md:text-xl font-medium'>For all orders over Rs. 50, you are eligible for free delivery</p>
      </div>
      <div className='md:flex-1/3 flex flex-col justify-start items-start'>
        <h4 className='text-black text-2xl md:text-3xl text-left font-bold mb-5'>90 Days Return</h4>
        <p className='text-gray-700 text-left text-lg md:text-xl font-medium'>Buy with confidence, and return within 90 days if you're not completely satisfied.</p>
      </div>
      <div className='md:flex-1/3 flex flex-col justify-start items-start'>
        <h4 className='text-black text-2xl md:text-3xl text-left font-bold mb-5'>Secure Payment</h4>
        <p className='text-gray-700 text-left text-lg md:text-xl font-medium'>Protecting your transactions with industry-leading encryption and secure payment processing.</p>
      </div>
    </div>
  )
}

export default TrustBadge