'use client'
import { categoryAction, create_category, get_category, update_category } from '@/lib/slice/category_slice';
import { Product_Action, create_product, get_category_list } from '@/lib/slice/product_slice';
import { useRouter } from 'next/navigation';
import { BiLoaderCircle } from "react-icons/bi";

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit_Form = () => {
    const [formData, setFormData] = useState({
        name: ''
    });

    const router = useRouter()

    const dispatch = useDispatch()
    const { status, single_category,loading } = useSelector(state => state.category)

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log(files);

        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        let { name } = formData
        if (!name) {
            return toast.error("Category Name is Required")
        }
        let payload = { ...formData }
        dispatch(update_category(payload))
    };

    useEffect(() => {
        if (status == "edit") {
            router.push(`/admin_panel/category?close=true`)
            dispatch(get_category({ page: 1, limit: 10 }))
            dispatch(categoryAction.status_blank())
            dispatch(categoryAction.single_category_blank())
        }
    }, [status])

    useEffect(() => {
        if (single_category) {
            setFormData({
                id: single_category._id,
                name: single_category.name,

            })

        } else {
            setFormData({
                name: "",
            })
        }
    }, [single_category])


    return (
        <div className="max-w-xl mx-auto my-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        Product Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter your first name"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {loading == "edit" ? <BiLoaderCircle className='justify-center animate-spin' size={40} />
                            : "Submit"
                        }
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Edit_Form