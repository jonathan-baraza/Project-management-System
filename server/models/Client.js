const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: [20, "Name cannot exceed 20 characters"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxLength: [50, "Email cannot exceed 20 characters"],
  },
  phone: {
    type: String,
    trim: true,
    required: true,
    maxLength: [20, "Phone cannot exceed 20 characters"],
  },
});

module.exports = new mongoose.model("Client", ClientSchema);
