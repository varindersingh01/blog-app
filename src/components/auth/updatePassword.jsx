import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../store/authSlice/authSlice';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fshowPassword, fsetShowPassword] = useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {token}=useParams()
  
  const formik = useFormik({
    initialValues: {
      password: '',
      conformpassword: '',
    },
    validationSchema: Yup.object({
      
      password: Yup.string()
        .max(10, 'Must be 10 characters or less')
        .min(2, 'Must be 2 characters or less')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*\d)/,
          'Password must contain at least one lowercase letter, one uppercase letter, and one number'
        )
        .required('Required'),
      conformpassword: Yup.string()
        .max(10, 'Must be 10 characters or less')
        .min(2, 'Must be 2 characters or less')
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Password does not match'),
    }),
    onSubmit: values => {
      console.log("value",values);
      dispatch(updatePassword({values,token})).unwrap().then((response)=>{
        console.log("response",response);
        if(response.success===true){
          navigate("/")
        }
      })
    },
  });
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePassword2 = () => {
    fsetShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    
    <div className="card card-outline-secondary">
  <div className="card-header">
    <h3 className="mb-0">Change Password</h3>
  </div>
  <div className="updatecard-body ">
  <form onSubmit={formik.handleSubmit} style={{ width: "23rem" }}>
    
      <div className="form-group position-relative">
        <label htmlFor="inputPasswordNew">New Password</label>
        <input
         id="password"
         name="password"
         type={showPassword ? "text" : "password"}
         className="form-control form-control-lg "
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.password}
       />
        <button
                    className="btn btn-outline-black  position-absolute "
                    type="button"
                    onClick={handleTogglePassword}
                    style={{right:"12px", border:"none",bottom:"10px"}}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
       {formik.touched.password && formik.errors.password ? (
         <div className='text-danger'>{formik.errors.password}</div>
       ) : null}
      </div>
      <div className="form-group position-relative">
        <label htmlFor="inputPasswordNewVerify">Conform Password</label>
        <input
         id="conformpassword"
         name="conformpassword"
         type={fshowPassword ? "text" : "password"}
         className="form-control form-control-lg"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.conformpassword}
       />
        <button
                    className="btn btn-outline-black position-absolute "
                    type="button"
                    onClick={handleTogglePassword2}
                    style={{right:"12px", border:"none",bottom:"10px"}}
                  >
                    {fshowPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
       {formik.touched.conformpassword && formik.errors.conformpassword ? (
         <div className='text-danger'>{formik.errors.conformpassword}</div>
       ) : null}
       
      </div>
      <div className="pt-1 mb-4">
         
              <button className="btn btn-info btn-lg btn-block" type="submit">
                Update
              </button>
             
            </div>
    </form>
  </div>
</div>

  )
}

export default UpdatePassword
