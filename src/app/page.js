import ProductCard from '@/components/ProductCard'
import Sidebar from '@/components/Sidebar'
import Table from '@/components/products/Table'
import LoginForm from '@/components/forms/Login_forms'
import Product_Form from '@/components/products/Product_Form'
import Image from 'next/image'

export default function Home() {
  return (
    <main >
      {/* <div className="h-screen flex overflow-hidden bg-gray-100">
        
      </div> */}
      <LoginForm/>
    </main>
  )
}
