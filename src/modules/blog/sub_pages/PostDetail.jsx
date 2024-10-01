import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail from '../images/blog22.jpeg'
import useAuth from '../../../hooks/useAuth'

export const PostDetail = () => {
  const { auth, logout } = useAuth();
  console.log("pruebaadmi", auth)
  return (
    <section className= "post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor/>
            {(auth && auth.role == "admin") && 
              <div className="post-detail__buttons">
              <Link to={`/posts/werwer/edit`} className='btn sm primary'> Edit</Link>
              <Link to={`/posts/werwer/delete`} className='btn sm danger'> Delete</Link>
              </div> 
            }
         

        </div>
        <h1> El pan de chocolate es funcional? </h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum qui modi perferendis consequatur nam magni eos harum libero minus amet inventore at dolores aliquam debitis, eveniet voluptatum, sapiente consequuntur rem excepturi commodi, quam corporis repudiandae labore. Odit eaque magnam eveniet!
        </p>
        <p> 
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia hic laborum veritatis velit inventore corporis delectus provident dolores vero explicabo minima neque mollitia sit expedita, earum ad! Dolore excepturi unde eaque nulla neque ut aliquam provident vel quisquam, beatae quos recusandae facere harum placeat ratione dolorum tenetur similique ipsam! Voluptate beatae velit aliquam repellendus temporibus.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, ratione? Perferendis totam facilis, quidem enim provident neque animi ullam nostrum recusandae doloremque placeat exercitationem! Dolorum qui accusantium nemo neque illo, inventore quam iure animi autem enim doloremque consectetur nisi, sequi non nam tempore necessitatibus. Accusantium vel eos quos quam, aut, dolorem eum inventore ad aliquid odit consequatur. Deleniti minima accusantium delectus. Modi minima fuga deserunt quo obcaecati inventore quibusdam! Neque quo iste eum vero reprehenderit beatae tempore, minus cum eius, magni quas in culpa veritatis consequuntur? Nesciunt illum animi provident soluta distinctio cupiditate consequatur ut quia, rerum praesentium voluptates porro officia repellendus temporibus reprehenderit vero consectetur exercitationem non. Totam, placeat illo.
        </p>
      ||<p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet recusandae porro ipsa. Omnis, ullam delectus dolore possimus ipsam quo voluptates enim incidunt minima illo tempora quis sit, nam aliquid eos obcaecati. Nobis beatae officia debitis dolore dignissimos, similique quo molestiae, totam alias magni deserunt aliquid nostrum porro impedit eveniet harum unde veniam accusantium doloribus veritatis explicabo voluptate ullam error. Quidem rerum laborum quibusdam aliquid, molestiae reiciendis vitae magni atque amet? Voluptatum, a explicabo laudantium fuga eum dolorem quam ut velit consequuntur earum unde magnam hic error minus porro animi nam incidunt tempora ad esse ipsum, voluptate magni non. Sint consequuntur dolorum similique non molestiae et tempora dicta culpa velit, perspiciatis mollitia autem excepturi harum itaque rerum laborum beatae quo consequatur aperiam dolore blanditiis vero eligendi repellat. Id, unde aut? Accusamus doloremque iusto vero autem fuga dolor voluptatibus hic quidem molestiae excepturi repudiandae in sapiente neque, pariatur earum architecto porro nihil. Autem consectetur accusantium quas animi vero consequuntur ipsum ipsa magni iusto inventore doloribus eos commodi nulla omnis magnam soluta, minus sit debitis dolores sint beatae fugit dolorem facilis. Voluptatum nesciunt consectetur, explicabo rem fugit cum optio quod odio consequuntur nostrum, in porro. A officiis quaerat ipsa perspiciatis cupiditate, doloribus dolor.
        </p>
      ||
      </div>
    </section>
  )
}

export default PostDetail