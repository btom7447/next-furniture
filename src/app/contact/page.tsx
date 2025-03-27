import BreadCrumb from '@/components/BreadCrumb'
import ContactSection from '@/components/ContactSection'
import TrustBadge from '@/components/TrustBadge'
import React from 'react'

const Contact = () => {
  return (
    <>
      <BreadCrumb title="Contact" />
      <ContactSection />
      <TrustBadge />
    </>
  )
}

export default Contact