const User = require('../models/User');
const ScrapPage = require('../models/scrapPageModel');

// Get user with their scrap pages populated
const getUserWithPages = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('scrapPages');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new scrap page and associate it with the user
const addScrapPageToUser = async (req, res) => {
    try {
        const { userId, binaryImages, description, color, stickers } = req.body;

        // Create the new scrap page
        const newScrapPage = new ScrapPage({
            user: userId,
            binaryImages,
            description,
            color,
            stickers,
            tags,
            timestamp
        });

        await newScrapPage.save();
        // Add scrap page to user's scrapPages array
        const user = await User.findById(userId);
        user.scrapPages.push(newScrapPage._id);
        await user.save();

        res.status(201).json(newScrapPage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUserWithPages, addScrapPageToUser };
