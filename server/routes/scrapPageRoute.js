const express = require('express');

// const scrapPage = require('../models/scrapPageModel'); // import the schema
const scrapPageRouter = express.Router(); // get the route
const scrapPageController = require('../controllers/scrapPageController'); // get the controller 

scrapPageRouter.post('/post', scrapPageController.createScrapPage);

module.exports = scrapPageRouter;
