const { ObjectId } = require('mongoose').Types;
require('express-async-errors');
const cateringOrderModel = require('./../models/cateringOrder.model');

const createCateringOrder = async ({
  orderedBy,
  bookedBy,
  approvedBy,
  paymentBy,
  notes,
  orderDate,
  deliveryDate,
  status,
  totalAmount,
  randomAmount,
  upfrontPaid,
  orderDetails
}) => {
  const createdCateringOrder = await cateringOrderModel.create({
    orderedBy,
    bookedBy,
    approvedBy,
    paymentBy,
    notes,
    orderDate,
    deliveryDate,
    status,
    totalAmount,
    randomAmount,
    upfrontPaid,
    orderDetails,
    markAsDelivery : false
  });

  return createdCateringOrder;
};

const getAllCateringOrder = async () => {
  const getAllCateringOrder = await cateringOrderModel.find();
  // console.log(getAllCateringOrder)
  return getAllCateringOrder;
};
const getCateringOrder = async ({ id }) => {
  const getAllCateringOrder = await cateringOrderModel.findById(id);

  return getAllCateringOrder;
};
const updateCateringOrder = async ({ id, body }) => {
  const updatedCateringOrder = await cateringOrderModel.findByIdAndUpdate(id, body, { new: true });
  return updatedCateringOrder;
};

const deleteCateringOrder = async ({ id }) => {
  await cateringOrderModel.findByIdAndDelete(id);
};

module.exports = {
  createCateringOrder,
  getAllCateringOrder,
  getCateringOrder,
  updateCateringOrder,
  deleteCateringOrder
};
