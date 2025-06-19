const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();
require("./conn/conn");

const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const podcastRoutes = require("./routes/podcast");

// Parsing Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Config for Frontend + Localhost Dev
app.use(cors({
  origin: ['https://podcast-gk2v.onrender.com', 'http://localhost:5173'],
  credentials: true
}));

// Serve static uploads folder
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", podcastRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port : ${process.env.PORT}`);
});
