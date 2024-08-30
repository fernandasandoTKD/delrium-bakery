import { useState } from 'react';
import BuyerForm from './FormDelivery';
import ProductCard from './productModule';
import { getProducts } from './Products.jsx';

const ShoppingPage = () => {
  const [products, setProducts] = useState(getProducts());

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };
  return (
    // <div>
    <div className="container-fluid shopping">
        {/* <h1>Shopping Page</h1> */}
        <div className="row cotenedor">
          <div className="col-7">
            <h2 className='ml-2 mt-4'>Tu Carrito</h2>
            <div className="d-flex flex-wrap">
              {products.map(product => (
                <ProductCard
                  key={product.id} 
                  product={product}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
          <div className="col">
            <div className="mt-5 pt-4 mr-0">
              <h2 className='mt-1'>Resumen de la Orden</h2>
              <BuyerForm className='mt-4 mr-2'/>
              <h3>Total: {products.reduce((total, product) => total + product.price, 0)}</h3>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
  );
};

export default ShoppingPage;
