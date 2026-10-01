const Product = require("../models/Product");

const createProduct = async(name,description,price,sku)=>{
    const product = new Product({
        name,
        description,
        price,
        sku
    });
    await product.save();

    return product;
}

const getAllProducts = async () => {
    const products = await Product.find();

    return products;
};

const getProductById = async(id)=>{
    const product = await Product.findById(id);
    return product;
}

const updateProduct = async (id, name, description, price, sku) => {
    const product = await Product.findByIdAndUpdate(
        id,
        {
            name,
            description,
            price,
            sku
        },
        {
            new: true
        }
    );

    return product;
};


const deleteProduct = async(id)=>{
    const product = await Product.findByIdAndDelete(id);
    return product;
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};

