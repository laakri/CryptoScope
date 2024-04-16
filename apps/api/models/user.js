const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const enumValues = require("mongoose-enumvalues");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    targetTables: [
      { type: mongoose.Schema.Types.ObjectId, ref: "TargetTable" },
    ],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "FavoriteCoin" }],
  },
  { timestamps: true }
);

const enumOptions = {};

userSchema.plugin(enumValues, enumOptions);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
