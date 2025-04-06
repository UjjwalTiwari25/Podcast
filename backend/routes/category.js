const router = require('express').Router();
const Category = require('../models/category');

// Add category
router.post("/add-category", async (req, res) => {
    try {
        console.log("Received request body:", req.body); // Debugging log

        const { categoryName } = req.body;

        // Validate input
        if (!categoryName) {
            return res.status(400).json({ error: "categoryName is required" });
        }

        // Create and save the category
        const category = new Category({ categoryName });
        await category.save();

        return res.status(201).json({ message: "Category added successfully", category });
    } catch (error) {
        console.error("Error saving category:", error.message);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
