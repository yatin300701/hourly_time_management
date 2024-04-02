import Navbar from '@/components/Navbar/Navbar'
import React, { Children } from 'react'

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='flex'>

      <div className='w-1/6'>
          <Navbar/>
      </div>  
      <div className='w-5/6' >
          {children}
      </div>  
    
   
    </div>
  )
   
}
