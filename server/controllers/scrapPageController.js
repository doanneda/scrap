const ScrapPage = require('../models/scrapPageModel');
const { User } = require('../models/User'); // Import the User model

const createScrapPage = async (req, res) => {
  const { user } = req; // Get the authenticated user from the request

  const newScrapPage = new ScrapPage({
    ...req.body,  // Add the body data
    user: user._id, // Associate the ScrapPage with the logged-in user
  });

  try {
    // Save the scrap page to the database
    const savedScrapPage = await newScrapPage.save();

    // Update the user's scrapPages array by adding the new scrap page's ID
    await User.findByIdAndUpdate(user._id, { $push: { scrapPages: savedScrapPage._id } });

    // Send the saved scrap page as the response
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

module.exports = {
    createScrapPage,
    getAllScrapPages,
    getAllScrapPagesByTag
};