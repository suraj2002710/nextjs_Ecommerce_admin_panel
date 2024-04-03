import { Product_Action, get_category_list, get_product, get_single_product, update_product } from '@/lib/slice/product_slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiLoaderCircle } from "react-icons/bi";
import Image from 'next/image'
import { baseurl } from '../../../ApisEndpoint';
import { useRouter } from 'next/navigation';

const Edit_form = ({open,token}) => {
    console.log("open", open);
    const { single_product, category_list,loading,status } = useSelector(state => state.product)
    const router=useRouter()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        id:"",
        name: '',
        description: '',
        price: '',
        categorys: '',
        stock: '',
        discount: '',
        delivery_charge: '',
        image: null,
    });


    const [imgpreview, setimgpreview]=useState([])

    useEffect(() => {
        if (single_product) {
            setFormData({
                id: single_product._id,
                name: single_product.name,
                description: single_product.description,
                price: single_product.price,
                categorys: single_product.categorys,
                stock: single_product.stock,
                discount: single_product.discount,
                delivery_charge: single_product.delivery_charge,
            })
            setimgpreview(single_product.image)
        }else{
            setFormData({
                name: "",
                description: "",
                price: "",
                categorys: "",
                stock: "",
                discount: "",
                delivery_charge: "",
            })
        }
    }, [single_product])
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log(files);
        if (name === 'image') {
            let imgarr = Object.values(files).map((it)=>{
                return URL.createObjectURL(it)
            })
            setimgpreview(imgarr)
            console.log("imgarr", imgarr);
            setFormData({ ...formData, [name]: files });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    useEffect(() => {
        dispatch(get_category_list({ token }))
    }, [])

    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(formData)
        let obj={...formData,token}
        dispatch(update_product(obj))
    }

    useEffect(()=>{
        if (status=="edit"){
            router.push(`/admin_panel/product?close=true`)
            dispatch(get_product({token,page:1,limit:10}))
            dispatch(Product_Action.status_blank())
        }
    },[status])

    return (
        <>
            
            <div className="max-w-full mx-auto my-10">
                {loading === "single-product" ? <div className='flex justify-center'>

                    <BiLoaderCircle className='justify-center animate-spin' size={40} />
                </div>
:
                    <form onSubmit={handleSubmit} className="bg-white w-full shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className='flex py-10 gap-3'>

                    
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                Product Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                            />
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
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                            />
                        </div>

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
                                {category_list && category_list.map((it) => {
                                    return (
                                        <option selected={formData.categorys === it._id ? "selected" : ""} value={it._id}>{it.name}</option>
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
                                value={formData.stock}
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
                                value={formData.discount}
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
                                value={formData.delivery_charge}
                                onChange={handleChange}
                                placeholder="Enter Delivery Charges"
                            />
                        </div>

                        {/* Add similar code for other form fields */}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Description
                            </label>
                            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" cols="30" rows="5" name="description"
                                value={formData.description}
                                onChange={handleChange}>

                            </textarea>

                        </div>

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
                        {imgpreview.length && imgpreview.map((it)=>{
                            console.log(!it.includes("blob") ?baseurl + "/" + it:it, "baseurl + " /" + it");
                            return (<Image className="rounded-full h-16 w-16 flex bg-teal-400 m-2" width={100} height={100} src={!it.includes("blob") ? baseurl + "/" + it:it} />)
                        })}
             

                        </div>
                      
                           
                            
                    
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                {loading == "edit-product" ? <BiLoaderCircle className='justify-center animate-spin' size={40} />
                                :"Submit"
                                }
                            </button>
                        </div>
                    </form>
 }
                {/* <BiLoaderCircle size={40} /> */}
               
                <ToastContainer />
            </div>
        </>
    )
}

export default Edit_form