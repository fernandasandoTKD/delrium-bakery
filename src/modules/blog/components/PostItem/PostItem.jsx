import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from '../PostAuthor/PostAuthor'
import "./postitem.css"

const PostItem = ({postID, category, title, description, authorID, thumbnail}) => {
    const shortDescription = description.length > 145 ? description.substr (0, 145) + '...' : description;
    const postTitle = title.length > 30 ? title.substr (0, 30) + '...' : title;
  return (
    <article className="post">
        <div className='post__thumbnail'>
            <img className='post__image' src={thumbnail} alt= {title}/>
        </div>
        <div className="post__content">
           <Link to={`/posts/${postID}`}> 
                <h3> {postTitle}</h3>
           </Link> 
           <p> {shortDescription}</p>
           <div className="post_footer">
                <PostAuthor />
                <Link to={`/posts/categories/${category}`}  className = 'btn category'> {category}</Link>
           </div>
        </div>
    </article>
    
  )
}

export default PostItem