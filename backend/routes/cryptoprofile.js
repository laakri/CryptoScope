const express = require("express");
const router = express.Router();
const TargetTable = require("../models/targetTable");
const User = require("../models/user");

// Route to create a new target table for a user
router.post("/targetTables", async (req, res) => {
  try {
    const { userId, name } = req.body;

    // Create a new target table
    const newTargetTable = new TargetTable({ name });
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

// Route to edit the name of a target table
router.patch("/:userId/targetTables/:targetTableId", async (req, res) => {
  try {
    const { name } = req.body;
    const { userId, targetTableId } = req.params;

    // Update the name of the target table
    await TargetTable.findByIdAndUpdate(targetTableId, { name });

    res.json({ message: "Target table name updated" });
  } catch (error) {
    console.error("Error updating target table name:", error);
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
