const express = require('express');
const router = express.Router();
const Product = require('../model/Product');

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to fetch products'
        });
    }
});


module.exports = router;