import Product_Form from '@/components/products/Product_Form'
import { cookies } from 'next/headers'
import React from 'react'

const page = () => {
    let token= cookies().get("token")?.value
  return (
    <>
          <Product_Form token={token }/>

    </>
  )
}

export default page