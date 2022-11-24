const { ObjectId } = require("mongoose").Types;
require("express-async-errors");
const inventoryStocktakeModel = require("./../models/inventoryStocktake.model");
const inventorySupplierModel = require("./../models/inventorySupplier.model");

const getItemIndexFromSupplierCart = ({ cart, cartId }) => {
  cartId = new ObjectId(cartId);
  let index = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i]._id === cartId) {
      index = i;
      break;
    }
  }
  return index;
};

const createInventoryStocktake = async ({
  itemName,
  price,
  minStock,
  quantity,
  subQuantity,
  subSubQuantity,
  total,
  supplier,
  storage,
  purchased,
  begin,
  sold,
  waste,
  stock,
  inStock,
  orderDate,
  lastOrderDate,
  lastOrderRecieved,
  history,
  createdBy,
}) => {
  const createdInventoryStocktake = await inventoryStocktakeModel.create({
    itemName,
    price,
    minStock,
    quantity,
    subQuantity,
    subSubQuantity,
    total,
    supplier,
    storage,
    purchased,
    begin,
    sold,
    waste: inStock - stock,
    stock: begin + purchased - sold,
    inStock,
    orderDate,
    lastOrderDate,
    lastOrderRecieved,
    history,
    createdBy,
  });

  return createdInventoryStocktake;
};

const getAllInventoryStocktake = async () => {
  const getAllInventoryStocktake = await inventoryStocktakeModel
    .find()
    .populate("supplier")
    .populate("createdBy")
    .populate({ path: "history" });

  return getAllInventoryStocktake;
};
const getInventoryStocktake = async ({ id }) => {
  const getAllInventoryStocktake = await inventoryStocktakeModel
    .findById(id)
    .populate("supplier");

  return getAllInventoryStocktake;
};
const updateInventoryStocktake = async ({ id, body }) => {
  const updatedInventoryStocktake =
    await inventoryStocktakeModel.findByIdAndUpdate(id, body, { new: true });

  return updatedInventoryStocktake;
};

const deleteInventoryStocktake = async ({ id, body }) => {
  await inventoryStocktakeModel.findByIdAndDelete(id);
};

const addItemToStocktake = async ({ userId, supplierId, cartId }) => {
  const supplier = await inventorySupplierModel.findOne({ _id: supplierId });
  const index = getItemIndexFromSupplierCart(supplier.cart, cartId);
  const itemDetails = supplier.cart[index];
  supplier.cart = supplier.cart.splice(index, 1);
  await supplier.save();
  const stocktakeItem = await inventoryStocktakeModel.find({
    item: itemDetails.item,
  });

  stocktakeItem.quantity.value += itemDetails.quantity.value;
  stocktakeItem.subQuantity.value += itemDetails.subQuantity.value;
  stocktakeItem.subSubQuantity.value += itemDetails.subSubQuantity.value;

  await stocktakeItem.save();

  return { supplierCart: supplier.cart, stocktakeItem };
};

module.exports = {
  createInventoryStocktake,
  getAllInventoryStocktake,
  getInventoryStocktake,
  updateInventoryStocktake,
  deleteInventoryStocktake,
  addItemToStocktake,
};
