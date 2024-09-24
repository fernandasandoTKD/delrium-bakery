import React, { useState } from 'react'
import {Link} from "react-router-dom"
import Logo from '../../../assets/logo.png'
import  {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"



const Header = () => {
  
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
      {isNavshowing && <ul className="nav__menu">
          <li> <Link to= "/profile/sdfsdf" onClick={closeNavHandler}> Profile </Link></li>
          <li> <Link to= "/create" onClick={closeNavHandler}> Create Post </Link></li>
          <li> <Link to= "/authors" onClick={closeNavHandler}> Authors </Link></li>
          <li> <Link to= "/logout" onClick={closeNavHandler}> Logout </Link></li>
          
        </ul>}

        <button className='nav__toggle-btn' onClick={()=> setIsNavShowing(!isNavshowing)}>
          {isNavshowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>

  )
}

export default Header