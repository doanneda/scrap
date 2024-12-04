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
    
    // If no tag is provided, return all scrapbook pages
    if (!tag) {
      console.log("No tag provided, returning all pages");
      const allScrapPages = await getAllScrapPages(); // Assume this function returns all scrapbook pages
      return res.status(200).json(allScrapPages); // Send all pages as response
    }

    console.log("Tag is:", tag);

    // Search for scrapbook pages that contain the tag in the 'tags' array
    const scrapPages = await ScrapPage.find({
      tags: { $in: [tag] }  // $in checks if the 'tag' exists in the 'tags' array
    }).sort({ timestamp: -1 }); // Sort by timestamp in descending order

    // If no scrap pages found, return all pages as fallback
    if (scrapPages.length === 0) {
      console.log(`No pages found with the tag "${tag}", returning all pages`);
      const allScrapPages = await getAllScrapPages(); // Fetch all pages if no pages found with the tag
      return res.status(200).json(allScrapPages); // Send all pages as response
    }

    // Return the matching scrapbook pages
    res.status(200).json(scrapPages);

  } catch (error) {
    console.error('Error fetching scrapbook pages by tag:', error);
    // Return an error response
    res.status(500).json({ error: 'Failed to fetch scrapbook pages by tag' });
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



const saveStickers = async (req, res) => {
  const { stickers, pageId } = req.body; // Expect stickers in the request body

  try {
    // Find the first ScrapPage document
    const scrapPage = await ScrapPage.findById(pageId);

    if (!scrapPage) {
      return res.status(404).json({ error: 'No ScrapPage found.' });
    }

    // Update the stickers array
    scrapPage.stickers = stickers;

    // Save the updated document
    const updatedPage = await scrapPage.save();

    res.status(200).json(updatedPage);
  } catch (error) {
    console.error('Error saving stickers:', error.message);
    res.status(500).json({ error: 'Failed to save stickers.', details: error.message });
  }
};


const getStickers = async (req, res) => {
  const { pageId } = req.body;

  try {
    const scrapPage = await ScrapPage.findById(pageId);

    if (!scrapPage) {
      return res.status(404).json({ error: 'No ScrapPage found.' });
    }

    // Send the stickers array as the response
    res.status(200).json(scrapPage.stickers);
  } catch (error) {
    console.error('Error fetching stickers:', error.message);
    res.status(500).json({ error: 'Failed to fetch stickers.', details: error.message });
  }
};


const getImages = async (req, res) => {
  const { pageId } = req.body;

  try {
    const scrapPage = await ScrapPage.findById(pageId);

    if (!scrapPage) {
      return res.status(404).json({ error: 'No ScrapPage found.' });
    }

    res.status(200).json(scrapPage.images);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ error: 'Failed to fetch images.', details: error.message });
  }
};


const saveImages = async (req, res) => {
  const { images, pageId } = req.body;

  try {
    const scrapPage = await ScrapPage.findById(pageId);

    if (!scrapPage) {
      return res.status(404).json({ error: 'No ScrapPage found.' });
    }

    scrapPage.images = images;

    // Save the updated document
    const updatedPage = await scrapPage.save();

    res.status(200).json(updatedPage);
  } catch (error) {
    console.error('Error saving images:', error.message);
    res.status(500).json({ error: 'Failed to save images.', details: error.message });
  }
};


module.exports = {
    createScrapPage,
    getAllScrapPages,
    getAllScrapPagesByTag,
    deleteScrapPage,
    saveStickers,
    getStickers,
    saveImages,
    getImages,
};