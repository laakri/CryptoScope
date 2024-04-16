const express = require("express");
const router = express.Router();
const FavoriteCoin = require("../models/favorite");
const User = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const { userId, coinId, order } = req.body;

    const favoriteCoin = new FavoriteCoin({ userId, coinId, order });
    await favoriteCoin.save();

    await User.findByIdAndUpdate(userId, {
      $push: { favorites: favoriteCoin._id },
    });

    res.status(201).json(favoriteCoin);
  } catch (error) {
    console.error("Error adding coin to favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/order", async (req, res) => {
  try {
    const { userId, coinId, order } = req.body;

    await FavoriteCoin.findOneAndUpdate({ userId, coinId }, { order });

    res
      .status(200)
      .json({ message: "Favorite coin order updated successfully" });
  } catch (error) {
    console.error("Error changing favorite coin order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:coinId", async (req, res) => {
  try {
    const coinId = req.params.coinId;

    await FavoriteCoin.findByIdAndDelete(coinId);

    await User.updateMany({}, { $pull: { favorites: coinId } });

    res.status(200).json({ message: "Favorite coin deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite coin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
