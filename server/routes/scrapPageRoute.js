const express = require('express');
//new added stuff
const auth = require('../middleware/auth'); 
const userController = require('../controllers/userController');

// const scrapPage = require('../models/scrapPageModel'); // import the schema
const scrapPageRouter = express.Router(); // get the route
const scrapPageController = require('../controllers/scrapPageController'); // get the controller 

// scrapPageRouter.post('/post', scrapPageController.createScrapPage);
scrapPageRouter.post('/post', auth, scrapPageController.createScrapPage);

scrapPageRouter.get('/user-pages', auth, async (req, res) => {
  try {
    const pages = await ScrapPage.find({ userId: req.user._id });
    res.status(200).send(pages);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error fetching scrapbook pages' });
  }
});

// new added stuff
// scrapPageRouter.get('/user/:id', userController.getUserWithPages); // Get user with their scrap pages
// scrapPageRouter.post('/add-page', userController.addScrapPageToUser); // Create a scrap page for a user

module.exports = scrapPageRouter;
