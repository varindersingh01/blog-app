import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getUserData } from '../../../store/dashboardSlice/dashboardSlice'
const selectUserData = (state) => state.dashboardSlice.userData;
const ProfileSetting = () => {
  const dispatch=useDispatch()
  const userData = useSelector(selectUserData);
  console.log("userData",userData);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    
    <section style={{ backgroundColor: "#eee" }}>
  <div className="container py-5">
    <div className="row">
      <div className="col">
        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
          <ol className="breadcrumb mb-0">
          <NavLink className="" to="/createblog">
               Create Blog
              </NavLink>
              <NavLink className="" to="/myblog">
               My Blog
              </NavLink>
            
          </ol>
        </nav>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
              alt="avatar"
              className="rounded-circle img-fluid"
              style={{ width: 150 }}
            />
           
          
          </div>
        </div>
       
      </div>
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="">
              <p className="mb-0">First Name: {userData?.firstName}</p>
              </div>
             
            <div className="row">
              <div className="">
              <p className="mb-0">First Name: {userData?.lastName}</p>
              </div>
              
            </div>
            <div className="row">
              <div className="">
              <p className="mb-0">Email: {userData?.email}</p>
              </div>
             
          
           
          
           
           
            
             </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</section>

  )
}

export default ProfileSetting
