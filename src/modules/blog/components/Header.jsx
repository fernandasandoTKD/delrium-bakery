import React, { useState } from 'react'
import {Link} from "react-router-dom"
import Logo from '../../../assets/logo.png'
import  {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Header = () => {
  const { auth, logout } = useAuth();
  const [isNavshowing, setIsNavShowing] = useState (window.innerWidth > 800 ? true : false);
  
  const closeNavHandler = () => {
    if (window.innerWidth < 800 ) {
      setIsNavShowing (false) ;
    } else {
      setIsNavShowing (true)
    }
  }



  return (
    
    <nav>
      <div className="container nav__container">
      
      { 
        auth && auth.role == "admin" && isNavshowing && <ul className="nav__menu" >
         
         
          <li> <NavLink to= "/private/posts/create" onClick={closeNavHandler} className="btn category"> Create Post </NavLink></li>
        
          
          
        </ul>}

        <button className='nav__toggle-btn' onClick={()=> setIsNavShowing(!isNavshowing)}>
          {isNavshowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>

  )
}

export default Header