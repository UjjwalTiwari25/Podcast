const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


// User Signup Route
router.post("/sign-up", async (req, res) => {
    console.log("Signup request body:", req.body);
    try {
      const { username, email, password } = req.body;
  
      // Validate required fields
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }
  
      // Validate username length
      if (username.length < 4) {
        return res.status(400).json({
          success: false,
          message: "Username must be at least 4 characters"
        });
      }
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format"
        });
      }
  
      // Check if username or email exists
      if (await User.findOne({ username })) {
        return res.status(400).json({
          success: false,
          message: "Username already exists"
        });
      }
  
      if (await User.findOne({ email })) {
        return res.status(400).json({
          success: false,
          message: "Email already exists"
        });
      }
  
      // Validate password length
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters"
        });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create user with name field added
      const newUser = new User({
        username,
        email,
        password: hashedPassword
      });
  
      // Save user in database
      await newUser.save();
  
      res.status(201).json({
        success: true,
        message: "User created successfully"
      });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
      });
    }
  });
  
  // User Login Route
  router.post("/log-in", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email instead of username
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        {
          id: existingUser._id,
          email: existingUser.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "14d" }
      );

      res.cookie("prodcastToken", token, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
        secure: process.env.NODE_ENV === "development",
        sameSite: "None",
      });
  
      res.status(200).json({
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        message: "Logged in successfully"
      });

      
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // User LogOut Route
router.post("/log-out", (req, res) => {
  res.clearCookie("prodcastToken", {
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out" });
});

//check cookie present or not
router.get("/check-cookie", (req, res) => {
  const token = req.cookies.prodcastToken;
  if(token){
    res.status(200).json({ message :true });
  }
  res.status(200).json({ message :false });
});


module.exports = router;