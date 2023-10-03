const mongoose = require('mongoose');
const { UserModel } = require('./userModel.model');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  start: Date,
  end: Date,
  // status: { type: String, enum: ['Done', 'Not Done'], default: 'Not Done' },
  // priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  // You can add more fields like timestamps, user reference, etc.
},{
  versionKey:false
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;
