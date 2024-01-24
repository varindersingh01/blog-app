import {configureStore} from "@reduxjs/toolkit"
import AuthSlice from "./authSlice/authSlice"
import dashboardSlice from "./dashboardSlice/dashboardSlice"


const Store=configureStore({
   reducer:{
     AuthSlice,
     dashboardSlice
   }
})

export default Store