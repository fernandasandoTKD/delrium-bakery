import React, { useState, useEffect} from 'react'
import PostItem from '../components/PostItem'
import "../css/stylesblog.css"
import axios from 'axios';
import { Global } from '../../../helpers/Global';

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${Global.url}post`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error al obtener Posts:', error);
      }
    };

    fetchPosts(); // Llamar a la función para obtener las clases al montar el componente
  }, []);

  return (
    
    <section className="posts"> 
      {posts.length > 0 ? <div className="container posts_container">
        {
            posts.map(({_id, thumbnail,category, title, description, creator , updatedAt })=> <PostItem  key={_id} postID={_id} thumbnail={thumbnail} category= {category} title ={title} description={description} authorID={creator} updatedAt={updatedAt} />)
        }
        
      </div> : <h2 className='center'> No posts founds </h2>}
    </section> 
    
  )
}

export default Posts