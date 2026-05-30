
import type { Product } from '../../types'
import { useNavigate } from 'react-router-dom';
import { PlusIcon, StarIcon } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface Props {
    product : Product
}

const ProductCard = ({product}: Props) => {

    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || '£';
    // destructure add to cart and import useCart from Context API
    const {addToCart} = useCart()
    const navigate = useNavigate();
  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-300 group animate-fade-in cursor-pointer'
    onClick={()=>navigate(`/products/${product._id}`)}>
        {/* display image */}
        <div className="relative aspect-square overflow-hidden">
            <img src={product.image} alt={product.name} className='w-full h-full object-cover p-4 group-hover:p-2 transition-all duration-300' />
            {/* Display badge */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2"> 
                {product.discount > 0 && <span className='px-2 py-0.5 text-[10px] font-semibold uppercase bg-app-green text-white rounded-full'>{product.discount}%  OFF</span> }
                </div>
        </div>
        {/* Product info */}
        <div className="p-3 text-zinc-700">
            <h3 className='text-sm leading-snug mb-1 line-clamp-2'>{product.name}</h3>
            {/* display Rtaing */}
            {product.rating > 0 && (
                <div className="flex items-center gap-1 mb-1">
                    <StarIcon className='size-5  text-app-warning fill-app-warning'/>
                    <span className='text-sm font-medium text-app-text'>{product.rating}</span>
                    <span className='text-sm text-app-text-light'>({product.reviewCount})</span>
                </div>
            )}

            {/* Price + Add */}
            <div className="flex items-center justify-between">
                <div className="flex items-center  truncate">
                    <span className='text-base font-medium'>{currency}{product.price.toFixed(2)}</span>
                    <span className='text-sm text-app-text-light block'>/{product.unit}</span>
                    {product.originalPrice > product.price && <span className='line-through text-sm text-app-text-light ml-1'>{currency}{product.originalPrice.toFixed(2)}</span>}

                </div>
                <button className='size-5 rounded-full bg-app-orange text-white flex-center shrink-0 hover:bg-app-orange-dark transition-colors active:scale-75'
                onClick={(e)=>{e.stopPropagation(); addToCart(product)}}><PlusIcon className='size-3'/></button>
            </div>
        </div>
        </div>
  )
}

export default ProductCard