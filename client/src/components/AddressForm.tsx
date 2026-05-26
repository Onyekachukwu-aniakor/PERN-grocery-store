import { XIcon } from 'lucide-react'
import React from 'react'



const AddressForm = ({resetForm, form, handleSubmit,setForm, editingId}: any) => {
  return (
    <>
    {/* overlay */}
    <div 
    className="fixed inset-0 bg-black/40 z-50"/>
    {/* Form Container */}
    <div onClick={resetForm}
    className="fixed  inset-0 items-center p-2  z-50">
        <form onClick={(e)=>e.stopPropagation()}
        onSubmit={handleSubmit} className='bg-white rounded-2xl p-5 w-full max-w-lg animate-fade-in  mx-auto my-30'>
            {/* Form header */}
            <div className="flex items-center justify-between mb-2">
                <h2 className='text-lg font-medium text-app-green'>{editingId ? 'Edit Address' : 'Add New Address'}</h2>
                <button onClick={resetForm}
                 type='button' className='p-2 rounded-lg hover:text-app-cream'>
                    <XIcon className='size-5'/>
                </button>
            </div>
            {/* Form input field */}
            <div className="space-y-4 ">
                <div className="">
                    <label className='text-sm font-medium block text-app-green mb-1'>Label</label>
                    <input type="text" required placeholder='Home, work etc' 
                    className='w-full px-3 py-2 text-sm rounded-xl border border-app-border  focus:border-app-green outline-none' value={form.label} 
                    onChange={(e)=>setForm({...form, label: e.target.value})}/>
                </div>
                <div className="">
                    <label className='text-sm font-medium block text-app-green mb-1'>Street Address</label>
                    <input type="text" required 
                    className='w-full px-3 py-2 text-sm rounded-xl border border-app-border  focus:border-app-green outline-none' value={form.Address} 
                    onChange={(e)=>setForm({...form, address: e.target.value})}/>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="">
                    <label className='text-sm font-medium block text-app-green mb-1'>City</label>
                    <input type="text" required 
                    className='w-full px-3 py-2 text-sm rounded-xl border border-app-border  focus:border-app-green outline-none' value={form.city} 
                    onChange={(e)=>setForm({...form, city: e.target.value})}/>
                </div>
                    <div className="">
                    <label className='text-sm font-medium block text-app-green mb-1'>State</label>
                    <input type="text" required 
                    className='w-full px-3 py-2 text-sm rounded-xl border border-app-border  focus:border-app-green outline-none' value={form.state} 
                    onChange={(e)=>setForm({...form, state: e.target.value})}/>
                </div>

                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="">
                    <label className='text-sm font-medium block text-app-green mb-1'>ZIP Code</label>
                    <input type="text" required 
                    className='w-full px-3 py-2 text-sm rounded-xl border border-app-border  focus:border-app-green outline-none' value={form.zip} 
                    onChange={(e)=>setForm({...form, zip: e.target.value})}/>
                </div>
                    <div className="flex items-end pb-1">
                    <label className='text-sm font-medium block text-app-green '>
                        <input type="checkbox" checked={form.isDefault} 
                        onChange={(e)=> setForm({...form, isDefault: e.target.checked})}/>
                        <span className='text-sm text-app-text pl-2 text-center'>Set as default</span></label>
                    
                </div>

                </div>


            </div>
            {/* Submit button */}
            <button type='submit' className='w-full mt-3 py-2 bg-app-green text-white font-semibold rounded-xl hover:bg-app-green-light transition-colors'>
                {editingId ? 'Update Address' : 'Save Address'}
            </button>

        </form>
    </div>
    </>
  )
}

export default AddressForm