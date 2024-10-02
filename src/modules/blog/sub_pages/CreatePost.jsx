import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


export const CreatePost = () => {
  

const modules ={
    toolbar: [
      [{'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

const formats =[
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

const POST_CATEGORIES = ["Nuestra Historia", "Panes del mundo", "Tortas Artesanales", "Arte en galletas"]
const [formData, setFormData] = useState({
  title: '',
  category: '',
  image: null,
  description:''
});

// Manejar los cambios en los campos
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

  // Manejar cambios en ReactQuill
const handleQuillChange = (value) => {
    setFormData({
      ...formData,
      description: value // Guardar el contenido del editor en el estado
    });
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setFormData({
    ...formData,
    image: file
  });


};
// Manejar el envío del formulario
const handleSubmit = (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto de recargar la página
  console.log('Datos enviados:', formData);
  // Aquí puedes enviar los datos a un servidor, o hacer cualquier otra acción
};
  return (
    <section className="create-post">
    <div className="container">
        <h2>Create Post</h2>
        <p className="form_error-message">
          
        </p>
    <form className="form create-post_form" onSubmit={handleSubmit}>
    
      <div>

        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <select id="category" name="category" value={formData.category} onChange={handleChange}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
      </select>

      
      
      <div>
        
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <ReactQuill id="description" name="description" modules ={modules} formats={formats} value={formData.description} onChange={handleQuillChange}/>
    </form>
   
    <button type="submit" onClick={handleSubmit} className='btn primary_01'>Create</button>
    </div>
    </section>
    
     )
    }
    
   
 
export default CreatePost