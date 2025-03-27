"use client";

import React, { useState } from 'react'

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSumbit = () => {

    }

    return (
        <form 
            onSubmit={handleSumbit}
            className='col-span-2 max-w-150 flex flex-col items-start justify-start'
        >
            <label className="mb-5 w-full flex flex-col text-lg md:text-xl text-black">
                Your name 
                <input 
                    type="text" 
                    name={name} 
                    id={name} 
                    placeholder='John Doe'
                    onChange={(e) => setName(e.target.value)} 
                    className="p-3 md:p-5 border border-gray-300 rounded-2xl"
                />
            </label>

            <label className="mb-5 w-full flex flex-col text-lg md:text-xl text-black">
                Email Address 
                <input 
                    type="text" 
                    name={email} 
                    id={email}
                    placeholder='john@doe.com'
                    onChange={(e) => setEmail(e.target.value)} 
                    className="p-3 md:p-5 border border-gray-300 rounded-2xl"
                />
            </label>

            <label className="mb-5 w-full flex flex-col text-lg md:text-xl text-black">
                Subject
                <input 
                    type="text" 
                    name={subject} 
                    id={subject}
                    placeholder='This is optional'
                    onChange={(e) => setSubject(e.target.value)} 
                    className="p-3 md:p-5 border border-gray-300 rounded-2xl"
                />
            </label>

            <label className="mb-5 w-full flex flex-col text-lg md:text-xl text-black">
                Message 
                <textarea 
                    name={message} 
                    id={message}
                    placeholder="Hi! I'd like to ask about"
                    onChange={(e) => setMessage(e.target.value)} 
                    className="p-3 md:p-5 border border-gray-300 rounded-2xl h-50"
                >

                </textarea>
            </label>

            <button type="submit" onClick={handleSumbit} 
                className="bg-black border-black border-1 text-white py-3 px-10 text-lg md:text-xl rounded-2xl hover:bg-white hover:text-black transition cursor-pointer"
            >
                Submit
            </button>
        </form>
    )
}

export default ContactForm