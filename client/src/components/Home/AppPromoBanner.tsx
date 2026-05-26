import React from 'react'
import { appPromoBannerData, assets } from '../../assets/assets'

const AppPromoBanner = () => {
  return (
    <section className='max-w-4xl mx-auto px-3 sm:px-5 lg:px-6 py-8 my-5 bg-green-900 rounded-2xl'>
        
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-8 xl:px-8">
            {/* Left Side Content */}
            <div className="text-center md:text-left">
                <h2 className='font-serif text-2xl sm:text-3xl text-white mb-2'>{appPromoBannerData.title}</h2>
                <p className='text-white/70 mb-6 max-w-md'>{appPromoBannerData.description}</p>
                <div className="flex flex-wrap gap-1.5 flex-center  md:justify-start">
                    <button className='px-4 py-2 bg-white text-green-900 font-semibold rounded-xl hover:bg-orange-100'>App Store</button>
                    <button className='px-4 py-2 bg-black text-white transition-colors border border-white/10 font-semibold rounded-xl hover:bg-orange-500'>Google Play</button>
                </div>
            </div>
            {/* Right side Image */}
        <img src={assets.delivery_truck} alt="dlivery truck" className='size-60 mx-w-60 sm:max-w-120 ' />
        </div>
        
    </section>
  )
}

export default AppPromoBanner