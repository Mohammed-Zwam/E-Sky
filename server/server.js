const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const ProductRoutes = require("./routes/ProductRoutes");

dotenv.config();
app.use(cors());


// ROUTES
app.use("/api", ProductRoutes);


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected To DB Successfully");
}).catch((err) => {
    console.log("ERROR: ", err);
})


app.listen(process.env.PORT, () => {
    console.log("Server Listening ...");
})
