const Product = require('../model/Product');

const getAllProducts = async (req, res) => {
    res.json(await Product.find());
}


module.exports = {
    getAllProducts
};