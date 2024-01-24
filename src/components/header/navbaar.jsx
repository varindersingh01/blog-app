import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const settings = ['Profile',  'Logout'];


  const Navbaar = () => {
  const navigate=useNavigate();

  

  const token= localStorage.getItem("token")
  const changeColor = ({ isActive }) => {
    return {
      color: isActive ? "#dc3545" : "white",
      // background: isActive ? "" : "",
      padding: isActive ? "5px": "",
      textDecoration: isActive ? "": "none",
      
    }
  }

  const [anchorElUser, setAnchorElUser] = React.useState(null);

 
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

 

  const handleCloseUserMenu = (value) => {
   
  if(value==="Profile"){
    navigate("/profile")
    setAnchorElUser(null);
  } else if( value==="Logout"){
    localStorage.clear();
    navigate("/")
    setAnchorElUser(null);
  }
  setAnchorElUser(null);
  
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark py-2 border-bottom border-dark  ">
      <div className="container-fluid mx-auto position-relative text-center">
      <img
            src="https://cdn.pixabay.com/photo/2018/01/06/07/53/social-3064515_1280.jpg"
            alt="Logo"
            className="mr-3 rounded-circle" 
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
          <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse  " id="navbarSupportedContent">
          {token ? 
           <ul className="navbar-nav mx-auto mb-2 px-2 mb-lg-0 fw-bold ">
           <li className="nav-item mx-3">
             <NavLink to='/home' style={changeColor}>Home</NavLink>
           </li>
           <li className="nav-item mx-3">
             <NavLink to='/about' style={changeColor}>About Us</NavLink>
           </li>
           <li className="nav-item mx-3">
             <NavLink to='/contact' style={changeColor}>Contact Us</NavLink>
           </li>
           
         </ul>:""}
         
         {token&&     <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>  }
       
   
         
        </div>
      </div>
    </nav>

  )
}

export default Navbaar
