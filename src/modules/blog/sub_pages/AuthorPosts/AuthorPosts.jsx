import React, { useState } from 'react'
import { DUMMY_POSTS } from '../../data'
import PostItem from '../../components/PostItem/PostItem'

const AuthorPosts = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS)

  return (
    
    <section className="author__posts">
      {posts.length > 0 ? <div className="container author__posts-container">
        {
          posts.map(({id, thumbnail , category, title, desc, authorID})=> <PostItem key={id} postID={id} thumbnail={thumbnail} category= {category} title ={title} description={desc} authorID={authorID} />) 
        }
      </div> : <h2 className='center'> </h2> }

    </section>
  )
}

export default AuthorPosts
