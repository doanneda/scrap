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

exports.getAllScrapPages = async (req, res) => {
  try {
    const scrapPages = await ScrapPage.find();

    // Convert binaryImages to Base64 for all documents
    const formattedScrapPages = scrapPages.map((page) => ({
      ...page._doc,
      binaryImages: page.binaryImages.map((binaryImage) =>
        `data:image/jpeg;base64,${binaryImage.toString('base64')}`
      ),
    }));

    res.status(200).json(formattedScrapPages);
  } catch (error) {
    console.error('Error fetching scrapbook pages:', error);
    res.status(500).json({ error: 'Failed to fetch scrapbook pages' });
  }
  // try {
  //   const scrapPages = await ScrapPage.find(); // Fetch all documents
  //   res.status(200).json(scrapPages); // Send them as JSON response
  // } catch (error) {
  //   console.error('Error fetching scrapbook pages:', error);
  //   res.status(500).json({ error: 'Failed to fetch scrapbook pages' });
  // }
}

module.exports = {
    createScrapPage,
    getAllScrapPages,
};