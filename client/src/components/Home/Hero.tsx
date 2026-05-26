import React from 'react'
import { heroSectionData } from '../../assets/assets'
import { ArrowRightIcon, LeafIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section  className='relative overflow-hidden min-h-135 mb-5 rounded-3xl flex items-center '>
        <img src={heroSectionData.hero_image} alt="Hero"  className='absolute inset-0 h-full w-full object-cover'/>
        <div className='absolute inset bg-linear-to-r from-app-green via-app-green/90 to-transparent'/>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-12 w-full">
            <div className="max-w-xl xl:pl-10">
                <span className='inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-app-green-light rounded-full mb-5'><LeafIcon size={22}/>Fresh Farm Produce</span>
                <h2 className='font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5'>Nourish your home with <span className='text-orange-600'>Fresh Produce!</span></h2>
               <p className='text-base text-white leading-relaxed max-w-md  mb-6'> {heroSectionData.description}</p>
               <div className="flex flex-wrap gap-3">
                <Link to='/products' className='px-6 py-2 bg-orange-500 text-white font-bold rounded-full hover:bg-black transition-all flex-center gap-2 active:scale-[0.98] '>
                Shop Now <ArrowRightIcon size={15} /></Link>

                <Link to='/products' className='px-6 py-2 bg-black text-white font-bold rounded-full hover:bg-orange-500 transition-all  border border-white'>
                Browse Categories</Link>
               </div>
            </div>
            
            </div></section>
  )
}

export default Hero