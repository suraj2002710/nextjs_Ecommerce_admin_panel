'use client'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import ProductDropDown from './products/DropDown'
import CategoryDropDown from './category/Category_dropdown'

const Drawers = ({child}) => {
   
    const [isOpen, setisOpent] = React.useState(false)

    return (
        <>
           
            <Button colorScheme='blue' onClick={()=>{
                setisOpent(!isOpen)
            }}>
                Open
            </Button>
            <Drawer placement={"left"} onClose={() => {
                setisOpent(!isOpen)
            }} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
                    <DrawerBody>
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
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Drawers