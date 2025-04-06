const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Category name is required"], // Custom error message
      unique: true,
      trim: true, // Removes extra spaces
    },
    podcasts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Podcast", // Ensure this matches your actual model name
      }
    ]
  },
  { timestamps: true }
);

// Explicitly define the collection name to avoid confusion
module.exports = mongoose.model("Category", categorySchema, "categories");
