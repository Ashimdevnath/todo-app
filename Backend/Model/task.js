const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: 'UserInformation', required: true }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
