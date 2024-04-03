import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({children}) => {
  return (
    <>
    <div className="h-screen flex overflow-hidden bg-gray-100">
        <Sidebar/>
    {children}
      </div>
    </>
  )
}

export default layout