const {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
} = require("../services/warehouseService");


// CREATE WAREHOUSE
const createWarehouseController = async (req, res) => {
    try {
        const { name, location } = req.body;

        const warehouse = await createWarehouse(
            name,
            location
        );

        res.status(201).json({
            message: "Warehouse created successfully",
            warehouse: {
                id: warehouse._id,
                name: warehouse.name,
                location: warehouse.location
            }
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// GET ALL WAREHOUSES
const getAllWarehousesController = async (req, res) => {
    try {
        const warehouses = await getAllWarehouses();

        res.status(200).json({
            message: "Warehouses fetched successfully",
            warehouses: warehouses
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET WAREHOUSE BY ID
const getWarehouseByIdController = async (req, res) => {
    try {
        const id = req.params.id;

        const warehouse = await getWarehouseById(id);

        if (!warehouse) {
            return res.status(404).json({
                message: "Warehouse not found"
            });
        }

        res.status(200).json({
            message: "Warehouse fetched successfully",
            warehouse: warehouse
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const updateWarehouseController = async (req, res) => {
    try {
        const id = req.params.id;

        const { name, location } = req.body;

        const warehouse = await updateWarehouse(
            id,
            name,
            location
        );

        if (!warehouse) {
            return res.status(404).json({
                message: "Warehouse not found"
            });
        }

        res.status(200).json({
            message: "Warehouse updated successfully",
            warehouse: warehouse
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const deleteWarehouseController = async(req,res) =>{
    try{
    const id = req.params.id;
    const warehouse= await deleteWarehouse(id);

     if (!warehouse) {
            return res.status(404).json({
                message: "warehouse not found"
            });
        }
        
     res.status(200).json({
            message: "warehousedeleted successfully",
            warehouse: warehouse
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


module.exports = {
    createWarehouseController,
    getAllWarehousesController,
    getWarehouseByIdController,
    updateWarehouseController,
    deleteWarehouseController
};