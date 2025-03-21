import Link from 'next/link'
import React from 'react'
import { ChevronRight } from 'lucide-react'

interface ProductBreadCrumbProps {
  name: string;
}

const ProductBreadCrumb: React.FC<ProductBreadCrumbProps> = ({ name }) => {
  return (
    <div className='my-10 w-full flex flex-wrap justify-start items-start space-x-8 space-y-5'>
      <Link href="/" className='text-2xl text-gray-500'>Home</Link>
      <ChevronRight size={25} />
      <Link href="/shop" className='text-2xl text-gray-500'>Shop</Link>
      <ChevronRight size={25} /> 
      <h6 className='text-2xl text-black pl-10 border-l-2 border-gray-500'>{name}</h6>
    </div>
  )
}

export default ProductBreadCrumb