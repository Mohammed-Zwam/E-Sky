const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const ProductRoutes = require("./routes/ProductRoutes");

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("DB Connection Successful");
    })
}).catch(() => {
    console.log("Failed to connect to database");
})

// ROUTES
app.use("/api", ProductRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "Server is running successfully!",
    });
});

app.listen(process.env.PORT, () => {
    console.log("Server Listening ...");
});

module.exports = app;