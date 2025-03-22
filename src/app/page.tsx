import FollowUs from '@/components/FollowUs';
import HeroSection from '@/components/HeroSection';
import NewArrivals from '@/components/NewArrivals';
import TopPicks from '@/components/TopPicks';
import TrustBadge from '@/components/TrustBadge';
import React from 'react'

const Home = () => {
  return (
    <div className=''>
      <HeroSection />
      <TopPicks />
      <NewArrivals />
      <FollowUs />
      <TrustBadge />
    </div>
  )
}

export default Home;