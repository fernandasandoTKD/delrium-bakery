import React, {useEffect, useState} from 'react'
import PostAuthor from '../components/PostAuthor'
import Thumbnail from '../images/blog22.jpeg'
import useAuth from '../../../hooks/useAuth'
import { NavLink } from 'react-router-dom';
import { Global } from '../../../helpers/Global';
import axios from 'axios'; // Importar Axios
import { useParams } from 'react-router-dom';


export const PostDetail = () => {
  const { auth, logout } = useAuth();
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState([])
  
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(`${Global.url}post/${id}`);
        console.log(response.data)
        setPostDetail(response.data);
      } catch (error) {
        console.error('Error al obtener Posts:', error);
      }
    };

    fetchPostDetail(); // Llamar a la función para obtener las clases al montar el componente
  }, []);

  return (
    <section className= "post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor/>
            {(auth && auth.role == "admin") && 
              <div className="post-detail__buttons">
              <NavLink to={`/private/posts/werwer/edit`} className='btn sm primary'> Edit</NavLink>
              <NavLink to={`/private/posts/werwer/delete`} className='btn sm danger'> Delete</NavLink>
              </div> 
             
            }
        </div>
        <h1> {postDetail.title} </h1>
        <div className="post-detail__thumbnail">
          <img src={postDetail.thumbnail} alt="" />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postDetail.description}} />
    
      
      </div>
    </section>
  )
}

export default PostDetail