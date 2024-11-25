const ScrapPage = require('../models/scrapPageModel');

const createScrapPage = async (req, res) => {
  const newScrapPage = new ScrapPage(req.body); // create a new instance of ScrapPage 
  const savedScrapPage = await newScrapPage.save(newScrapPage);  // save the scrap page to Mongo
    res.send(savedScrapPage);
  // NNEWWW CODE 
  // try {
  //   const { binaryImages, description, color, stickers } = req.body;

  //   // Assuming `req.user.id` is available via middleware (e.g., JWT authentication)
  //   const userId = req.user.id;

  //   // Create a new ScrapPage
  //   const newScrapPage = new ScrapPage({
  //     user: userId,
  //     binaryImages,
  //     description,
  //     color,
  //     stickers,
  //   });

  //   const savedScrapPage = await newScrapPage.save(newScrapPage);  // save the scrap page to Mongo
  //   res.send(savedScrapPage);
  //   // res.status(201).json(savedScrapPage);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: 'Error saving the scrap page' });
  // }
};

module.exports = {
    createScrapPage,
};