const express = require('express');
const dotenv = require('dotenv'); dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const ProductRoutes = require("./routes/ProductRoutes");
const PaymentRoutes = require("./routes/PaymentRoutes");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("DB Connection Successful");
}).catch(() => {
    console.log("Failed to connect to database");
})

// ROUTES
app.use("/api", ProductRoutes);
app.use("/api/payment", PaymentRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "Server is running successfully!",
        endPoints: {
            "/api/products": {
                description: "Get All Products",
                method: "GET"
            },
            "/api/payment/pay": {
                description: "Create Payment Intent",
                method: "POST"
            },
            "/api/payment/api_key": {
                description: "Get Stripe Publishable Key",
                method: "GET"
            }
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log("Server Listening ...");
});

module.exports = app;