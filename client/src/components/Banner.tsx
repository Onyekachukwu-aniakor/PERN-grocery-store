import { Truck,  XIcon, ZapIcon } from 'lucide-react';
import  { useState } from 'react'

const Banner = () => {
    const [bannerVisible, setBannerVisible] =useState(()=>{
        return sessionStorage.getItem('banner_dismissed') !== 'true';
    });

    const dismissBanner = ()=>{
        setBannerVisible(false);
        sessionStorage.setItem('banner_dismissed', 'true')
    }
  return (
    <div>{bannerVisible && (
        <div className=" bg-linear-to-r from-app-green via-emerald-800 to-app-green-light text-white text-sm  sm:text-sm relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-2 flex-center gap-4">
                <div className="flex-center gap-2">
                    <Truck className='size-5 shrink-0'/>
                <span className=''>Free delivery on orders above £100</span>
                </div>
                
                <div className="hidden  sm:flex items-center gap-2">
                    <span className=''>|</span>
                     <ZapIcon className='size-4 fill-yellow-400 text-yellow-400 shrink-0'/>
                     <span className=''>Fresh farm-produce delivered everyday</span>
               </div>
                
            </div>
            <button className='absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors'
            onClick={dismissBanner}>
                <XIcon className='size-4'/>
            </button>
        </div>
    )}</div>
  )
}

export default Banner