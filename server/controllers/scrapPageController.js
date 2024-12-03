const ScrapPage = require('../models/scrapPageModel');
const { User } = require('../models/User'); // Import the User model

const createScrapPage = async (req, res) => {
  const { user } = req; // Get the authenticated user from the request

  try {
    // Fetch the user's username
    const foundUser = await User.findById(user._id);
    if (!foundUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Create a new scrap page
    const newScrapPage = new ScrapPage({
      ...req.body,
      user: user._id,
      username: foundUser.username, // Include the username directly
    });

    // Save the scrap page
    const savedScrapPage = await newScrapPage.save();

    // Update the user's scrapPages array
    await User.findByIdAndUpdate(user._id, { $push: { scrapPages: savedScrapPage._id } });

    // Respond with the saved scrap page
    res.status(201).send(savedScrapPage);
  } catch (err) {
    console.error('Error saving the scrap page:', err);
    res.status(500).send({ message: 'Error saving the scrap page' });
  }
};

const getAllScrapPages = async (req, res) => {
  try {
    const scrapPages = await ScrapPage.find().sort({ timestamp: -1 }); // Sort by timestamp in descending order
    

    res.status(200).json(scrapPages);
  } catch (error) {
    console.error('Error fetching scrapbook pages:', error);
    res.status(500).json({ error: 'Failed to fetch scrapbook pages' });
  }
}

const getAllScrapPagesByTag = async (req, res) => {
  try {
     // Get the tag from the request (assuming it's passed as a query parameter)
    const { tag } = req.query; // Use req.params if you're passing the tag in the URL path
    
    if (!tag) {
      getAllScrapPages()
    }

    // Search for scrapbook pages that contain the tag in the 'tags' array
    const scrapPages = await ScrapPage.find({
      tags: { $in: [tag] }  // $in checks if the 'tag' exists in the 'tags' array
    }).sort({ timestamp: -1 }); // Sort by timestamp in descending order

    // If no scrap pages found
    if (scrapPages.length === 0) {
      getAllScrapPages()
      return res.status(404).json({ message: 'No scrapbook pages found with that tag' });
    }

    // Return the matching scrapbook pages
    res.status(200).json(scrapPages);
  } catch (error) {
    getAllScrapPages()
    console.error('No scrapbook pages found by tags:', error);
    // res.status(500).json({ error: 'Failed to fetch scrapbook pages by tag' });
  }
}

const deleteScrapPage = async (req, res) => {
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
      await scrapPage.remove();

      res.status(200).send({ message: 'ScrapPage deleted successfully' });
  } catch (err) {
      console.error('Error deleting ScrapPage:', err);
      res.status(500).send({ message: 'Error deleting ScrapPage' });
  }
};


module.exports = {
    createScrapPage,
    getAllScrapPages,
    getAllScrapPagesByTag,
    deleteScrapPage
};