import React from 'react'
import ContactForm from './ContactForm'
import ContactSectionCaption from './ContactSectionCaption'

const ContactSection = () => {
    return (
        <section>
            <div className="py-10 px-10 md:py-20 md:px-20 bg-white flex flex-col items-center justify-center space-y-8">
                <h4 className='text-black font-bold text-2xl md:text-4xl capitalize text-center'>Get In Touch With Us</h4>
                <p className='text-gray-500 text-lg md:text-2xl text-center max-w-full md:max-w-300'>
                    For More Information About Our Products & Services.  Please feel free to drop us a message, our staff will always be there to help you out. Do not Hesitate!
                </p>
            </div>
            <div className='py-10 px-10 md:p-20 grid grid-cols-1 md:grid-cols-3 items-start justify-center gap-10 md:gap-30 bg-white' >
                <ContactSectionCaption />
                <ContactForm />
            </div>
        </section>
    )
}

export default ContactSection