const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  existingCoin: { type: mongoose.Schema.Types.ObjectId, ref: "Crypto" },
  customCoin: {
    name: { type: String },
    price: { type: Number },
  },
  isExistingCoin: { type: Boolean, default: false },
  targets: {
    type: [
      {
        value: String,
        hit: { type: Boolean, default: false },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Coin", coinSchema);
