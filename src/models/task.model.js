const mongoose = require('mongoose');

const toJSON = require('../utils/toJSON');

const { ObjectId } = mongoose.Types;

const subTask = mongoose.Schema({
  title: { type: String, required: true },
  unit: String,
  value: Number,
  time: String,
  status: { type: String, default: 'open' },
  log: String,
  comment: String
});

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    time: String,
    comment: String,
    checklists: [subTask],
    dueDate: { type: String, required: true },
    repeat: { type: String, default: 'day' },
    assignTo: { type: [String], required: true },
    status: { type: String, default: 'open' },
    completedBy: [String],
    completedDate: String,
    createdBy: { type: ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

toJSON(taskSchema);

const task = mongoose.model('Task', taskSchema);

module.exports = task;
