const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const podcastRoutes = require("./routes/podcast");
const cors = require("cors");

const corsOptions = {
    origin: "https://podcast-gk2v.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));


require("dotenv").config();
require("./conn/conn");

// Parsing Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", podcastRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port : ${process.env.PORT}`);
  });
