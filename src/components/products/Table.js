"use client"
import { get_product, get_single_product } from '@/lib/slice/product_slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baseurl } from '../../../ApisEndpoint'
import Image from 'next/image'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalComponant from '../Modal'
import Product_Form from './Product_Form'
import Edit_form from './Edit_form'
import Delete_Body from './Delete_Body'
import { useRouter } from 'next/navigation'

const Table = ({ token }) => {
    const [open, setopen] = useState(false)
    const [deleteopen, setdeleteopen] = useState(false)
    const [id,setid]=useState("")
    const router=useRouter()
    let columns = [
        "ID", "Name", "Price", "Image", "Stocks", "Discount", "Actions"
    ]
    let payload = { token,page:1,limit:10,from:"",end:"",rating:"" }
    const { product } = useSelector(state => state.product)

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(get_product(payload))
    }, [])

    const fetch_single=(id)=>{
        dispatch(get_single_product({id,token}))
        setopen(true)
    }

    return (
        <>
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
               
                <table className="table-auto border-collapse w-full">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            {columns && columns?.map((it, index) => {
                                return <th key={index} className="px-4 py-2">{it}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {product?.length && product?.map((it, index) => {
                            return (
                                <tr key={index} className="bg-gray-200">
                                    <td className="border px-4 py-2">{it._id}</td>
                                    <td className="border px-4 py-2">{it.name}</td>
                                    <td className="border px-4 py-2">{it.price}</td>
                                    <td className="border px-4 py-2">
                                        <Image src={baseurl + "/" + it.image[0]} width={100} height={100} />
                                    </td>
                                    <td className="border px-4 py-2">{it.stock}</td>
                                    <td className="border px-4 py-2">{it.discount}</td>
                                    <td className="border px-4 justify-between flex py-2">
                                        <FaEdit cursor="pointer" onClick={() => {
                                            
                                            fetch_single(it._id)
                                            }} />
                                        <MdDelete cursor="pointer" onClick={()=>{
                                            setid(it._id)
                                            setdeleteopen(true)
                                        }}/>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {/* Edit Modal */}
            <ModalComponant open={open} body={<Edit_form open={open} token={token}/>} close={()=>setopen(false)}/>
            {/* Delete Modal */}
            <ModalComponant open={deleteopen} body={<Delete_Body token={token} id={id}/>} close={() => setdeleteopen(false)} />
        </>
    )
}

export default Table