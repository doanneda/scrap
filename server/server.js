require('dotenv').config();

// module imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

// route imports
// const exampleRouter = require('./routes/exampleRoute.js');
const scrapPageRouter = require('./routes/scrapPageRoute.js')

// connect to MongoDB 
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();


// start Node Express server
const app = express();
app.use(cors());
app.use(express.json());

// API routes
// app.use('/test', exampleRouter);

// use the scrap page route
app.use('/scrap-pages', scrapPageRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});