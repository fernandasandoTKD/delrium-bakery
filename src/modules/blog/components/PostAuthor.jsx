import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../images/avatar1.png'
import "../css/stylesblog.css"


const PostAuthor = () => {
  return (
    <Link to ={'/post/user/sfasd'} className='post_author'>
        <div className="post_author-avatar">
            <img className="image_avatar"src= {Avatar} alt="" />
        </div>
        <div className="post_author-details">
            <h5>By: Alberto Angel </h5>
            <small> Just Now </small>
        </div>
    
    </Link>
  )
}

export default PostAuthor