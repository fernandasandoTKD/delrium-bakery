import { useState, useEffect } from "react";
import ProductCard from "./ProductCard"; // Asegúrate de tener este componente
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Función para obtener productos del backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3900/api/products"); // Ajusta la URL según tu configuración
                setProducts(response.data.data); // Suponiendo que los productos vienen en response.data.data
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchProducts();
    }, []); // Este hook se ejecuta una vez cuando el componente se monta

    return (
        <div className="product-list d-flex flex-wrap justify-content-center">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product._id} product={product} /> // Pasamos cada producto al componente ProductCard
                ))
            ) : (
                <p>No hay productos disponibles.</p>
            )}
        </div>
    );
};

export default ProductList;
