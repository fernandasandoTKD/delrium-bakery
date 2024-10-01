import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Global } from '../../../helpers/Global';

const ProductsModal = ({ show, handleClose, product, handleSave }) => {
  const token = localStorage.getItem("token");
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]); // Estado para las categorías

  useEffect(() => {
    // Cargar los datos del producto si existe
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
      setCategory(product.category || '');
    } else {
      // Limpia los campos si no hay producto
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      const productData = { name, description, price, category }; // Agrupamos los datos del producto

      if (product && product._id) {
        // Edición del producto
        response = await fetch(`${Global.url}products/update/${product._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(productData),
        });
      } else {
        // Creación de un nuevo producto
        response = await fetch(`${Global.url}/products/newproduct`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(productData),
        });
      }

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error al guardar el producto');
      }

      const data = await response.json();
      handleSave(data.data || data); // Asegúrate de pasar la data correcta
      handleClose(); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      // Aquí podrías agregar una notificación de error si lo deseas
    }
  };

  useEffect(() => {
    // Cargar las categorías al abrir el modal
    const fetchCategories = async () => {
      const response = await fetch(`${Global.url}categories/menu`);
      const data = await response.json();
      setCategories(data.data); // Cargar categorías en el estado
    };

    fetchCategories();
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product && product._id ? 'Editar Producto' : 'Crear Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="info" type="submit" className='mt-3'>
            {product && product._id ? 'Guardar cambios' : 'Crear producto'}
          </Button>
          <Button variant="danger" className='mt-3' onClick={handleClose}>
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductsModal;
