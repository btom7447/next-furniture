import React, { useState } from 'react'

const BillingDetailsForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [town, setTown] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [additional, setAdditional] = useState("");

    
    return (
        <div className='bg-white flex flex-col justify-around items-start'>
            <h4 className="text-black text-3xl font-bold text-center capitalize mb-5">Billing Details</h4>
            <form className="px-5 md:px-10 pb-10 w-full h-90 flex flex-col items-start overflow-y-auto">
                <label className="mb-5 w-full flex flex-col text-lg text-black">
                    Name
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        className="p-3 border border-gray-300 rounded-2xl"
                    />
                </label>

            </form>
        </div>
    )
}

export default BillingDetailsForm