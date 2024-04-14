const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

// Export the Task model
module.exports = Task;
