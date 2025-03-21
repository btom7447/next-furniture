import FollowUs from '@/components/FollowUs';
import HeroSection from '@/components/HeroSection';
import NewArrivals from '@/components/NewArrivals';
import TopPicks from '@/components/TopPicks';
import React from 'react'

const Home = () => {
  return (
    <div className=''>
      <HeroSection />
      <TopPicks />
      <NewArrivals />
      <FollowUs />
    </div>
  )
}

export default Home;