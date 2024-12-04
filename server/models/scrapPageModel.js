const mongoose = require('mongoose');

const stickerSchema = new mongoose.Schema({
  stickerType: String,
  position: {
    x: Number,
    y: Number,
  },
});

const imageSchema = new mongoose.Schema({
  base64Data: String,
  position: {
    x: Number,
    y: Number,
  },
  size: {
    width: Number,
    height: Number,
  },
});

const scrapPageSchema = new mongoose.Schema({
  // name: { // user name or id associated with the scrap book page
  //   required: true,
  //   type: String,
  // },
  user: { // Reference to the User model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Match the name of the User model
    required: true,
  },
  username: {
    type: String, // Store the username directly
    required: true,
  },
  images: {
    type: [imageSchema],
  },
  description: { // text for scrap book page
    required: false,
    type: String
  },
  color: {
    required: false, // default can be white
    type: String, // pastel colors 
  },
  stickers: {
    type: [stickerSchema],
  },
  tags: {
    required: false,
    type: [ String ]
  },
  timestamp: {
    required: false, 
    type: Date
  }
});

module.exports = mongoose.model('ScrapPage', scrapPageSchema);