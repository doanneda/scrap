const ScrapPage = require('../models/scrapPageModel');

const createScrapPage = async (req, res) => {
  const newScrapPage = new ScrapPage(req.body); // create a new instance of ScrapPage 
  try {
    const savedScrapPage = await newScrapPage.save(newScrapPage);  // save the scrap page to Mongo
    res.send(savedScrapPage);
    // res.status(201).json(savedScrapPage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving the scrap page' });
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
  const { pageId, stickers } = req.body; // Expect pageId and stickers in the request body

  try {
    const scrapPage = await ScrapPage.findById(pageId);

    if (!scrapPage) {
      return res.status(404).json({ error: 'ScrapPage not found' });
    }

    scrapPage.stickers = stickers;

    const updatedPage = await scrapPage.save();

    res.status(200).json(updatedPage);
  } catch (error) {
    console.error('Error saving stickers:', error);
    res.status(500).json({ error: 'Failed to save stickers' });
  }
};


module.exports = {
    createScrapPage,
    getAllScrapPages,
    saveStickers,
};