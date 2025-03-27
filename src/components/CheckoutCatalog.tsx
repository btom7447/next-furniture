import React from 'react'
import BillingDetailsForm from './BillingDetailsForm'
import BillingTotal from './BillingTotal'

const CheckoutCatalog = () => {
  return (
    <section className='bg-white px-5 py-20 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-10'>
        <BillingDetailsForm />
        <BillingTotal />
    </section>
  )
}

export default CheckoutCatalog