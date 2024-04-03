import Sidebar from '@/components/Sidebar'
import Table from '@/components/products/Table'
import React from 'react'
import  {cookies}  from "next/headers";
const product_page = () => {
let token=cookies().get("token")?.value
  

  return (
    <>
        <Table  token={token}/>
    </>
  )
}

export default product_page