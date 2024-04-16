const path = require("path");
const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cryptoRoutes = require("./routes/crypto");
const cryptoProfileRoutes = require("./routes/cryptoprofile");
const favoriteCoinRoutes = require("./routes/favoriteCoin");

const cors = require("cors");
const app = express();
app.use(cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://glassisaif:onJwZJGPsumzGsEw@cluster0.szu8ryk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/file-folder", express.static(path.join("file-folder")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use("/api/users", userRoutes);
app.use("/api/cryptos", cryptoRoutes);
app.use("/api/cryptosProfiles", cryptoProfileRoutes);
app.use("/api/favoriteCoins", favoriteCoinRoutes);

module.exports = app;
