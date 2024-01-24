import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/http/baseUrl";
import { Toastify } from "../../services/Toastify/toastifyContainer";

export const signUp = createAsyncThunk("/authSlice/signUp", async (data) => {
  try {
    const response = await http.post("/users/register", {
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      password: data.password,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
     return error.response.data;
  }
});
export const signIn = createAsyncThunk("/authSlice/signIn", async (data) => {
  try {
    const response = await http.post("/users/login", {
      email: data.email,
      password: data.password,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
     return error.response.data;
  }
});
export const forGot = createAsyncThunk("/authSlice/forGot", async (data) => {
  try {
    const response = await http.post("/users/forgotPassword", {
      email: data.email,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
     return error.response.data;
  }
});
export const updatePassword = createAsyncThunk("/authSlice/updatePassword", async (data) => {
  console.log("tok",data);
  const token =data.token
  try {
    const response = await http.put(`/users/updatePassword/${token}`, {
      password: data.values.password,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
     return error.response.data;
  }
});


const AuthSlice = createSlice({
  name: "authSlice",
  initialState: {
    loading: false,
    popUp:false,

  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        //  console.log("action-si", action);
        if (action.payload.success === true) {
          Toastify({ success: true, msg: action.payload.message });
        } else {
          Toastify({ success: false, msg: action.payload.message });
        }
        state.loading = false;
        state.popUp=true
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log("action--reject",action);
        state.loading = false;
      })
      // login
      .addCase(signIn.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          Toastify({ success: true, msg: action.payload.message });
        } else {
          Toastify({ success: false, msg: action.payload.message });
        }
        state.loading = false;
        state.popUp=true
      })
      .addCase(signIn.rejected, (state, action) => {
        console.log("action--reject",action);
        state.loading = false;
      })

        // forget
        .addCase(forGot.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(forGot.fulfilled, (state, action) => {
          if (action.payload.success === true) {
            Toastify({ success: true, msg: action.payload.message });
          } else {
            Toastify({ success: false, msg: action.payload.message });
          }
          state.loading = false;
          state.popUp=true
        })
        .addCase(forGot.rejected, (state, action) => {
          // console.log("action--reject",action);
          state.loading = false;
        })
              // update
              .addCase(updatePassword.pending, (state, action) => {
                state.loading = true;
              })
              .addCase(updatePassword.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                  Toastify({ success: true, msg: action.payload.message });
                } else {
                  Toastify({ success: false, msg: action.payload.message });
                }
                state.loading = false;
                state.popUp=true
              })
              .addCase(updatePassword.rejected, (state, action) => {
                console.log("action--reject",action);
                state.loading = false;
              })


  },
});
export default AuthSlice.reducer;
