const express = require('express');
const profileRouter = express.Router();
const { User } = require('../models/User');
const ScrapPage = require('../models/scrapPageModel');
const auth = require("../middleware/auth");

// Get user profile and their scrapbook pages
profileRouter.get('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by ID and populate the scrapbook pages
        const user = await User.findById(userId).populate('scrapPages');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user); // Send the user data (including scrapPages)
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
});

// DELETE route to delete a scrapbook page from the profile and database
profileRouter.delete('/users/:userId/pages/:pageId', auth, async (req, res) => {
    const { userId, pageId } = req.params;

    try {
        // Find the ScrapPage by its ID
        const scrapPage = await ScrapPage.findById(pageId);

        if (!scrapPage) {
            return res.status(404).send({ message: 'ScrapPage not found' });
        }

        // Ensure the logged-in user is the same as the user who created the ScrapPage
        if (scrapPage.user.toString() !== userId) {
            return res.status(403).send({ message: 'You are not authorized to delete this page' });
        }

        // Remove the scrap page from the user's scrapPages array
        await User.findByIdAndUpdate(userId, { $pull: { scrapPages: pageId } });

        // Delete the scrap page from the ScrapPage collection
        await ScrapPage.findByIdAndDelete(pageId);

        res.status(200).send({ message: 'ScrapPage deleted successfully' });
    } catch (err) {
        console.error('Error deleting ScrapPage:', err);
        res.status(500).send({ message: 'Error deleting ScrapPage' });
    }
});

module.exports = profileRouter;


// const express = require('express');
// const profileRouter = express.Router();
// const { User } = require('../models/User');
// const ScrapPage = require('../models/scrapPageModel');

// // Get user profile and their scrapbook pages
// profileRouter.get('/users/:userId', async (req, res) => {
//     try {
//         const { userId } = req.params;

//         // Find the user by ID
//         const user = await User.findById(userId).populate('scrapPages'); // Populate the scrapPages field

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json(user); // Send the user data (including scrapPages)
//     } catch (err) {
//         console.error('Error fetching user profile:', err);
//         res.status(500).json({ message: 'Error fetching user profile' });
//     }
// });

// module.exports = profileRouter;
