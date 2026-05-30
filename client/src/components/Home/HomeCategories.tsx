
import { categoriesData } from '../../assets/assets'
import {  Link } from 'react-router-dom'

const HomeCategories = () => {
  return (
    <section className='py-6'>
        <div className="max-w-7xl mx-auto">
            <div className="">
                <h2 className='text-2xl font-semibold'>Browse Categories</h2>
                <p className='text-base text-app-text-light mt-1'>Kindly find what you need below</p>
            </div>
            <div className="flex items-center overflow-x-scroll mt-3 no-scrollbar">
                {categoriesData.map((cat)=>(
                    <Link to={`/products?category=${cat.slug}`} key={cat.slug}
                     onClick={()=>window.scrollTo(0,0)}
                     className='flex flex-col items-center gap-3 p-3'>
                        <div className="size-16 sm:size-26 sm:p-2 rounded-2xl overflow-hidden bg-orange-100 group-hover:ring-2  ring-orange-300/80 transition-all">
                            <img src={cat.image} alt={cat.name} className='w-full h-full object-contain rounded-full transition-all' />
                        </div>
                        <span className='text-sm font-medium text-zinc-600 text-center leading-tight'>{cat.name}</span>
                     </Link>
                ))}

            </div>

        </div>
        </section>
  )
}

export default HomeCategories