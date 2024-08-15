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

            // Log the full response data to debug
            console.log("Fetched products:", response.data);

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

    return (
        <div style={{width:"100%",display:"flex", flexDirection:"column",alignItems:"center",justifyContent:'center'}} className="container mx-auto px-4 py-6 max-w-4xl flex items-center ">
            <h1 className="text-3xl font-bold mb-6 text-center">Filter Products</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4">
                <div className="flex flex-col">
                    <label className="text-lg font-medium mb-1">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium mb-1">Company</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium mb-1">Min Price</label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium mb-1">Max Price</label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium mb-1">Top</label>
                    <input
                        type="number"
                        value={top}
                        onChange={(e) => setTop(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium mb-1">Authorization Token</label>
                    <input
                        type="text"
                        value={authToken}
                        onChange={(e) => setAuthToken(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                >
                    Fetch Products
                </button>
            </form>
            {loading && <p className="text-center text-lg font-semibold">Loading...</p>}
            {error && <p className="text-center text-red-500 font-semibold">{error}</p>}
            {products.length > 0 && (
                <div className="overflow-x-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Product List</h2>
                    <table className="min-w-full bg-white divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.productName}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.rating}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.discount}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.availability}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductsTable;
