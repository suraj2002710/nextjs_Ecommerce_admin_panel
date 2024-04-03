'use client'
import { Product_Action, create_product, get_category_list } from '@/lib/slice/product_slice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Product_Form = ({ token }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categorys: '',
        stock: '',
        discount: '',
        delivery_charge : '',
        image: null,
    });

    const router=useRouter()


    const dispatch=useDispatch()
    const { category_list, status }=useSelector(state=>state.product)

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log(files);
        if (name === 'image') {

            setFormData({ ...formData, [name]: files });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        let {name,description,delivery_charge,image,discount,stock}=formData
        if (!name || !description || !delivery_charge || !image || !discount || !stock){
           return toast.error("All fields are required (name,description,delivery_charge,image,discount,stock)")
        }
        let payload={...formData,token}
        dispatch(create_product(payload))
    };

    useEffect(()=>{
        if (status ==="create"){
            toast.success("Product Create Successfully")
            dispatch(Product_Action.status_blank())
            router.push('/admin_panel/product')
        }
    },[status])

    useEffect(()=>{
        dispatch(get_category_list({ token }))
    },[])
    console.log(category_list,"category_list");
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First Description
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" cols="30" rows="5" name="description"

                        onChange={handleChange}>

                    </textarea>
                   
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First Price
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="number"
                        name="price"
                        
                        onChange={handleChange}
                        placeholder="Enter your first name"
                    />
                </div>
             
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        name="categorys"
                        onChange={handleChange}
                    >
                        <option value="">Select a category</option>
                        {category_list && category_list.map((it)=>{
                            return(
                                <option value={it._id}>{it.name}</option>
                            )
                        })}
                        {/* <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option> */}
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        Stock
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="number"
                        name="stock"
                        
                        onChange={handleChange}
                        placeholder="Enter Stock"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        Discount
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="number"
                        name="discount"
                        onChange={handleChange}
                        placeholder="Enter Discount"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        Delivery Charges
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="number"
                        name="delivery_charge"
                        
                        onChange={handleChange}
                        placeholder="Enter Delivery Charges"
                    />
                </div>
               
                {/* Add similar code for other form fields */}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                        Upload File
                    </label>
                    <input multiple
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="file"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
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

export default Product_Form