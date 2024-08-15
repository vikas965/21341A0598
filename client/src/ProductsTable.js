import React, { useState } from 'react';
import axios from 'axios';

const ProductsTable = () => {
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [top, setTop] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`http://localhost:3001/test/companies/${company}/categories/${category}/products`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                params: {
                    top: top || 10,
                    minPrice: minPrice || 1,
                    maxPrice: maxPrice || 10000,
                },
            });
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchProducts();
    };


    console.log(products)
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Filter Products</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-lg font-medium">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Company</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Min Price</label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Max Price</label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Top</label>
                    <input
                        type="number"
                        value={top}
                        onChange={(e) => setTop(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Authorization Token</label>
                    <input
                        type="text"
                        value={authToken}
                        onChange={(e) => setAuthToken(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                >
                    Fetch Products
                </button>
            </form>
            {loading && <p className="mt-4 text-center text-lg">Loading...</p>}
            {error && <p className="mt-4 text-center text-red-500">{error}</p>}
            {products.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Product List</h2>
                    <ul className="space-y-4 mt-4">
                        {products.map(product => (
                            <li key={product.id} className="bg-white shadow-md rounded-lg p-4">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-700">Price: ${product.price}</p>
                                <p className="text-gray-500">Category: {product.category}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductsTable;
