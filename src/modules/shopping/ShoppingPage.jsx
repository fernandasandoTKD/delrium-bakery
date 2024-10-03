import { useState, useEffect } from 'react';
import BuyerForm from './FormDelivery';
import ProductCard from './productModule';  // Asegúrate de tener ProductCard correctamente importado
import axios from 'axios';  // Si prefieres fetch, puedes cambiar axios por fetch

const ShoppingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Función para obtener productos desde el backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3900/api/products/products');  // Cambia la URL si es necesario
        setProducts(response.data.data);  // Ajusta el formato según la estructura de respuesta del backend
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);  // El useEffect se ejecuta solo una vez al montar el componente

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3900/api/cart`, {
        data: { productId }
      });
      console.log('Producto eliminado:', response.data);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };
  
  return (
    <div className="container-fluid shopping">
      <div className="row cotenedor">
        <div className="col-9">
          <h2 className='ml-2 mt-4'>Tu Carrito</h2>
          <div className="d-flex flex-wrap">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard
                  key={product._id}  // Asegúrate de usar el ID correcto del producto desde tu backend
                  product={product}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p>No hay productos disponibles.</p>
            )}
          </div>
        </div>
        <div className="col-2 m-0">
          <div className="mt-5 pt-4 mr-0">
            <h2 className='mt-1'>Resumen de la Orden</h2>
            <BuyerForm className='mt-4 mr-2' />
            <h3>Total: {products.reduce((total, product) => total + product.price, 0)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;
