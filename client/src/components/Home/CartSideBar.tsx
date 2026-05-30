
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon, XIcon } from 'lucide-react';

const CartSideBar = () => {

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL  || '£' ;

  const {items, updateQuantity, removeFromCart, cartTotal, isCartOpen, setIsCartOpen} = useCart();

  const navigate = useNavigate();
   if(!isCartOpen) return null;

   const deliveryFee = cartTotal > 100 ? 0 : 2;
   const grandTotal = cartTotal + deliveryFee;


  return (
    <>
    {/* Overlay */}
    <div className='fixed inset-0 bg-black/40 z-50 transition-opacity'
    onClick={()=>setIsCartOpen(false)}/>
    {/* Sidebar */}
    <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white  z-50 shadow-2xl flex flex-col animate-slide-in-">

      {/* Cart Header */}
      <div className="flex items-center justify-between p-3 border-b border-app-border">
      <div className="flex items-center gap-1.5">
        <ShoppingBagIcon className='size-6'/>
        <h2 className='text-lg font-bold leading-relaxed'>Your Cart</h2>
        <span className='px-2 py-0.5 text-sm font-semibold text-app-green-light rounded-full'>{items.length} items</span>
      </div>
      <button className='p-2 rounded-xl hover:bg-app-cream transition-colors'
      onClick={()=>setIsCartOpen(false)}><XIcon className='size-6'/></button>
      </div>
      {/* Display Items */}
      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {items.length === 0? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBagIcon className='size-16 text-app-border mb-2'/>
            <h4 className='text-lg font-medium mb-0.5'>Your cart is empty</h4>
          </div>
        ) : (items.map((item)=>(
          <div className="flex gap-2 bg-app-cream/70 rounded-xl p-2" key={item.product._id}>
            <img src={item.product.image} alt={item.product.name} className='size-16 rounded-lg object-cover shrink-0' />
            <div className="flex-1 min-w-0">
              <h4 className='text-sm font-semibold truncate'>{item.product.name}</h4>
          <p className='text-sm text-app-text-light'>{currency}{item.product.price.toFixed(2)}/ {item.product.unit}</p>
          {/* increase/decrease */}
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-1.5">
                  <button className='size-7 rounded-lg bg-white border border-app-border flex-center'
                  onClick={()=>updateQuantity(item.product._id, item.quantity -1)}>
                    <MinusIcon className='size-4' />
                  </button>
                  <span className='text-sm font-semibold w-6 text-center'>{item.quantity}</span>
                  <button className='size-7 rounded-lg bg-white border border-app-border flex-center'
                  onClick={()=>updateQuantity(item.product._id, item.quantity + 1)}>
                    <PlusIcon className='size-4' />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className='text-sm font-semibold'>{currency}{(item.product.price * item.quantity).toFixed(2)}</span>
                  <button className='p-1 text-app-text-light hover:text-app-error transition-colors' onClick={()=>removeFromCart(item.product._id)}><Trash2Icon className='size-5'/></button>
                </div>
              </div>
            </div>
          </div>
        )))}

      </div>
      {/* Display Footer */}
      {items.length > 0 && (
        <div className="p-3 border-t border-app-border space-y-3">
          <div className="flex justify-between text-sm">
            <span className='text-app-text-light'>Subtotal</span>
            <span className='font-medium'>{currency}{cartTotal.toFixed(2)}</span>
          </div>


          <div className="flex justify-between text-sm">
            <span className='text-app-text-light'>Delivery</span>
            <span className='font-medium'>{deliveryFee === 0 ? <span className='text-app-success'>Free</span> : `${currency}${deliveryFee.toFixed(2)}`}</span>
          </div>
          {deliveryFee > 0 && <p className='text-sm text-app-text-light text-center'>Free delivery on orders over {currency}100</p>}

          <div className="flex justify-between text-base font-semibold border-t border-app-border pt-2">
            <span className=''>Total</span>
            <span className=''>{currency}{grandTotal.toFixed(2)}</span>
          </div>
          <button className='w-full py-2 bg-app-orange text-white font-semibold rounded-xl hover:bg-app-orange-dark transition-colors flex-center gap-1.5 active:scale-100'
          onClick={()=>{setIsCartOpen(false); navigate('/checkout'); window.scrollTo(0,0)}}>Proceed to Checkout<ArrowRightIcon className='size-5' /></button>
        </div>
      )}

    </div>
    
    
    </>
  )
}

export default CartSideBar