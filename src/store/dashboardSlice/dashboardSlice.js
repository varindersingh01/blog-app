import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/http/baseUrl";
import { Toastify } from "../../services/Toastify/toastifyContainer";

export const getUserData = createAsyncThunk("/authSlice/getUserData", async (data) => {
  try {
    const response = await http.get("/users/getUser");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
     return error.response.data;
  }
});




const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    loading: false,
    popUp:false,
    userData:null

  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData=action.payload.data
      })
      .addCase(getUserData.rejected, (state, action) => {
        console.log("action--reject",action);
        state.loading = false;
      })
      

  },
});
export default dashboardSlice.reducer;
