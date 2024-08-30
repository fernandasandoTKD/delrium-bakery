import { useState } from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onDelete }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
  };

  return (
    <div className="card product-card m-3" style={{width: '20rem'}}>
      <img src={product.image} className="card-img-top product-image" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title product-name">{product.name}</h5>
        <p className="card-text product-price">Precio: ${product.price.toFixed(2)}</p>
        <p className="card-text product-quantity">Cantidad: {quantity}</p>
        <div className="d-flex justify-content-between product-actions">
          <button className="btn btn-primary btn-increase" onClick={increaseQuantity}>Aumentar</button>
          <button className="btn btn-secondary btn-decrease" onClick={decreaseQuantity}>Disminuir</button>
        <button className="btn btn-danger " onClick={() => onDelete(product.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductCard;
