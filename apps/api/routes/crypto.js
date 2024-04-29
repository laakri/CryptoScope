const express = require("express");
const router = express.Router();
const Crypto = require("../models/crypto");
const TargetTable = require("../models/targetTable");
const Coin = require("../models/coin");
const cron = require("node-cron");
const axios = require("axios");

const updateTargetHitState = async () => {
  try {
    const targetTables = await TargetTable.find().populate("coins");

    targetTables.forEach(async (targetTable) => {
      targetTable.coins.forEach(async (coin) => {
        if (coin.existingCoin) {
          const coinInfos = await coin.populate("existingCoin");
          coin.targets.forEach(async (target) => {
            if (
              coinInfos.existingCoin.current_price >=
                parseFloat(target.value) &&
              !target.hit
            ) {
              target.hit = true;
              console.log(target.hit);
            }
          });
          await coin.save();
        }
      });
    });

    console.log("Target hit state updated successfully.");
  } catch (error) {
    console.error("Error updating target hit state:", error);
  }
};

const fetchDataAndUpdate = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    );

    const data = response.data;

    await Promise.all(
      data.map(async (coin) => {
        await Crypto.findOneAndUpdate({ id: coin.id }, coin, {
          upsert: true,
        });
      })
    );
    await updateTargetHitState();

    console.log("Data updated successfully.");
  } catch (error) {
    console.error("Error fetching and updating data:", error);
  }
};

// Schedule job to fetch and update data every 10 minutes
cron.schedule("*/1 * * * *", fetchDataAndUpdate);

// Route to get coin prices
router.get("/coin-prices", async (req, res) => {
  try {
    const coins = await Crypto.find();
    res.json(coins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SSE endpoint to send real-time updates
router.get("/updates", async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const { page = 0, search } = req.query;
    const limit = 10;

    let query = {};
    if (search) {
      query = {
        $or: [{ name: { $regex: search, $options: "i" } }],
      };
    }

    const totalCoins = await Crypto.countDocuments(query);
    const totalPages = Math.ceil(totalCoins / limit);

    const coins = await Crypto.find(query)
      .skip(page * limit)
      .limit(limit);

    const data = JSON.stringify({ coins, totalCoins, totalPages });
    res.write(`data: ${data}\n\n`);
  } catch (error) {
    console.error("Error sending updates:", error);
  }
});

router.get("/top-trending-coins", async (req, res) => {
  try {
    const topTrendingCoins = await Crypto.find()
      .sort({ price_change_24h: -1 })
      .limit(8);

    const simplifiedCoins = topTrendingCoins.map((coin) => ({
      symbol: coin.symbol,
      image: coin.image,
      current_price: coin.current_price,
      price_change_24h: coin.price_change_24h || 0,
    }));

    res.json(simplifiedCoins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
