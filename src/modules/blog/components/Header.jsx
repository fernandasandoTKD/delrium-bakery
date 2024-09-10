import React, { useState } from 'react'
import {Link} from "react-router-dom"
import Logo from '../../../assets/logo.png'
import { FaBars } from "react-icons/fa6"
import {AiOutlineClose} from "react-icons/ai"
import '../css/stylesblog.css'


const Header = () => {
  const [isNavshowing, setIsNavShowing] = useState (window.innerWidth > 800 ? true : false)
  
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
      
        <ul className="nav__menu">
          <li> <Link to= "/profile/sdfsdf"> Alberto Angel </Link></li>
          <li> <Link to= "/create"> Create Post </Link></li>
          <li> <Link to= "/authors"> Authors </Link></li>
          <li> <Link to= "/logout"> Logout </Link></li>
          
        </ul>

        <button className='nav__toggle-btn' onClick={()=> setIsNavShowing(!isNavshowing)}>
          {isNavshowing ? <AiOutlineClose /> : <faBars />}
        </button>
      </div>
    </nav>

  )
}

export default Header