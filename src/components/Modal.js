'use client'

import { categoryAction } from "@/lib/slice/category_slice";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,ModalOverlay } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


export default function ModalComponant({open,body,close}) {
  const [size, setSize] = useState(null);
  const query= useSearchParams()
  const dispatch=useDispatch()
  const router=useRouter()
  const handleOpen = (value) => setSize(value);

  console.log("query.get(close)", query.get("close"));
  useEffect(()=>{
    if (query.get("close")=="true"){
      close()
      router.push(`/admin_panel/product`)
    }
  },[query.get("close")])

  const state_blank=()=>{
    dispatch(categoryAction.single_category_blank())
  }

  return (
    <>
      
      <Modal onClose={()=>{
        close()
        
        router.push(location.href)
        
        state_blank()
        
        
      }} size={"xl"} isOpen={open}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {body}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => {
              close()
              state_blank()
              router.push(location.href)
            }}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
