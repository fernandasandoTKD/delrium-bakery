import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDelete } from 'react-icons/md';
import ProductsModal from './components/ProductsModal';
import { Global } from '../../helpers/Global';
import defaultImage from '../../assets/pastel.png';
import styles from './ProductsPrivateStyles.module.css';

export const ProductsPrivatePage = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${Global.url}products/products`);
            const data = await response.json();
            if (data.status === 'success') {
                setProducts(data.data);
            } else {
                throw new Error('Error en la respuesta de la API');
            }
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los productos. Intenta de nuevo más tarde.'
            });
        }
    };

    const handleEditClick = (product) => {
        setCurrentProduct(product);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentProduct(null);
    };


    const handleSave = async (productData) => {
        const token = localStorage.getItem("token");

        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Error en la operación',
                text: 'No estás autenticado.',
            });
            return;
        }

        try {
            let response;
            if (productData._id) {
                // Si existe _id, se trata de una actualización
                response = await fetch(`${Global.url}products/update/${productData._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(productData),
                });
            } else {
                // Si no existe _id, se trata de una creación
                response = await fetch(`${Global.url}products`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(productData),
                });
            }

            const result = await response.json();

            if (result.status === "success" && result.data) {
                const savedProduct = result.data;
                if (productData._id) {
                    // Actualiza el producto en la lista
                    setProducts((prevProducts) =>
                        prevProducts.map((product) => (product._id === savedProduct._id ? savedProduct : product))
                    );
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto actualizado',
                        text: 'Los datos del producto se han actualizado correctamente.',
                    });
                } else {
                    // Agrega el nuevo producto a la lista
                    setProducts((prevProducts) => [...prevProducts, savedProduct]);
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto creado',
                        text: 'El producto se ha creado correctamente.',
                    });
                }
                handleClose(); // Cierra el modal
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en la operación',
                    text: result.message || 'No se pudo guardar el producto.',
                });
            }
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error en la operación',
                text: 'No se pudo guardar el producto. Intenta nuevamente.',
            });
        }
    };






    const handleDelete = async (productId) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (!confirm.isConfirmed) return;

        const token = localStorage.getItem("token");

        if (!token) {
            console.error('No hay token suministrado');
            Swal.fire({
                icon: 'error',
                title: 'Error en la operación',
                text: 'No estás autenticado. Por favor inicia sesión nuevamente.',
            });
            return;
        }

        try {
            const response = await fetch(`${Global.url}products/delete/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));

            Swal.fire({
                icon: 'success',
                title: 'Producto eliminado',
                text: 'El producto ha sido eliminado correctamente.',
            });
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error en la operación',
                text: 'No se pudo eliminar el producto. Intenta nuevamente.',
            });
        }
    };


    

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Productos del sistema</h1>
                <Button variant="primary" className="me-2" onClick={() => {
                    setCurrentProduct(null); // Limpia el producto actual
                    setShowModal(true); // Muestra el modal
                }}>
                    Crear producto
                </Button>
            </div>
            <Row>
                {products.map((product) => (
                    <Col key={product?._id} sm={12} md={4} className="mb-4">
                        <div className={`d-flex flex-column align-items-center text-center ${styles.card}`}>
                            <div className={styles.card_img}>
                                <Card.Img variant="top" src={defaultImage} style={{ width: '40%' }} />
                            </div>
                            <div className={styles.card__descr_wrapper}>
                                <p className={styles.card__title}>{product.name}</p>
                                <p className={styles.card__descr}>
                                    {product.description}<br />
                                    ${product.price}<br />
                                    Stock: {product.stock}
                                </p>
                                <div className={styles.card__links}>
                                    <Button variant="info" className="me-2" onClick={() => handleEditClick(product)}>
                                        <CiEdit />
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(product._id)}>
                                        <MdOutlineDelete />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            <ProductsModal
                show={showModal}
                handleClose={handleClose}
                product={currentProduct}
                handleSave={handleSave}
            />
        </div>
    );
};
