import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext';
import { dummyAddressData } from '../assets/assets';
import type { Address } from '../types';
import { ArrowLeft,  CheckIcon, ChevronRightIcon, CreditCardIcon, MapPinIcon } from 'lucide-react';
import CheckoutAddress from '../components/Checkout/CheckoutAddress';
import CheckoutPayment from '../components/Checkout/CheckoutPayment';
import CheckoutReview from '../components/Checkout/CheckoutReview';

const CheckOut = () => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || '£';
  const [step, setStep] = useState('address');
  const [loading, setLoading] = useState(false)
  const {items, cartTotal}= useCart();
  const {user}= {user:{addresses : dummyAddressData}};
  const [address, setAddress] = useState<Address>({
    _id : 'Home',
    label: '',
    address : '',
    city : '',
    state : '',
    zip : '',
    isDefault : false,
    lat: 0,
    lng: 0
    });
    const [paymentMethod, setPaymentMethod]= useState('card');

    const deliveryFee = cartTotal > 100 ? 0 : 1.99;
    const tax = cartTotal * 0.08;
    const total = cartTotal + deliveryFee + tax;
    const steps : {key: string, label: string, icon: typeof MapPinIcon}[] = [
      {key : 'address', label:'Address', icon:MapPinIcon},
      {key : 'payment', label:'Payment', icon:CreditCardIcon},
      {key : 'review', label:'Review', icon:CheckIcon}];
      const handlePlaceOrder = async()=>{
        setLoading(true);
        navigate('/orders')
      };

      // populate address from user's default address' 'a'= address below
      /* useState(()=>{
        if(user?.addresses?.length){
          const defaultAddr = user.addresses.find((a)=>a.isDefault || user.addresses[0]);
          setAddress({
    _id : defaultAddr?._id,
    label: defaultAddr?.label,
    address : defaultAddr?.address,
    city : defaultAddr?.city,
    state : defaultAddr?.state,
    zip : defaultAddr?.zip,
    isDefault : defaultAddr?.isDefault,
    lat: defaultAddr?.lat,
    lng: defaultAddr?.lng,
    });
        }
      }); */

      if(items.length === 0){
        return (
          <div className="min-h-screen bg-app-cream flex-center">
            <div className="text-center">
              <h2 className='text-lg font-semibold text-app-green mb-1'>Your cart is empty</h2>
              <p className='text-sm text-app-text-light mb-1'>Add some products to checkout</p>
              <button onClick={()=>navigate('/products')}
               className='px-2 py-2 bg-app-green font-medium rounded-xl hover:bg-app-green-light transition-colors text-white text-sm '>Browse Products</button>
            </div>
          </div>
        )
      }

  return (
    <div className='min-h-screen bg-app-cream'>
      <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-6 py-3">
        {/* Back button */}
        <button onClick={()=>navigate('/products')}
         className='flex items-center gap-2 text-sm text-app-text-light hover:text-app-green mb-2 transition-colors'>
          <ArrowLeft className='size-5'/>Back
        </button>
        <h1 className='text-lg font-semibold text-app-green mb-1'>Checkout</h1>
        {/* Steps */}
        <div className="flex items-center gap-1 mb-2">
          {steps.map((s,i)=>(
            <div className="flex items-center gap-1" key={s.key}>
              <button onClick={()=>setStep(s.key)}
               className={`flex items-center px-2 py-2 gap-4 rounded-xl text-sm font-medium transition-colors ${step ===s.key? 'bg-app-green text-white' : 'bg-white text-app-text-light'}`}>
                <s.icon  className='size-4'/>{s.label}
                {i< steps.length - 1  && <ChevronRightIcon className='size-5 text-app-text-light'/>}
              </button>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-2">
          {/* Main Form */}
          <div className="md:col-span-2">
            {step === 'address' && <CheckoutAddress address={address} setAddress={setAddress} user={user} setStep={setStep}/>}

            {step === 'payment' && <CheckoutPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} setStep={setStep}/>}

            {step === 'review' && <CheckoutReview address={address}  handlePlaceOrder={handlePlaceOrder} items={items} loading={loading} total={total}/>}
          </div>
          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-2xl p-3 h-fit sticky top-24">
            <h3 className='text-sm font-medium text-app-green mb-2'>Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className='text-app-text-light'>Subtotal ({items.length}  items)</span>
                <span className=''>{currency}{cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className='text-app-text-light'>Delivery</span>
                <span className=''>{deliveryFee === 0? <span className='text-app-success'>Free</span> : `${currency}${deliveryFee.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between">
                <span className='text-app-text-light'>Tax</span>
                <span className=''>{currency}{tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-1 border-t border-app-border text-base font-semibold">
                <span className=''>Total</span>
                <span className='text-app-green'>{currency}{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      </div>
  )
}

export default CheckOut