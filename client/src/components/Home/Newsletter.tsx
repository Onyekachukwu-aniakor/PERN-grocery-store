import { MailIcon } from 'lucide-react'
import React from 'react'

const Newsletter = () => {
  return (
    <section className='bg-white py-8 px-3 sm:px-5 lg:px-8 rounded-2xl mx-auto shadow-2xs mt-15 mb-10'>
    <div className='max-w-2xl mx-auto text-center'>
        <div className="size-16 bg-white rounded-xl flex-center mx-auto mb-4 shadow">
            <MailIcon className='size-9 text-app-green' strokeWidth={1.5}/>
        </div>
        <h2 className='text-2xl font-semibold text-app-green mb-2'>Subscribe to our newsletter</h2>
        <p className='text-base leading-relaxed text-app-green-light mb-2'>Get weekly updates on our produce and discount offers here</p>
        <form className='flex flex-col sm:flex-row  max-w-md mx-auto' onSubmit={(e)=>e.preventDefault()}>
            <input type="email"  placeholder='Enter your email' className=' flex-1 px-3 py-2  rounded-l-2xl border border-app-border  focus:border-app-green focus:ring bg-white text-sm transition-all ' required/>
            <button type='submit' className='text-white bg-app-green font-semibold rounded-r-2xl px-4 py-2 hover:bg-app-green-light transition-colors shadow-sm whitespace-nowrap active:scale-100'>Subscribe</button>
        </form>

    </div>
    </section>
  )
}

export default Newsletter