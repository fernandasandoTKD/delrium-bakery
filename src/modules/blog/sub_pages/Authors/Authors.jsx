import React, { useState } from 'react'
import Avatar1 from '../../images/avatar1.jpg'
import Avatar2 from '../../images/avatar2.png'
import Avatar3 from '../../images/avatar3.png'
import Avatar4 from '../../images/avatar4.png'
import { Link } from 'react-router-dom'
import './authors.css'


const authorsData = [
  {id: 1, avatar: Avatar1, name: 'Alberto Angel', posts:3},
  {id: 2, avatar: Avatar2, name: 'Pedro Angel', posts:1},
  {id: 3, avatar: Avatar3, name: 'Pablo Angel', posts:1},
  {id: 4, avatar: Avatar4, name: 'Viviana Angel', posts:1}
]

export const Authors = () => {
  const [authors, setAuthors] = useState (authorsData)

  return (
    <section className="authors">
      {authors.length > 0 ? <div className="container authors_container">
        {
          authors.map(({id, avatar, name, posts}) => {
            return <Link key={id} to={`/posts/users/${id}`} className='author'>
              <div className="author_avatar">
                <img className="image_avatar"src={avatar} alt={`Image of ${name}`} />
              </div>
              <div className="author_info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          })
        }
      </div> : <h2 className='center'>No users/authors found.</h2>}
    </section>
  )

}

export default Authors