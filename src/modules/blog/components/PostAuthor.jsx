import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../images/avatar1.png'
import "../css/stylesblog.css"
import axios from 'axios';
import { Global } from '../../../helpers/Global';

const PostAuthor = ({authorID , updatedAt}) => {
  const [Author, setAuthor] = useState([])

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`${Global.url}users/${authorID}`);
        
        setAuthor(response.data);
      } catch (error) {
        console.error('Error al obtener Posts:', error);
      }
    };

    fetchAuthor(); // Llamar a la función para obtener las clases al montar el componente
  }, []);

  return (
    <Link to ={'/post/user/sfasd'} className='post_author'>
        <div className="post_author-avatar">
            <img className="image_avatar"src= {Avatar} alt="" />
        </div>
        <div className="post_author-details">
            <h5>By: {Author.username} </h5>
            <small> {updatedAt} </small>
        </div>
    
    </Link>
  )
}

export default PostAuthor