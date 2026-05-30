import  { useEffect, useState } from 'react'
import type { Product } from '../types'
import { Link, useSearchParams } from 'react-router-dom';
import { dummyProducts } from '../assets/assets';
import { Home, SearchIcon } from 'lucide-react';
import Loading from '../components/Loading';
import ProductCard from '../components/Home/ProductCard';

const SearchResults = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]= useState(true);
  const [searchParams]= useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(()=>{
    if(!query) {return;}
    setLoading(true);
    //'p' means product; 'q' means query
    setProducts(dummyProducts.filter((p:any)=>p.name.toLowerCase().includes(query.toLowerCase())));
    setLoading(false);

  },[query]);
  return (
    <div className='min-h-screen bg-app-cream'>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 py-2">
        {/* Breadcrumbs */}
        <nav className='flex items-center gap-2 text-sm text-app-text-light mb-3'>
          <Link to='/' className='hover:text-app-green transition-colors'>
          <Home className='size-5'/></Link>
          <span className=''>/</span>
          <span className='text-app-green font-medium'>Search Result</span>
        </nav>
        {/* Header */}
        <div className="mb-1">
          <h1 className='text-base font-semibold text-app-green mb-1'>Results for '{query}'</h1>
          <p className='text-base text-app-text-light'>{loading ? 'Searching...' : `${products.length} items found`}</p>
        </div>
        {/* Display Results */}
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="text-center py-4">
            <SearchIcon className='size-16 text-app-border mx-auto mb-2'/>
            <h2 className='text-lg font-semibold text-app-green mb-2'>No results found</h2>
            <p className='text-base text-app-text-light mb-1.5 max-w-md mx-auto'>We could'nt found any products matching '{query}'. Try a different search term</p>
            <Link to='/products'  className='inline-flex px-3 py-2 bg-app-green text-white text-sm font-medium rounded-lg'>
            Browse All Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {products.map((product)=>(
              <ProductCard key={product._id} product={product}/>
            ))}
          </div>
        )}

      </div>
      </div>
  )
}

export default SearchResults