const mongoose = require("mongoose");

const FavoriteCoinSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coinId: { type: String, required: true },
  order: { type: Number, required: true },
});

module.exports = mongoose.model("FavoriteCoin", FavoriteCoinSchema);
