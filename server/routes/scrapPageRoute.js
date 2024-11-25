const express = require('express');

// const scrapPage = require('../models/scrapPageModel'); // import the schema
const scrapPageRouter = express.Router(); // get the route
const scrapPageController = require('../controllers/scrapPageController'); // get the controller 

scrapPageRouter.post('/post', scrapPageController.createScrapPage);

// scrapPageRouter.get('/', async (req, res) => {
//     try {
//       const scrapPages = await scrapPage.find(); // fetch all scrap pages from the database
//       res.status(200).json(scrapPages); // return all scrap pages as JSON
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error fetching scrap pages' });
//     }
//   });

// scrapPageRouter.get('/get', async (req, res) => {
//   try {
//     res.send(randomPrompt);
//   } catch (err) {
//     console.error(err);
//     // Handle the error appropriately
//     res.status(500).send('Internal Server Error');
//   }
// });

module.exports = scrapPageRouter;
