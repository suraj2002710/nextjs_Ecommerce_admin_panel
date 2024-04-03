import { Product_Action, delete_product, get_product } from '@/lib/slice/product_slice'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Delete_Body = ({id,token}) => {
    const query_serarch=new URLSearchParams(location.search)
   
    const {status,loading}=useSelector(state=>state.product)
    const dispatch=useDispatch()
    const handleSubbmit=()=>{
      console.log(id);
        dispatch(delete_product({ token, id }))
    }
    const router=useRouter()
    console.log("ididididididid",id)

    useEffect(() => {
        if (status ==="delete"){
    
            router.push(`/admin_panel/product?close=true`)
          dispatch(get_product({ token, page: 1, limit: 10 }))
            dispatch(Product_Action.status_blank())
        }
    }, [status])
    
  return (
    <div>
        <p>Are you Sure Delete This Product?</p>
         
          <Button onClick={handleSubbmit}>Delete</Button>
    </div>
  )
}

export default Delete_Body