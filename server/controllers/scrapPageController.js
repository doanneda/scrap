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

    // Update the stickers array
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
    saveStickers,
    getStickers,
    saveImages,
    getImages,
};