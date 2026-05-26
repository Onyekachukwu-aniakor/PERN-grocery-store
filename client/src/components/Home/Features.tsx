import React from 'react'
import { heroSectionData } from '../../assets/assets'

const Features = () => {
  return (
    <section className='bg-white py-3 border border-app-border/80 rounded-xl '>
        <div className="mx-auto px-3 sm:px-5 lg:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {heroSectionData.hero_features.map((feature, i)=> (
                    <div className="flex items-center gap-3 py-1" key={i}>
                        <div className="size-12 rounded-lg bg-app-cream flex-center shrink-0">
                            <feature.icon className='size-6'/>
                        </div>
                        <div className="">
                            <p className='text-base font-semibold text-app-green'>{feature.title}</p>
                            <p className='text-base text-app-text-light'>{feature.desc}</p>
                        </div>

                    </div>
                ))}
            </div>

        </div>
        </section>
  )
}

export default Features