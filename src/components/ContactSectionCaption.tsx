import { Clock, MapPin, PhoneIcon } from 'lucide-react'
import React from 'react'

const ContactSectionCaption = () => {
    return (
        <div className='w-full flex flex-col justify-start items-start gap-10'>
            <div className='flex items-start justify-start gap-10'>
                <MapPin size={24} className='w-20' />
                <div className='flex flex-col items-start justify-start'>
                    <h5 className='text-black font-bold text-2xl'>Address</h5>
                    <p className='text-gray-500 text-xl'>
                        236 5th SE Avenue, New York NY1000, United States
                    </p>
                </div>
            </div>  

            <div className='flex items-start justify-start gap-10'>
                <PhoneIcon size={24} />
                <div className='flex flex-col items-start justify-start'>
                    <h5 className='text-black font-bold text-2xl'>Address</h5>
                    <p className='text-gray-500 text-xl'>
                        Mobile: +(84) 546-6789
                    </p>
                    <p className='text-gray-500 text-xl'>
                        Hotline: +(84) 546-6789
                    </p>
                </div>
            </div> 

            <div className='flex items-start justify-start gap-10'>
                <Clock size={24} />
                <div className='flex flex-col items-start justify-start'>
                    <h5 className='text-black font-bold text-2xl'>Working Time</h5>
                    <p className='text-gray-500 text-xl'>
                        Monday-Friday: 9:00 - 22:00
                    </p>
                    <p className='text-gray-500 text-xl'>
                        Saturday-Sunday: 9:00-20:00
                    </p>
                </div>
            </div> 
        </div>
    )
}

export default ContactSectionCaption