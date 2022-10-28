const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const emergencyContactSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  relation: {
    type: String,
    required: true
  }
});

const experienceSchema = mongoose.Schema({
  logo: { type: String, default: '' },
  companyName: { type: String, required: true },
  department: { type: String, required: true },
  jobTitle: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date }
});

const employeeSchema = mongoose.Schema(
  {
    employeeId: {
      type: Number,
      required: true
    },
    payrollId: {
      type: Number,
      required: true
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Others']
    },
    fullAddress: { type: String, required: true },
    department: { type: String, required: true },
    jobTitle: { type: String, required: true },
    employementType: {
      type: String,
      enum: ['FullTime', 'PartTime', 'Casual'],
      default: 'FullTime'
    },
    tenure: {
      period: {
        type: String,
        enum: ['Day', 'Month', 'Year']
      },
      duration: Number
    },
    visa: {
      type: {
        type: String,
        enum: ['Student Visa(20hrs limit)', 'Student Visa(non restricted)', 'Temporary Work Visa', 'PR', 'Citizen']
      },
      expiryDate: Date
    },
    payrollGroup: {
      type: ObjectId,
      ref: 'PayrollGroup',
      required: true
    },
    workSlot: [[String, String]],
    emergencyContact: { type: emergencyContactSchema, _id: false },
    experience: { type: experienceSchema },
    resume: String,
    sickCertificates: [String],
    badges: [],
    access: {
      type: Object
      // default: {
      //   SAFE_DEPOSIT: [],
      //   STOCKTAKE: [],
      //   SUPPLIER: [],
      //   BUILD_CART: [],
      //   WORKFORCE: ['view', 'edit', 'add'],
      //   TASKS: ['view'],
      //   OPERATIONS: ['view'],
      //   SCHEDULE_SHIFT: ['view', 'add'],
      //   CATERING_ORDERS: ['view'],
      //   MENU: ['view'],
      //   NEWS_FEED: ['edit', 'add']
      // }
    },
    role: {
      type: String //will assign a value when added to team
    },
    branch: {
      type: ObjectId,
      ref: 'Branch',
      required: true
    },
    restaurent: {
      type: ObjectId,
      ref: 'Restaurent',
      required: true
    }
  },
  { timestamps: true }
);

employeeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.updatedAt;
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
