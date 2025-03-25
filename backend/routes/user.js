const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

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

module.exports = router;