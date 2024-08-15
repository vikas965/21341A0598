import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
});


async function fetchProductsFromCompany(authToken, companyname, categoryname, top, minPrice, maxPrice) {
    const url = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    const response = await axios.get(url, {
        headers: { Authorization: authToken }
    });

    return response.data;
}


app.get('/test/companies/:companyname/categories/:categoryname/products', async (req, res) => {
    const { companyname, categoryname } = req.params;
    const { top = 10, minPrice = 1, maxPrice = 10000 } = req.query; 
    const authToken = req.headers['authorization'];

    try {
       
        const products = await fetchProductsFromCompany(authToken, companyname, categoryname, top, minPrice, maxPrice);
        // const sortedProducts = products.sort((a, b) => a.price - b.price);
        // const limitedProducts = sortedProducts.slice(0, Number(top)); 

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting products' });
    }
});

app.listen(3001, () => {
    console.log("Server Connected on port 3001"); 
});
