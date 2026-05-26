import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Order } from '../types';
import {  dummyDashboardOrdersData } from '../assets/assets';
import Loading from '../components/Loading';
import { ArrowLeftIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import OrderOTP from '../components/OrderTracking/OrderOTP';
import LiveMap from '../components/OrderTracking/LiveMap';
import OrderTimeLine from '../components/OrderTracking/OrderTimeLine';


const OrderTracking = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true)
  //lat == latitude, lng= longitude
  const [liveLocation, setLiveLocation] = useState<{lat:number, lng: number} | null>(null);
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || '£';

  useEffect(()=>{
    //'o' = order
   setOrder(dummyDashboardOrdersData.find((o)=>o._id === id) as any);
   setLoading(false);
  },[id, navigate]);

  if(loading) {return <Loading/>};
  if(!order) {return  null }
  return (
    <div className='min-h-screen mb-4 bg-app-cream'>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-2 ">
        {/* Header */}
        <button onClick={()=>navigate('/orders')}
        className='flex items-center gap-2 text-sm text-app-text-light hover:text-app-green mb-2 transition-colors'>
          <ArrowLeftIcon className='size-5' /> Back to Orders
        </button>
        {/* Order id, status & date */}
        <div className="flex items-center justify-between mb-2">
          <div className="">
            <h1 className='text-lg font-semibold text-app-green '>Order  #{order._id.slice(-8).toUpperCase()}</h1>
            <p className='text-app-text-light text-sm mt-1'>Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {month:'long', day:'numeric', year: 'numeric'})}</p>
          </div>
          <span className={`px-2 py-1.5 text-sm font-medium rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Cancelled'? 'bg-red-100 text-red-700' : 'bg-app-orange/10 text-app-orange'}`}>{order.status}</span>

        </div>
        <div className="grid lg:grid-cols-3 gap-2">
          {/* left side timeline + map area */}
          <div className=" lg:col-span-2 space-y-5">
            {/* OTP card */}
            <OrderOTP order={order}/>
            {/* Live Tracking map */}
            <LiveMap liveLocation={liveLocation} order={order}/>
            {/* Progress timeline */}
            <OrderTimeLine order={order} />
            {/* Delivery person */}
            {order.deliveryPartner && order.status !== 'Delivered' && order.status  !=='Cancelled'  && (
              <div className="bg-white rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-10 rounded-full bg-app-green flex-center">
                    <span className='text-white font-semibold text-sm'>{order.deliveryPartner.name.charAt(0)}</span>
                  </div>
                  <div className="">
                    <p className='text-sm font-medium text-app-green'>{order.deliveryPartner.name}</p>
                    <p className='text-sm text-app-text-light capitalize'>{order.deliveryPartner.vehicleType}. Delivery Partner</p>
                  </div>
                </div>
                <a href={`tel: ${order.deliveryPartner.phone}`} className='p-2 bg-app-cream rounded-xl hover:bg-appcream-dark transition-colors'> 
                  <PhoneIcon className='size-5 text-app-green'/>
                </a>
              </div>
            )}
            
            

          </div>
          {/*Right side - Order details  */}
          <div className="space-y-5">
            {/* Delivery Address */}
            <div className="rounded-lg bg-white p-3">
              <h3 className='text-sm font-semibold text-app-green mb-2 flex items-center gap-2'> <MapPinIcon className='size-5'/> Delivery Address</h3>
              <p className='text-sm text-app-text-light leading-relaxed'>{order?.shippingAddress.label}
                <br />
                {order?.shippingAddress.address}
                <br />
                {order?.shippingAddress.city}, {order?.shippingAddress.state},
                {order?.shippingAddress.zip}
              </p>
            </div>
            {/* Display Items */}
            <div className="bg-white rounded-2xl p-3">
              <h3 className='text-sm font-semibold text-app-green mb-2'>items ({order?.items.length})</h3>
              <div className="space-y-3">
              {order?.items.map((item,i)=>(
                <div className="flex items-center gap-2" key={i}>
                  <img src={item.image} alt={item.name} className='object-cover rounded-lg size-10' />
                  <div className="flex-1 min-w-0">
                    <p className='text-sm font-medium text-app-green truncate'>{item.name}</p>
                    <p className='text-base text-app-text-light'><span className='mr-1 text-lg'>x</span>{item.quantity}</p>
                  </div>
                  <span className='text-sm font-semibold'>{currency}{(item.price  * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              </div>
              <div className="mt-2 pt-2 border-t border-app-border space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className='text-app-text-light'>Subtotal</span>
                  <span className=''>{currency}{order?.subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className='text-app-text-light'>Delivery</span>
                  <span className=''>{order?.deliveryFee === 0? 'Free' : `${currency}${order?.deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className='text-app-text-light'>Tax</span>
                  <span className=''>{currency}{order?.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-app-border font-semibold text-app-green">
                  <span className=''>Total</span>
                  <span className=''>{currency}{order?.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        </div>
        </div>
  )
}

export default OrderTracking