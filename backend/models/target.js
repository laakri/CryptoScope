const mongoose = require("mongoose");

const targetSchema = new mongoose.Schema({
  targetPrice: { type: Number, required: true },
  hit: { type: Boolean, default: false },
});

module.exports = mongoose.model("Target", targetSchema);
