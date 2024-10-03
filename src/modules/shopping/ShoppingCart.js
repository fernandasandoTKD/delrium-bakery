import React, { useEffect, useState } from 'react';
import ProductCard from './ShoppingCart';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart'); // Cambia la URL según tu ruta de API
        if (!response.ok) {
          throw new Error('Error al obtener el carrito');
        }
        const data = await response.json();
        setCart(data.products); // Asegúrate de que 'products' esté en la respuesta
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="row">
      {cart.map((product) => (
        <ProductCard key={product.productId} product={product.productId} /> // Asegúrate de pasar el objeto correcto
      ))}
    </div>
  );
};

export default ShoppingCart;
