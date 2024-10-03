import React, {useEffect, useState} from 'react'
import PostAuthor from '../components/PostAuthor'
import Thumbnail from '../images/blog22.jpeg'
import useAuth from '../../../hooks/useAuth'
import { NavLink } from 'react-router-dom';
import { Global } from '../../../helpers/Global';
import axios from 'axios'; // Importar Axios
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const PostDetail = () => {
  const { auth, logout } = useAuth();
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(`${Global.url}post/${id}`);
        
        setPostDetail(response.data);
      } catch (error) {
        console.error('Error al obtener Posts:', error);
      }
    };

    fetchPostDetail(); // Llamar a la función para obtener las clases al montar el componente
  }, []);
    
    
  const handleDelete = async () => {

    const confirm = await Swal.fire({
      title: '¿Estás seguro de eliminar este Post?',
      text: "Recuerda que no podrás recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    if (!confirm.isConfirmed) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${Global.url}post/${id}`, {
        headers: {
        'Authorization': `Bearer ${token}`,
      },});
      navigate('/blog');
      
  } catch (error) {
    console.error('Error al obtener Posts:', error);
  }
  }
 
  return (
    <section className= "post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          {postDetail && <PostAuthor authorID={postDetail.creator} updatedAt={postDetail?.updatedAt}/>}
            {(auth && auth.role == "admin") && 
              <div className="post-detail__buttons">
              <NavLink to={`/private/posts/${id}/edit`} className='btn sm primary'> Edit</NavLink>
              <Button className='btn sm danger' onClick={() => handleDelete()}>
                Delete
              </Button>
              </div> 
             
            }
        </div>
        <h1> {postDetail?.title} </h1>
        <div className="post-detail__thumbnail">
        <img className='post__image' src={`${Global.BASE_URL}/uploads/${postDetail?.thumbnail}`} alt= {postDetail?.title}/>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postDetail?.description}} />
    
      
      </div>
    </section>
  )
}

export default PostDetail