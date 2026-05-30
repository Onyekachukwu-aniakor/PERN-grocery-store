
import type { Address } from '../types'
import { CheckIcon, MapPinIcon, PencilIcon, Trash2Icon } from 'lucide-react';

interface AddressCardProps{
   addr: Address;
   onEditHandler : (addr: Address)=> void;
   setAddresses : (addresses: Address[])=> void;

}

const AddressCard = ({addr, onEditHandler} : AddressCardProps) => {
    const handleDelete = async (id:string) =>{
        console.log(id);   
    }
  return (
    <div key={addr._id} className='max-w-3xl bg-white rounded-lg p-2 flex items-start justify-between'>
        {/* left */}
        <div className="flex gap-2">
            <div className="size-10 shrink-0 rounded-lg text-app-cream flex-center">
                <MapPinIcon className='size-8 text-app-green '/>
            </div>
            <div className="">
                <div className="flex items-center gap-2 mb-1">
                    <p className='text-app-green font-semibold text-sm'>{addr.label}</p>
                    {addr.isDefault && (
                        <span className='flex-center gap-1 px-2 py-0.5 text-[10px] font-mrdium bg-app-green text-white rounded-full'>
                            <CheckIcon className='size-5'/>Default
                        </span>
                    )}
                </div>
                <p className='text-sm text-app-text-light'>
                    {addr.address}, {addr.city}, <br /> {addr.state}, {addr.zip}
                    
                </p>
            </div>
        </div>
        {/* right - action button */}
        <div className="flex items-center gap-1">
            <button onClick={()=> onEditHandler(addr)}
            className='p-2 text-app-text-light hover:text-app-green hover:bg-app-cream rounded-lg transition-colors'><PencilIcon className='size-5'/></button>

            <button onClick={()=> handleDelete(addr._id)}
            className='p-2 text-app-text-light hover:text-app-error hover:bg-red-50 rounded-lg transition-colors'><Trash2Icon className='size-5'/></button>
        </div>
    </div>
  )
}

export default AddressCard