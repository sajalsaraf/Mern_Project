const mongoose = require("mongoose");
const empSchema = new mongoose.Schema({
  sr: Number,
  name: String,
  email: String,
  mobile_no: String,
  designation: String,
  gender: String,
  course: [String],
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employees", empSchema);
