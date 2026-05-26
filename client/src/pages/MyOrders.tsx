import React, { use, useEffect, useState } from 'react'
import type { Order } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { dummyDashboardOrdersData, statusColors } from '../assets/assets';
import Loading from '../components/Loading';
import { CalendarIcon, ChevronRightIcon, PackageIcon } from 'lucide-react';

const MyOrders = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || '£';
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab]= useState('all');
  const [searchParams, setSearchParams] = useSearchParams();
   const tabs =['Placed', 'all', 'Delivered','Out for Delivery'];

   const {clearCart} = useCart();

   const fetchOrders = async()=> {
    setOrders(dummyDashboardOrdersData as any);
    setLoading(false);
   }

   useEffect(()=>{
    if(searchParams.get('clearCart')){
      clearCart();
      setSearchParams({});
      setTimeout(()=>{
        fetchOrders()
      },2000)

    }else {
      fetchOrders()
    }
  

   },[activeTab, clearCart, searchParams, setSearchParams])
  return (
    <div className='min-h-screen bg-app-cream mb-4'>
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-3">
        <h1 className='text-xl font-semiboldtext-app-green mb-2'>My Orders</h1>

        {/* Display tabs */}
        <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
          {tabs.map((tab)=>(
            <button key={tab} onClick={()=> setActiveTab(tab)} className={`px-2 py-1 text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-app-green text-white' : 'bg-white text-app-text-light hover:text-app-green'}`}>
              {tab === 'all'? 'All Orders' : tab}
            </button>
          ))}
        </div>
        {/* Display Order List */}
        {loading ? (
          <Loading />
        ) : orders.length === 0 ?(
          <div className="text-center py-2">
            <PackageIcon className='size-16 text-app-border mx-auto mb-2' />
            <h2 className='text-lg font-medium text-app-green mb-1'>No orders yet</h2>
            <p className='text-sm text-app-text-light mb-2'>Shop to see your orders here</p>
            <Link to='/products' className='inline-flex px-2 py-2 bg-app-green text-white text-sm rounded-lg'>Start Shopping</Link>
          </div>
        ): ( 
          <div className="space-y-4">
            {orders.map((order)=>(
              <Link to={`/orders/${order._id}`}  key={order._id} className='max-w-4xl block bg-white rounded-2xl p-3 hover:shadow transition-all'>
                {/* orderId date & status */}
                <div className="flex items-start justify-between mb-2">
                  {/* Left side */}
                  <div className="">
                    <p className='text-app-green text-sm font-medium'>Order #{order._id.slice(-8).toUpperCase()}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <CalendarIcon className='size-6 text-app-text-light'/>
                      <span className='text-sm text-app-text-light'>{new Date(order.createdAt).toLocaleString('en-us', {month: 'long', day:'numeric', year:'numeric'})}</span>
                    </div>
                  </div>
                  {/* Right side */}
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-sm font-medium rounded-full ${statusColors[order.status || 'bg-gray-100 text-gray-700']}`}>{order.status} </span>
                    <ChevronRightIcon className='size-4 text-app-text-light ' />
                  </div>
                </div>

                {/* Item thumbnails */}
                <div className="flex items-center gap-2 mb-1 ">
                  {order.items.slice(0,4).map((item,i)=>(
                    <img src={item.image} key={i} alt={item.name} className='size-16 sm:size-18 rounded-lg object-cover border border-app-border' />
                  ))}
                  {order.items.length > 4 && (
                    <div className="size-16 sm:size-18 rounded-lg bg-app-cream flex-center text-sm font-semibold text-app-text-light">+{order.items.length - 4}</div>
                  )}
                </div>

                {/* total items & total price */}
                <div className="flex items-center justify-between pt-2 text-sm">
                  <span className='text-app-text-light'>{order.items.length}  items</span>
                  <span className='font-semibold text-app-green'>{currency}{order.total.toFixed(2)}</span>
                  
                </div>
              </Link>
            ))}

          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders