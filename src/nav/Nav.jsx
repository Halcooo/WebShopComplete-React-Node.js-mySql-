import React, { useEffect, useState } from 'react'
import './Nav.scss'
import logo from '../images/185008.png';
import { Link } from "react-router-dom";
import { FaBox, FaCartArrowDown, FaCog, FaFilePowerpoint } from 'react-icons/fa';
import { RiShutDownLine } from 'react-icons/ri'
import { ImProfile, ImEnter } from 'react-icons/im'
const Nav = () => {
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));


  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('loggedUser')));
  }, []);


  useEffect(() => {
    isLogged();
    isAdmin();
  }, [loggedUser,]);


  const isLogged = () => {
    if (loggedUser) return true;
    else return false;
  }
  const isAdmin = () => {
    if (isLogged() && loggedUser.role === "ADMIN_ROLE") return true;
    else return false;
  }



  const logOut = () => {
    if (loggedUser !== {}) {
      localStorage.removeItem('loggedUser');
      localStorage.removeItem('products');
      setLoggedUser({});
    }
    window.location.reload();
  }

  return (


    <nav className="navbar">
      <div className="nav-logo">Rapid Comp  <img src={logo} alt="" /></div>
      <ul className="nav-links">
        <div className="menu">
          <li><Link to="/products"><FaBox className='mb-1'></FaBox> Products</Link></li>
          <li><Link to="/cart"><FaCartArrowDown className='mb-1'></FaCartArrowDown>  Cart</Link></li>
          {isAdmin() && <li> <Link to="/admin-panel"><FaCog className='mb-1'></FaCog>  Admin panel</Link></li>}
          {isLogged() && <li><Link to="/Profile"> <ImProfile className='mb-1'></ImProfile> Profile</Link></li>}
          {isLogged() && <li onClick={logOut}><RiShutDownLine className='mb-1'></RiShutDownLine> Logout</li>}
          {!isLogged() && <li> <Link to="/login"><ImEnter className='mb-1'></ImEnter> Login</Link></li>}
        </div>
      </ul>
    </nav>
  )
}

export default Nav