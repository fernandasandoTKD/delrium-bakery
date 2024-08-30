import Producto1 from '../../assets/ProductsPics/Porducto1.jpg';
import Producto2 from '../../assets/ProductsPics/Producto2.jpg';
import Producto3 from '../../assets/ProductsPics/Producto3.jpg';
import Producto4 from '../../assets/ProductsPics/Producto4.jpg';

export const products = [
  { id: 1, name: 'Masa Madre', price: 10000, image: Producto1 },
  { id: 2, name: 'Galletas Deli', price: 5000, image: Producto2 },
  { id: 3, name: 'Galletas Lovers', price: 7000, image: Producto3 },
  { id: 4, name: 'Pan Artesanal', price: 15000, image: Producto4 }
  // Añade más productos según sea necesario
];

export const getProducts = () => {
  return products;
};

// Puedes agregar más funciones relacionadas con productos aquí
