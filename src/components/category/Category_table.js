'use client'
import { get_category, get_single_category } from '@/lib/slice/category_slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalComponant from '../Modal'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Edit_Form from './Edit_Form'
const Category_table = () => {
    const [open, setopen] = useState(false)
    const dispatch = useDispatch()
    let columns = [
        "ID", "Name","Actions"
    ]
    let payload = { page: 1, limit: 10}
    const { category, single_category } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(get_category(payload))
    }, [])

 
    const fetch_single = (id) => {
        dispatch(get_single_category({ id }))
        setopen(true)
    }

    return (
        <>
            <div className="flex flex-col w-0 flex-1 overflow-hidden">

                <table className="table-auto border-collapse w-full">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            {columns && columns.map((it, index) => {
                                return <th key={index} className="px-4 py-2">{it}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {category && category.map((it, index) => {
                            return (
                                <tr key={index} className="bg-gray-200">
                                    <td className="border px-4 py-2">{it._id}</td>
                                    <td className="border px-4 py-2">{it.name}</td>
                                    
                                    <td className="border px-4 justify-between flex py-2">
                                        <FaEdit cursor="pointer" onClick={()=>fetch_single(it._id)} />
                                        <MdDelete cursor="pointer" />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <ModalComponant open={open} body={<Edit_Form/>} close={() => setopen(false)} />
        </>
    )
}

export default Category_table