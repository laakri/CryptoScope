const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  // For existing coins from the database
  existingCoin: { type: mongoose.Schema.Types.ObjectId, ref: "Crypto" },
  // For custom coins entered by the user
  customCoin: {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Coin", coinSchema);
