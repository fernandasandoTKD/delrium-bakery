import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer>
      <ul className="footer_categories">
          <li><Link to="/posts/categories/Nuestra Historia"> Historia</Link></li>
          <li><Link to="/posts/categories/Panes del mundo"> Panes del mundo</Link></li>
          <li><Link to="/posts/categories/Artesanal"> Tortas Artesanales </Link></li>
          <li><Link to="/posts/categories/Arte en galletas">Arte en galletas</Link></li>
      </ul>
    
    </footer>
  )
}

export default Footer