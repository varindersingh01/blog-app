import { Suspense, lazy } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Navbaar = lazy(() => import("./components/header/navbaar"));
import { Navigate, Route, Routes } from "react-router-dom";
const Register =lazy(() => import( "./components/auth/register"));
const Login =lazy(() => import("./components/auth/login")) ;
const Home =lazy(()=> import("./components/dashboard/home"));
const Forgotpassword = lazy(() =>import('./Components/Auth/forgetPassword')) ;
const UpdatePassword =lazy(()=>import("./Components/Auth/updatePassword")) ;
const About =lazy(() => import("./components/dashboard/about")) ;
const Contact =lazy(() =>import("./components/dashboard/contact")) ;
const Popup =lazy(() => import("./services/Toastify/toastifyContainer")) ;
const ProfileSetting=lazy(()=>import("./components/dashboard/profile/profileSetting"))
const CreateBlog =lazy(()=>import("./components/dashboard/profile/createBlog"))
const Myblog =lazy(()=>import("./components/dashboard/profile/myBlog"))
import { useSelector } from "react-redux";
import RouteGuard from "./services/routeGuard/routeGuard";
import Commonloader from "./services/spinner/loader";
function App() {
  const authSelector=useSelector((state)=>state.AuthSlice)
  const popUpState=authSelector.popUp
  const Loading=authSelector.loading

  return (
    <Suspense Suspense fallback={<div className="text-danger text-center  ">...Loading</div>}>
      <Navbaar />
    {popUpState &&<Popup />}
    {Loading &&<Commonloader/>}
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forget' element={<Forgotpassword/>}/>
        <Route path="/updatePassword/:token" element={<UpdatePassword />} />

        <Route path="/about" element={ <RouteGuard Component={About} />} />
        <Route path="/contact" element={<RouteGuard Component={Contact} />} />
        <Route path="/home" element={<RouteGuard Component={Home} />} />
        <Route path="/profile" element={<RouteGuard Component={ProfileSetting} />} />
        <Route path="/createblog" element={<RouteGuard Component={CreateBlog} />} />
        <Route path="/myblog" element={<RouteGuard Component={Myblog} />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
