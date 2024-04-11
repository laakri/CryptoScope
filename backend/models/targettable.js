const mongoose = require("mongoose");

const targetSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    coins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coin" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TargetTable", targetSchema);
