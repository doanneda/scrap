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

  // const newScrapPage = new ScrapPage({
  //   ...req.body,  // Add the body data
  //   user: user._id, // Associate the ScrapPage with the logged-in user
  // });

  // try {
  //   // Save the scrap page to the database
  //   const savedScrapPage = await newScrapPage.save();
    

  //   // Update the user's scrapPages array by adding the new scrap page's ID
  //   await User.findByIdAndUpdate(user._id, { $push: { scrapPages: savedScrapPage._id } });

  //   // Send the saved scrap page as the response
  //   res.status(201).send(savedScrapPage);
  // } catch (err) {
  //   console.error('Error saving the scrap page:', err);
  //   res.status(500).send({ message: 'Error saving the scrap page' });
  // }
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

module.exports = {
    createScrapPage,
    getAllScrapPages,
};