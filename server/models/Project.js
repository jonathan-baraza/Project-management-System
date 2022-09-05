const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: [20, "Name cannot exceed 20 characters"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, "description cannot exceed 100 characters"],
  },
  status: {
    type: String,
    enum: ["Not started", "In progress", "Completed"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

module.exports = new mongoose.model("Project", ProjectSchema);
