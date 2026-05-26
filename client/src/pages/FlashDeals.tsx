import React, { useEffect, useState } from 'react'
import type { Product } from '../types'
import { dummyProducts } from '../assets/assets';
import { Loader2Icon, ZapIcon } from 'lucide-react';
import Loading from '../components/Loading';
import ProductCard from '../components/Home/ProductCard';

const FlashDeals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    // 'p' means individual product
    setProducts(dummyProducts.filter((p: any)=>p.stock > 0))
    setTimeout(()=>setLoading(false), 1000)

  },[])
  return (
    <div className='min-h-screen bg-app-cream'>
      {/* Display Banner */}
      <div className="bg-linear-to-r from-app-orange via-app-orange/80 to-app-orange-dark text-white py-5">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 text-center">
        <div className="flex-center gap-2 mb-2">
          <ZapIcon className='size-5 fill-white' />
          <h1 className='text-2xl font-semibold'>Flash Deals</h1>
          <ZapIcon className='size-5 fill-white' />
        </div>
        <p className='mx-auto text-white/90 max-w-md'>Grab your fresh farm products now before it is finished</p>
        </div>
        </div>
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-4">
          {loading ? (
            <Loading />
          ) : (products.length === 0 ? (
            <div className="text-center py-6"><ZapIcon className='size-10 text-app-border mx-auto mb-3' />
            <h2 className='text-lg font-semibold text-app-green mb-2'>No deals currently</h2>
            <p className='text-sm text-app-text-light'>Please check back later</p></div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
              {products.map((product)=>product.stock > 0 && (
                <ProductCard key={product._id} product={product}/>
              ))}
            </div>
          ))}
        </div>
    </div>
  )
}

export default FlashDeals