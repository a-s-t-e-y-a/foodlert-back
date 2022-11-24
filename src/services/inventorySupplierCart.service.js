const { ObjectId } = require("mongoose").Types;
require("express-async-errors");
const inventorySupplierModel = require("./../models/inventorySupplier.model");
const ApiError = require("./../utils/ApiError");

const getCartIndex = (cartId, supplier) => {
  console.log(cartId, supplier);
  let cartIndex = -1;
  supplier.cart.forEach((cart, index) => {
    if (cart._id.equals(cartId)) {
      cartIndex = index;
    }
  });
  return cartIndex;
};

const getUpdateCart = (cart, body) => {
  for (key in body) {
    cart[key] = body[key];
  }
  cart.total = cart.quantity.value * cart.price;
  return cart;
};

const createInventorySupplierCart = async ({
  id,
  item,
  quantity,
  subQuantity,
  subSubQuantity,
  price,
}) => {
  const supplier = await inventorySupplierModel.findOne({
    id,
  });

  if (!supplier) throw new ApiError(404, `supplier not found`);

  supplier.cart.push({
    item,
    quantity,
    subQuantity,
    subSubQuantity,
    price,
    total: quantity.value * price,
  });

  const createdInventorySupplierCart = await supplier.save();

  return createdInventorySupplierCart;
};

const getAllInventorySupplierCart = async ({ id }) => {
  console.log(id);
  const supplier = await inventorySupplierModel.findOne({ _id: id });
  console.log(supplier);
  const getAllInventorySupplierCart = supplier.cart;
  return getAllInventorySupplierCart;
};
const updateInventorySupplierCart = async ({ id, cartId, body }) => {
  const supplier = await inventorySupplierModel.findOne({ id });
  if (!supplier) throw new ApiError(404, `supplier not found`);

  const index = getCartIndex(new ObjectId(cartId), supplier);
  if (index == -1) throw new ApiError(404, `cart not found`);

  const updatedCart = getUpdateCart(supplier.cart[index], body);

  supplier.cart[index] = updatedCart;

  const updatedInventorySupplierCart = await supplier.save();

  return updatedInventorySupplierCart;
};

const deleteInventorySupplierCart = async ({ id, cartId }) => {
  const supplier = await inventorySupplierModel.findOne({ id });
  if (!supplier) throw new ApiError(404, `supplier not found`);

  const index = getCartIndex(new ObjectId(cartId), supplier);
  if (index == -1) throw new ApiError(404, `cart not found`);

  console.log("index", index);

  supplier.cart.splice(index, 1);

  const updatedInventorySupplierCart = supplier.save();

  return updatedInventorySupplierCart;
};

module.exports = {
  createInventorySupplierCart,
  getAllInventorySupplierCart,
  updateInventorySupplierCart,
  deleteInventorySupplierCart,
};
