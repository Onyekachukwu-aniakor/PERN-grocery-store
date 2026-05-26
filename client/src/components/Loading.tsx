import { Loader2Icon } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex-center min-h-96 h-full w-full'>
        <Loader2Icon className='size-8 animate-spin text-green-900'/>
    </div>
  )
}

export default Loading