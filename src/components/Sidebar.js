import Link from 'next/link'
import React from 'react'
import ProductDropDown from './products/DropDown'
import CategoryDropDown from './category/Category_dropdown'

import Drawers from './Drawer'

const Sidebar = () => {
  return (
    <>  
             <div className="md:hidden">
              <Drawers Child={<Side_Child/>}/>
              </div>
              
              

          <Side_Child/>

             
        
    </>
  )
}

export default Sidebar

export const Side_Child=()=>{
    return(
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64 bg-white">
                <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <Link href="/admin_panel/dashboard" className="text-xl font-bold text-gray-800">
                            Next js Ecommerce
                        </Link>
                    </div>
                    <nav className="mt-5 flex-1 px-2 bg-white">
                        <ProductDropDown />

                        <CategoryDropDown />
                        <a
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out"
                        >
                            Services
                        </a>
                        <a
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out"
                        >
                            Contact
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}

