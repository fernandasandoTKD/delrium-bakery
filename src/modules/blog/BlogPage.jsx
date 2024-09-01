import React from 'react'
import Posts from './components/Posts/Posts'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import PostAuthor from './components/PostAuthor/PostAuthor'
import PostItem from './components/PostItem/PostItem'

export const BlogPage = () => {
  return (
    <div>
      <Header />
      < Posts />  
      <PostAuthor />
      <PostItem />
      <Footer />

    </div>
  )
}

 

