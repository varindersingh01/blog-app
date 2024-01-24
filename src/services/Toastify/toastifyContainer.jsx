import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Popup = () => {
  // console.log("hgg");
  return (
    <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false} 
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />

  )
}


const Toastify=({success,msg})=>{
    if(success===true){
        toast.success(`🦄 ${msg}`, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }); 
    }else{
        toast.error(`🦄 ${msg}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }); 
    }
    
}
export {Toastify}
export default Popup
