import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forGot } from "../../store/authSlice/authSlice";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

const Forgotpassword = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const token = localStorage.getItem("token");
  React.useEffect(()=>{
   if(token){
     navigate("/home")
   }
  },[token])
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      
      dispatch(forGot(values))
        .unwrap()
        .then((response) => {
          if (response.success === true) {
            // navigate("/updatePassword/:token");
          }
        });
    },
  });

  // console.log("erros ", formik.errors)
  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "23rem" }}>
    <div className="card text-center" style={{ width: 300 }}>
      <div className="card-header h5 text-white bg-primary">Password Reset</div>
      
      <div className="card-body px-5">
        <p className="card-text py-2">
          Enter your email address and we'll send you an email with instructions
          to reset your password.
        </p>
       
                <div className="form-outline">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            style={{border:formik.errors.email?"1px solid red":""}}
            className={`form-control form-control-lg`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        <div className="pt-1 mb-4">
          
            <button className="btn btn-info btn-lg btn-block" type="submit">
              Forgot password?
            </button>
        </div>
      </div>
    </div>
    </form>

  );
};

export default Forgotpassword;
