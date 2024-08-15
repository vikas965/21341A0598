import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Fetch data from the backend when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/test/companies/AMZ/categories/Laptop/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <ul className="space-y-4">
                {products.map(product => (
                    <li key={product.id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-700">Price: ${product.price}</p>
                        <p className="text-gray-500">Category: {product.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsTable;
