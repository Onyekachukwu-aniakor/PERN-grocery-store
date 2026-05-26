import React, { useEffect, useState } from 'react'
import type { Address } from '../types'
import { dummyAddressData } from '../assets/assets';
import { MapPinIcon, PlusIcon } from 'lucide-react';
import Loading from '../components/Loading';
import AddressCard from '../components/AddressCard';
import AddressForm from '../components/AddressForm';

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm]= useState(false);
  const [editingId, setEditingId]= useState<string | null>(null)
  const [form, setForm]= useState({
    label:'',
    address: '',
    city: '',
    state: '',
    zip: '',
    isDefault : false
  });

  const resetForm = ()=>{
    setForm({ label:'', address: '', city: '', state: '', zip: '', isDefault : false });
    setShowForm(false);
    setEditingId(null)
  };

  const handleSubmit = async (e:React.SubmitEvent)=> {
    e.preventDefault();
    
  };

  const onEditHandler =(add: Address)=>{
    setForm({ label:add.label, address: add.address, city: add.city, state: add.state, zip: add.zip, isDefault : add.isDefault });
    setEditingId(add._id);
    setShowForm(true)
  };

  useEffect(()=>{
    setAddresses(dummyAddressData);
    setTimeout(()=>setLoading(false), 1000)
  },[])
  return (
    <div className='min-h-screen bg-app-cream'>
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-2">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className='text-lg font-medium text-app-green'>My Addresses</h1>
          <button onClick={()=>{resetForm();  setShowForm(true)}}
          className='px-2 py-2 bg-app-green text-white text-sm font-semibold rounded-xl hover:bg-app-green-light transition-colors flex items-center gap-2'>
            <PlusIcon className='size-5'/> Add Address
          </button>
        </div>
        {/* Form Modal */}
        {showForm && (
          <AddressForm resetForm={resetForm} handleSubmit={handleSubmit} editingId={editingId} form={form} setForm={setForm}/>
        )}
        {/* Address List */}
        {
          loading ? (
            <Loading />
          ) : addresses.length === 0 ? (
            <div className="text-center py-2">
              <MapPinIcon className='size-10 text-app-border mx-auto mb-2'/>
              <h2 className='text-lg text-app-green font-medium mb-1'>No addresses saved</h2>
              <p className='text-app-text-light text-sm'>Add an address for faster checkout</p>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr)=>(
                <AddressCard key={addr._id} setAddresses={setAddresses} addr={addr} onEditHandler={onEditHandler}/>
              ))}

            </div>
          )
        }
      </div>
      
      </div>
  )
}

export default Addresses