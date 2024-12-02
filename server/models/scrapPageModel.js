const mongoose = require('mongoose');

const stickerSchema = new mongoose.Schema({
  stickerType: String,
  position: {
    x: Number,
    y: Number,
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
  binaryImages: { // images for scrap book page 
    required: false,
    type: [ String ]
  },
  description: { // text for scrap book page
    required: false,
    type: String
  },
  color: {
    required: false, // default can be white
    type: String, // pastel colors 
  },
  stickers: [stickerSchema],
  tags: {
    required: false,
    type: [ String ]
  }
});

module.exports = mongoose.model('ScrapPage', scrapPageSchema);