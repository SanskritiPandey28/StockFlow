const { findByIdAndUpdate } = require("../models/Product");
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../services/productService");


// CREATE PRODUCT
const createProductController = async (req, res) => {
    try {
        const { name, description, price, sku } = req.body;

        const product = await createProduct(
            name,
            description,
            price,
            sku
        );

        res.status(201).json({
            message: "Product added successfully!",
            product: {
                id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                sku: product.sku
            }
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// GET ALL PRODUCTS
const getAllProductsController = async (req, res) => {
    try {
        const products = await getAllProducts();

        res.status(200).json({
            message: "Products fetched successfully",
            products: products
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET PRODUCT BY ID
const getProductByIdController = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product fetched successfully",
            product: product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Update Product

const updateProductController = async (req, res) => {
    try {
        const id = req.params.id;

        const { name, description, price, sku } = req.body;

        const product = await updateProduct(
            id,
            name,
            description,
            price,
            sku
        );
         if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product: product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteProductController = async(req,res) =>{
    try{
    const id = req.params.id;
    const product = await deleteProduct(id);

     if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        
     res.status(200).json({
            message: "Product deleted successfully",
            product: product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController
};