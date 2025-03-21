import Image from 'next/image'
import React from 'react'
import breadcrumbImage from '../../public/images/breadcrumb-image.png';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadCrumbProps {
  title: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ title }) => {
  return (
    <section
        className="mt-27 p-20 relative flex gap-2 flex-col items-center justify-center h-[150px] md:h-[50dvh] bg-cover md:bg-contain bg-center"
        style={{ backgroundImage: `url(${breadcrumbImage.src})` }}
    >
        <Image 
            src="/images/logo.png"
            alt='logo of next furniture'
            width={50}
            height={50}
            className='object-contain'
        />
        <h2 className='text-4xl md:text-6xl font-medium'>{title}</h2>
        <div className='flex justify-center items-center gap-2'>
            <Link href="/" className='text-lg'>Home</Link>
            <ChevronRight size={20} />
            <p className='text-lg'>{title}</p>
        </div>
    </section>
  )
}

export default BreadCrumb