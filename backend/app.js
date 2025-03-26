const express = require('express');
const app = express();
const userRoutes = require("./routes/user");
require("dotenv").config();
require("./conn/conn");

// Parsing Middleware
app.use(express.json());

// API Routes
app.use("/api/v1", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port : ${process.env.PORT}`);
  });
