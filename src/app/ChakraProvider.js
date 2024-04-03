'use client'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

const ChakraProviders = ({children}) => {
  return (
    <ChakraProvider>
        {children}
    </ChakraProvider>
  )
}

export default ChakraProviders