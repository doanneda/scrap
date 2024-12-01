const express = require('express');
const profileRouter = express.Router();
const { User } = require('../models/User');
const ScrapPage = require('../models/scrapPageModel');

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

// Update a scrapbook page - dont edit but make it deletable instead
profileRouter.put('/users/:userId/pages/:pageId', async (req, res) => {
  try {
      const { userId, pageId } = req.params;

      // Check if the scrapbook page belongs to the user
      const page = await ScrapPage.findById(pageId);
      if (!page) {
          return res.status(404).json({ message: 'Page not found' });
      }

      if (page.userId.toString() !== userId) {
          return res.status(403).json({ message: 'Unauthorized to edit this page' });
      }

      // Update the page with new data
      Object.assign(page, req.body); // Be careful with what data is allowed to be updated
      await page.save();

      res.json({ message: 'Page updated successfully', page });
  } catch (err) {
      console.error('Error updating scrapbook page:', err);
      res.status(500).json({ message: 'Error updating scrapbook page' });
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
