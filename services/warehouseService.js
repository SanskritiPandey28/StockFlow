const Warehouse = require("../models/Warehouse");

const createWarehouse = async (name, location) => {

    const warehouse = new Warehouse({
        name,
        location
    });

    await warehouse.save();

    return warehouse;
};

const getAllWarehouses = async () => {
    const warehouses = await Warehouse.find();

    return warehouses;
};

const getWarehouseById = async (id) => {
    const warehouse = await Warehouse.findById(id);

    return warehouse;
};


const updateWarehouse = async (id, name, location) => {
    const warehouse = await Warehouse.findByIdAndUpdate(
        id,
        {
            name,
            location
        },
        {
            new: true
        }
    );

    return warehouse;
};

const deleteWarehouse = async (id) => {
    const warehouse = await Warehouse.findByIdAndDelete(id);

    return warehouse;
};

module.exports = {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
};