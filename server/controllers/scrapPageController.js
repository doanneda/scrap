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
    const scrapPages = await ScrapPage.find();
    

    res.status(200).json(scrapPages);
  } catch (error) {
    console.error('Error fetching scrapbook pages:', error);
    res.status(500).json({ error: 'Failed to fetch scrapbook pages' });
  }
}

// const searchAllScrapPagesByTag = async (req, res) => {
//   try {

//   } catch (error) {
//     console.error('Error fetching scrapbook pages by tags:', error);
//   }
// }

module.exports = {
    createScrapPage,
    getAllScrapPages,
    // searchAllScrapPagesByTag
};