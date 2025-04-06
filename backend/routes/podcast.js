const express = require('express');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/multer');
const Category = require('../models/category');
const Podcast = require('../models/podcast');
const User = require('../models/user');  // ✅ Missing Import Added

const router = express.Router();

// Add Podcast
router.post('/add-podcast', authMiddleware, upload, async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const frontImage = req.files["frontImage"][0].path;
        const audioFile = req.files["audioFile"][0].path;

        if (!title || !description || !category || !frontImage || !audioFile) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const { user } = req;
        const cat = await Category.findOne({ categoryName: category });

        if (!cat) {
            return res.status(400).json({ message: 'Category not found' });
        }

        const catid = cat._id;
        const userid = user._id;

        const newPodcast = new Podcast({
            title,
            description,
            category: catid,
            frontImage,
            audioFile,
            user: userid
        });

        await newPodcast.save();

        await Category.findByIdAndUpdate(catid, { 
            $push: { podcasts: newPodcast._id }
        });

        await User.findByIdAndUpdate(userid, { 
            $push: { podcasts: newPodcast._id }
        });

        res.status(200).json({ message: 'Podcast added successfully' });

    } catch (error) {
        console.error('Error adding podcast:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get All Podcasts
router.get('/get-all-podcasts', async (req, res) => {
    try {
        const podcasts = await Podcast.find()
            .populate("category")  // ✅ Fixed Typo ("catergory" → "category")
            .sort({ createdAt: -1 });

        return res.status(200).json({ data: podcasts });

    } catch (error) {
        console.error('Error fetching podcasts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get User Podcasts
router.get('/get-user-podcasts', authMiddleware, async (req, res) => {
    try {
        const { user } = req;
        const userid = user._id;

        const data = await User.findById(userid)
            .populate({ 
                path: "podcasts", 
                populate: { path: "category" }
            })
            .select("-password");

        if (data && data.podcasts) {
            data.podcasts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return res.status(200).json({ data: data.podcasts });

    } catch (error) {
        console.error('Error fetching user podcasts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get Podcast by ID
router.get('/get-podcast/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const podcast = await Podcast.findById(id).populate("category");

        if (!podcast) {
            return res.status(404).json({ message: 'Podcast not found' });
        }

        return res.status(200).json({ data: podcast });

    } catch (error) {
        console.error('Error fetching podcast:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get Podcasts by Category
router.get('/category/cat', async (req, res) => {
    try {
        const { cat } = req.query;  // ✅ Fix: Extracting category from query instead of params

        if (!cat) {
            return res.status(400).json({ message: 'Category is required' });
        }

        const categories = await Category.find({ categoryName: cat })
            .populate({
                path: "podcasts",
                populate: { path: "category" }
            });

        let podcasts = [];
        categories.forEach((category) => {
            podcasts = [...podcasts, ...category.podcasts];
        });

        return res.status(200).json({ data: podcasts });  // ✅ Fix: Corrected return variable

    } catch (error) {
        console.error('Error fetching podcasts by category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
