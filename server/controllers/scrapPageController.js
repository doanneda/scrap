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

module.exports = {
  createScrapPage,
};

  // const newScrapPage = new ScrapPage(req.body); // create a new instance of ScrapPage 
  // try {
  //   const savedScrapPage = await newScrapPage.save(newScrapPage);  // save the scrap page to Mongo
  //   res.send(savedScrapPage);
  //   // res.status(201).json(savedScrapPage);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: 'Error saving the scrap page' });
  // }

module.exports = {
    createScrapPage,
};