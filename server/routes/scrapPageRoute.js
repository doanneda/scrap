const express = require('express');
const auth = require('../middleware/auth'); 

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

scrapPageRouter.get('/', scrapPageController.getAllScrapPages);

scrapPageRouter.get('/by-tag', scrapPageController.getAllScrapPagesByTag);

module.exports = scrapPageRouter;
