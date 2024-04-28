const express = require("express");
const router = express.Router();
const TargetTable = require("../models/targetTable");
const User = require("../models/user");
const Crypto = require("../models/crypto");
const Coin = require("../models/coin");

router.post("/CreateNewList", async (req, res) => {
  try {
    const { userId } = req.body;
    const newTargetTable = new TargetTable();
    await newTargetTable.save();
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

router.get("/:userId/targetTables", async (req, res) => {
  try {
    const { userId } = req.params;
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
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.targetTables.includes(targetTableId)) {
      return res
        .status(403)
        .json({ message: "User does not own the target table" });
    }
    await TargetTable.findByIdAndUpdate(targetTableId, { name });
    res.json({ message: "Target table name updated" });
  } catch (error) {
    console.error("Error updating target table name:", error);
    res.status(500).json({ message: "Server error" });
  }
});

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
router.post(
  "/:userId/targetTables/:targetTableId/addCoin",
  async (req, res) => {
    try {
      const { userId, targetTableId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { name, price, isExistingCoin } = req.body;
      let coin;

      if (isExistingCoin) {
        const cryptoCoin = await Crypto.findById(name);
        if (!cryptoCoin) {
          return res
            .status(404)
            .json({ message: "Coin not found in Crypto model" });
        }
        coin = new Coin({ existingCoin: cryptoCoin._id });
      } else {
        coin = new Coin({ customCoin: { name, price } });
      }

      coin.targets = [
        { value: "", hit: false },
        { value: "", hit: false },
        { value: "", hit: false },
      ];

      await coin.save();

      const targetTable = await TargetTable.findById(targetTableId);
      targetTable.coins.push(coin._id);
      await targetTable.save();

      res.json({ message: "Coin added to target table", targetTable });
    } catch (error) {
      console.error("Error adding coin to target table:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/:targetTableId", async (req, res) => {
  try {
    const { targetTableId } = req.params;
    const { userId } = req.body;

    const isUserOwner = await checkUserOwnership(targetTableId, userId);

    if (!isUserOwner) {
      return res.status(403).json({
        message: "User does not own the target table",
        isUserOwner: false,
      });
    }

    const targetTable = await TargetTable.findById(targetTableId);

    if (!targetTable) {
      return res
        .status(404)
        .json({ message: "Target table not found", isUserOwner: isUserOwner });
    }

    const populatedCoins = await populateCoins(targetTable.coins);

    res.json({
      targetTableName: targetTable.name,
      coins: populatedCoins,
      isUserOwner: isUserOwner,
    });
  } catch (error) {
    console.error("Error fetching target table:", error);
    res.status(500).json({ message: "Server error", isUserOwner: false });
  }
});

async function checkUserOwnership(targetTableId, userId) {
  try {
    const targetTable = await TargetTable.findOne({
      _id: targetTableId,
      userId: userId,
    });
    console.log(targetTable);
    return !!targetTable;
  } catch (error) {
    console.error("Error checking user ownership:", error);
    return false;
  }
}
async function populateCoins(coins) {
  const populatedCoins = [];

  for (const coinId of coins) {
    const coin = await Coin.findById(coinId);

    if (!coin) {
      continue;
    }

    let coinDetails;

    if (coin.existingCoin) {
      const cryptoCoin = await Crypto.findById(coin.existingCoin);
      if (cryptoCoin) {
        coinDetails = {
          id: coin._id,
          name: cryptoCoin.name,
          price: cryptoCoin.current_price,
          targets: coin.targets,
        };
      }
    } else {
      coinDetails = {
        id: coin._id,
        name: coin.customCoin.name,
        price: coin.customCoin.price,
        targets: coin.targets,
      };
    }

    populatedCoins.push(coinDetails);
  }

  return populatedCoins;
}

// delete the Target Table
router.delete("/:userId/targetTables/:targetTableId", async (req, res) => {
  try {
    const { userId, targetTableId } = req.params;
    await TargetTable.findByIdAndDelete(targetTableId);
    await User.findByIdAndUpdate(userId, {
      $pull: { targetTables: targetTableId },
    });
    await Coin.deleteMany({ targetTable: targetTableId });
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
router.put("/:targetTableId/updateCoins", async (req, res) => {
  try {
    console.log("check");
    const { userId, targetTableId } = req.body;
    const coinsToUpdate = req.body.coins;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.targetTables.includes(targetTableId)) {
      return res
        .status(403)
        .json({ message: "User does not own the target table" });
    }

    const targetTable = await TargetTable.findById(targetTableId);
    if (!targetTable) {
      return res.status(404).json({ message: "Target table not found" });
    }

    for (const coinData of coinsToUpdate) {
      const { id, price, targets } = coinData;

      const coin = await Coin.findById(id);
      if (!coin) {
        console.error(`Coin with ID ${id} not found`);
        continue;
      }

      // coin.price = price;

      targets.forEach((targetData, index) => {
        coin.targets[index] = targetData;
        // coin.targets[index].hit = targetData.hit;
      });

      await coin.save();
    }

    res.json({ message: "Coins updated successfully" });
  } catch (error) {
    console.error("Error updating coins:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
