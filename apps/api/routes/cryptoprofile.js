const express = require("express");
const router = express.Router();
const TargetTable = require("../models/targetTable");
const User = require("../models/user");
const Crypto = require("../models/crypto");

// Route to create a new target table for a user
router.post("/CreateNewList", async (req, res) => {
  try {
    const { userId } = req.body;

    // Create a new target table
    const newTargetTable = new TargetTable();
    await newTargetTable.save();

    // Find the user and push the new target table to their targetTables array
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { targetTables: newTargetTable._id } },
      { new: true }
    );

    res.status(201).json({ message: "Target table created", user });
  } catch (error) {
    console.error("Error creating target table:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Route to get list of target tables by user ID
router.get("/:userId/targetTables", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user and populate their targetTables
    const user = await User.findById(userId).populate(
      "targetTables",
      "_id name"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.targetTables);
  } catch (error) {
    console.error("Error getting target tables by user ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.patch("/:userId/targetTables/:targetTableId", async (req, res) => {
  try {
    const { name } = req.body;
    const { userId, targetTableId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user owns the target table
    if (!user.targetTables.includes(targetTableId)) {
      return res
        .status(403)
        .json({ message: "User does not own the target table" });
    }

    // Update the name of the target table
    await TargetTable.findByIdAndUpdate(targetTableId, { name });

    res.json({ message: "Target table name updated" });
  } catch (error) {
    console.error("Error updating target table name:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Route to get suggestions for coins
router.get("/coins/suggestions", async (req, res) => {
  try {
    const topBigCoins = await Crypto.find(
      {},
      { name: 1, image: 1, current_price: 1, price_change_24h: 1 }
    )
      .sort({ market_cap_rank: 1 })
      .limit(3);

    const trendingCoins = await Crypto.find(
      {},
      { name: 1, image: 1, current_price: 1, price_change_24h: 1 }
    )
      .sort({ price_change_percentage_24h: -1 })
      .limit(2);

    res.json({ topBigCoins, trendingCoins });
  } catch (error) {
    console.error("Error fetching coin suggestions:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to search for coins by name
router.get("/coins/search", async (req, res) => {
  const { query } = req.query;

  try {
    const regex = new RegExp(query, "i");
    const searchResults = await Crypto.find(
      { name: regex },
      { name: 1, image: 1, current_price: 1, price_change_24h: 1 }
    ).limit(10);

    res.json(searchResults);
  } catch (error) {
    console.error("Error searching for coins:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to delete a target table and its associated coins and targets
router.delete("/:userId/targetTables/:targetTableId", async (req, res) => {
  try {
    const { userId, targetTableId } = req.params;

    // Delete the target table
    await TargetTable.findByIdAndDelete(targetTableId);

    // Remove the target table from the user's targetTables array
    await User.findByIdAndUpdate(userId, {
      $pull: { targetTables: targetTableId },
    });

    // Delete coins associated with the target table
    await Coin.deleteMany({ targetTable: targetTableId });

    // Delete targets associated with the coins in the target table
    await Coin.updateMany(
      { targetTable: targetTableId },
      { $unset: { targets: "" } }
    );

    res.json({
      message: "Target table, associated coins, and targets deleted",
    });
  } catch (error) {
    console.error("Error deleting target table:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
