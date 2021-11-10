const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "task name cannot be more than 20 chars"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
const model = mongoose.model("tasks", schema);

module.exports = model;
