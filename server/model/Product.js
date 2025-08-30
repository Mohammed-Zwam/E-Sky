const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: [{ type: String }],
    thumbnail: { type: String },
    rating: { type: Number },
    brand: { type: String },
    stock: { type: Number },
    category: { type: String },
    tags: [{ type: String }],
    availabilityStatus: { type: String }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;