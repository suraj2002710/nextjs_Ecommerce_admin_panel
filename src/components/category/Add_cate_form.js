'use client'
import { categoryAction, create_category } from '@/lib/slice/category_slice';
import { Product_Action, create_product, get_category_list } from '@/lib/slice/product_slice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add_cate_form = () => {
    const [formData, setFormData] = useState({
        name: ''
    });

    const router = useRouter()

    const dispatch = useDispatch()
    const {  status } = useSelector(state => state.category)

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log(files);
       
            setFormData({ ...formData, [name]: value });
       
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        let { name} = formData
        if (!name ) {
            return toast.error("Category Name is Required")
        }
        let payload = { ...formData }
        dispatch(create_category(payload))
    };

    useEffect(() => {
        if (status === "create") {
            toast.success("Category Create Successfully")
            dispatch(categoryAction.status_blank())
            router.push('/admin_panel/category/view')
        }
    }, [status])


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
                        Submit
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Add_cate_form