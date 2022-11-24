const mongoose = require("mongoose");

const toJSON = require("../utils/toJSON");

const { ObjectId } = mongoose.Types;

const cateringClientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
  },
  address: {
    type: String,
  },
  type: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  image: {
    type: String,
  },
});

const orderDetailSchema = mongoose.Schema({
  item: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  total: {
    type: Number,
  },
});

const cateringOrderSchema = mongoose.Schema(
  {
    orderedBy: {
      type: cateringClientSchema,
    },
    bookedBy: {
      type: String,
    },
    approvedBy: {
      type: String,
    },
    paymentBy: {
      type: String,
    },
    notes: {
      type: String,
    },
    orderDate: {
      type: String,
    },
    deliveryDate: {
      type: String,
    },
    status: {
      type: String,
      default: "open",
    },
    totalAmount: {
      type: Number,
    },
    upfrontPaid: {
      type: Number,
    },
    orderDetails: {
      type: [orderDetailSchema],
    },
  },
  {
    timestamps: true,
  }
);

toJSON(cateringOrderSchema);

const CateringOrder = mongoose.model("CateringOrder", cateringOrderSchema);

module.exports = CateringOrder;
