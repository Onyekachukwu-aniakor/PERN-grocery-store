import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { Product } from '../types';
import { categoriesData, dummyProducts } from '../assets/assets';
import {  ChevronDown, Home, SlidersHorizontal, XIcon } from 'lucide-react';
import ProductCard from '../components/Home/ProductCard';
import Loading from '../components/Loading';
import FilterPanel from '../components/FilterPanel';

const Products = () => {
  /* setSearchParams function
The second element of the tuple is a function that can be used to update the search params. It accepts the same types as defaultInit and will cause a navigation to the new URL.

let [searchParams, setSearchParams] = useSearchParams();

// a search param string
setSearchParams("?tab=1");

// a shorthand object
setSearchParams({ tab: "1" }); 
setSearchParams("?tab=1");

// a shorthand object
setSearchParams({ tab: "1" });

// object keys can be arrays for multiple values on the key
setSearchParams({ brand: ["nike", "reebok"] });

// an array of tuples
setSearchParams([["tab", "1"]]);

// a `URLSearchParams` object
setSearchParams(new URLSearchParams("?tab=1"));*/
  const [searchParams, setSearchParams]=useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen]= useState(false);

  const category = searchParams.get('category') || '';
  const organic = searchParams.get('organic') || '';
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page')) || 1;
   const minPrice = searchParams.get('minPrice') || '';
   const maxPrice = searchParams.get('maxPrice') || '';

   const fetchProducts = async()=> {
    setLoading(true);
    //'p' below means individual product
    setProducts(dummyProducts.filter((p)=>p.category === category || category === ''));
    //setLoading(false) below will make the loading of products above to be false when loaded
    setLoading(false)
    
   };

   const updateFilter = (key: string, value: string)=>{
    const newParams = new URLSearchParams(searchParams)
    if(value){
      newParams.set(key, value)
    }else {
      newParams.delete(key)
    }
    if(key !== 'page'){
      newParams.delete('page')
    }
    setSearchParams(newParams)

   };

   const clearFilters =()=> setSearchParams({});
    //this clears all the filters
   //'c' below means individual category
   const activeCategory = categoriesData.find((c)=>c.slug === category);
   // if any of (category || organic || minPrice || maxPrice) below is true, then filter applies
   const hasFilters = category || organic || minPrice || maxPrice;

   useEffect(()=>{
    fetchProducts()

   },[category, sort, organic, page, minPrice, maxPrice]);
  
  return (
    <div className='min-h-screen bg-app-cream'>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 py-4">
        {/* Breadcrumb: it is a navigation found on top of the web page which allow users to know where they are on the page and link to those page */}
        <nav className='flex items-center gap-2 text-sm text-app-text-light mb-3'>
          <Link to='/' className='hover:text-app-green transition-colors'>
          <Home className='size-5'/></Link>
          <span className=''>/</span>
          <span className='text-app-green font-medium'>{activeCategory ? activeCategory.name : 'All Products'}</span>
        </nav>
        <div className="flex gap-4 xl:gap-6">
          {/* Desktop Sidebar */}
          <aside className='hidden lg:block w-64 shrink-0'>
            <div className="bg-white rounded-2xl p-3 sticky top-24">
              
              <FilterPanel  categories={categoriesData} category={category} organic={organic} minPrice={minPrice} maxPrice={maxPrice} updateFilter={updateFilter} 
              clearFilters={clearFilters} hasFilters={hasFilters} />
              </div> 
              </aside>


          {/* Main Content */}
          <main className='flex-1'>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="">
                <h1 className='text-xl font-medium text-app-green'>{activeCategory ? activeCategory.name : 'All Products'}</h1>
                {/* product.length tells the no of product available */}
                <p className='text-sm text-app-text-light mt-0'>{products.length} products found</p>
              </div>
              <div className="flex flex-col lg:items-center gap-2">
                {/* Mobile Filter Toggle */}
                <button onClick={()=>setMobileFilterOpen(true)}
                 className='lg:hidden flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-xl border border-app-border hover:bg-app-cream transition-colors'>
                  <SlidersHorizontal className='size-5'/> Filters
                </button>
                {/* Sort Products */}
                {/* <div className="relative">
                  <select name="" value={sort} onChange={(e)=>updateFilter('sort', e.target.value)}
                    className='appearance-none pl-3 pr-5 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer'>
                    <option value="">Newest</option>
                    <option value="price_asc">Price: Low - High</option>
                    <option value="price_desc">Price: High - Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name">A - Z</option>
                  </select>
                  <ChevronDown className='absolute pl-3 right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 text-app-text-light pointer-events-none'/>
                </div> */}
                
              </div>
            </div>
            {/* Display Product Grid */}
            {loading ? (
              <Loading/>
            ) : products.length === 0 ? (
              <div className="text-center py-6"> <p className='font-semibold text-base text-app-green mb-2'>No product found</p>
              <p className='text-sm text-app-green-light mb-2'>Try adjusting your filter or search terms</p>
              <button onClick={clearFilters} 
              className='px-2 py-2 text-sm font-medium bg-app-green text-white rounded-xl hover:bg-app-green-light transition-colors'>Clear Filters</button></div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xl:gap-4">
                {products.map((product )=>
                  product.stock > 0 && (
                    <ProductCard key={product._id} product={product}/>
                  )
                )}
              </div>
            )}

            {/* Display Pagination */}
            {totalPages > 1 && (
              <div className="flex-center gap-2 mt-6">{Array.from({length: totalPages}).map((_, i)=>(
                <button key={i} onClick={function(){
                  updateFilter('page', String(i + 1)); window.scrollTo(0,0)
                }}
                 className={`size-7 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? 'bg-app-green text-white' : 'bg-white text-app-text-light hover:bg-app-cream'}`}>{i + 1}</button>
              ))}</div>
            )}
          </main>

        </div>
      </div>
      {/* Mobile filter modal */}
      {mobileFilterOpen && (
        <>
        <div className="fixed inset-0 bg-black/50 z-50" 
        onClick={()=> setMobileFilterOpen(false)}/>
        <div className="fixed bottom-0 left-0 right-1.5 bg-white z-50 rounded-t-2xl max-h-[80vh]
        overflow-y-auto animate-slide-in-up">
          <div className="flex items-center justify-between p-3 border-b border-app-border">
            <h3 className='text-lg font-semibold text-app-green '>Filters</h3>
            <button className='p-2 hover:bg-app-green rounded-lg'
            onClick={()=> setMobileFilterOpen(false)}><XIcon className='size-5' /></button>
          </div>
          <div className="p-4">
            <FilterPanel categories={categoriesData} category={category} organic={organic} minPrice={minPrice} maxPrice={maxPrice} updateFilter={updateFilter} 
              clearFilters={clearFilters} hasFilters={hasFilters} />
          </div>
        </div>
        </>
      )}
      </div>
  )
}

export default Products