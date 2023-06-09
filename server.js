const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Router imports
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.get("/", (req, res) => {
  res.send("Welcome to HomePage");
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

// Routes middleware
app.use("/product", productRoutes);
app.use("/user", userRoutes);

// Connect to DB and start server
const PORT = 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  })
  .catch((err) => {
    console.error(err);
  });
