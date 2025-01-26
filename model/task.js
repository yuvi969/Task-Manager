const mongoose = require('mongoose')

const Taskschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'cant be more than 20'],
  },
  completed: {
    type: Boolean,
    default: false,
    required: [true, 'Cant be empty'],
  },
})

module.exports = mongoose.model('Task', Taskschema)
