import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";

const ProductDropDown = ({ menuname, item }) => {
  return (
    <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out">

    <Menu isLazy >
      <MenuButton>Product</MenuButton>
  
      <MenuList>
        <MenuItem>
          <Link
            href="/admin_panel/product"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out"
          >
            View Products
          </Link>
        </MenuItem>
          <MenuItem> <IoMdAddCircleOutline className='animate-spin'/>
            <Link
              href="/admin_panel/product/product-add"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              Add Product
            </Link>
          </MenuItem>
        {/* <MenuDivider /> */}
        
      </MenuList>
    </Menu>
    </div>

  )
}

export default ProductDropDown