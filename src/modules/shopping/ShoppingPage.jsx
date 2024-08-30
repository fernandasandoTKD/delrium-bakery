import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './productModule';
import { getProducts } from './Products.jsx';

const ShoppingPage = () => {
  const [products, setProducts] = useState(getProducts());

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };
  return (
    <div>
      <h1>Shopping Page</h1>
      <Container>
        <Row>
          <Col>
            <h2>Tu Carrito</h2>
            <div className="d-flex flex-wrap">
              {products.map(product => (
                <ProductCard key={product.id} 
                product={product}
                onDelete={handleDelete}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShoppingPage;
