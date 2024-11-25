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

module.exports = {
    createScrapPage,
};