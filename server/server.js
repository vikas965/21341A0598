import express from "express";

import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())





app.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
});

app.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
});


async function fetchProductDetails(companyName, categoryName, productId, token) {
    const url = `http://20.244.56.144/test/companies/${companyName}/categories/${categoryName}/products/${productId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error fetching product details: ${error}`);
        throw error;
    }
}


async function fetchProductsFromCompany(authToken, companyname, categoryname, minPrice, maxPrice) {
    const url = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products`;
    const response = await axios.get(url, {
        headers: { Authorization: authToken },
        params: {
            minPrice: minPrice,
            maxPrice: maxPrice
        }
    });

    return response.data;
}

app.get('/test/companies/:companyname/categories/:categoryname/products', async (req, res) => {
    const { companyname, categoryname } = req.params;
    const { top = 10, minPrice, maxPrice } = req.query;
    const authToken = req.headers['authorization'];

    try {
        const products = await fetchProductsFromCompany(authToken, companyname, categoryname, minPrice, maxPrice);
        const sortedProducts = products.sort((a, b) => a.price - b.price);
        const limitedProducts = sortedProducts.slice(0, top);

        res.json(limitedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});


app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;
    const authToken = req.headers.authorization; 
    const companyName = req.query.company; 

    if (!authToken) {
        return res.status(401).json({ error: 'Authorization token is required' });
    }

    if (!companyName) {
        return res.status(400).json({ error: 'Company name is required as a query parameter' });
    }

    try {
        const productDetails = await fetchProductDetails(companyName, categoryname, productid, authToken);
        return res.json(productDetails);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch product details' });
    }
});

app.listen(3001, () => {
    console.log("Server Connected"); 
  })