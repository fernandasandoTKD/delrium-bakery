import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  return (
    <div className="card product-card m-2" style={{ width: '18rem' }}>
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Precio: ${product.price.toFixed(2)}</p>
        <p className="card-text">{product.description}</p>
        <button className="btn btn-primary">Agregar al carrito</button>
      </div>
    </div>
  );
};

// Definición de propTypes
ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
