import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/authSlice/authSlice";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(()=>{
   if(token){
    navigate("/home")
   }
  },[token])
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(10, "Must be 10 characters or less")
        .min(2, "Must be 2 characters or less")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*\d)/,
          "Password must contain at least one lowercase letter, one uppercase letter, and one number"
        )
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(signIn(values))
        .unwrap()
        .then((response) => {
          if (response.success === true) {
             navigate("/home");
            localStorage.setItem("token",response.token)
          }
        });
    },
  });
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
    <section className="vh-50 gradient-custom">
      
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
      
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className="card bg-dark text-white"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password!
                </p>
                <div className="form-outline form-white mb-4">
                <input
                    id="email"
                    name="email"
                    type="typeEmailX"
                    className="form-control form-control-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                  <label className="form-label" htmlFor="typeEmailX">
                    Email
                  </label>
                </div>
                <div className="form-outline form-white mb-4 position-relative">
                <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <button
                    className="btn btn-outline-secondary position-absolute top-0 "
                    type="button"
                    onClick={handleTogglePassword}
                    style={{right:"12px", border:"none"}}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                  <label className="form-label" htmlFor="typePasswordX">
                    Password
                  </label>
                </div>
                <p className="small mb-2 pb-lg-2">
                  <NavLink className="text-white" to="/forget">
                    Forgot password?
                  </NavLink>
                </p>
                <button
                  className="btn btn-outline-light btn-lg"
                  type="submit"
                >
                  Login
                </button>
                
              </div>
              <p >
                  Don't have an account?{" "}
                  <NavLink to="/register" className="link-info">
                    Register here
                  </NavLink>
                </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
  </section>
 </form>
  );
};
export default Login;
