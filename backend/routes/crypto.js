const express = require("express");
const router = express.Router();
const Crypto = require("../models/crypto");
const cron = require("node-cron");

// Function to fetch and update cryptocurrency data
const fetchDataAndUpdate = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    );
    const data = await response.json();

    // Update existing documents in the collection
    await Promise.all(
      data.map(async (coin) => {
        await Crypto.findOneAndUpdate({ id: coin.id }, coin, { upsert: true });
      })
    );

    console.log("Data updated successfully.");
  } catch (error) {
    console.error("Error fetching and updating data:", error);
  }
};

// Schedule job to fetch and update data every 10 minutes
cron.schedule("*/10 * * * *", fetchDataAndUpdate);

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
router.get("/updates", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendUpdates = async () => {
    try {
      const coins = await Crypto.find();
      const data = JSON.stringify(coins);
      res.write(`data: ${data}\n\n`);
    } catch (error) {
      console.error("Error sending updates:", error);
    }
  };

  // Send initial data to client
  sendUpdates();

  // Send updates every 10 seconds
  const intervalId = setInterval(sendUpdates, 10000);

  // Clean up on client disconnect
  req.on("close", () => {
    clearInterval(intervalId);
    console.log("Client disconnected");
  });
});

module.exports = router;
