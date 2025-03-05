import React from 'react';
import { assets } from '../assets/assets.js';

const Hero = () => {
  return (
    <section className='flex flex-col sm:flex-row border border-gray-400'>
      {/* hero left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-gray-800'>
          <div className='flex items-center gap-2'>
            <span className='w-8 md:w-11 h-[2px] bg-gray-700'></span>
            <span className='font-medium text-sm md:text-base'>OUR BESTSELLERS</span>
          </div>
          <h1 className=' prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrival</h1>
          <div className='flex items-center gap-2'>
            <span className='font-semibold text-sm md:text-base'>SHOP NOW</span>
            <span className='w-8 md:w-11 h-[2px] bg-gray-700'></span>
          </div>
        </div>
      </div>
      {/* right side image */}
      <img
        src={assets.hero_img}
        alt="Hero section showcasing latest arrivals"
        className='w-full sm:w-1/2'
      />
    </section>
  );
};

export default Hero;
