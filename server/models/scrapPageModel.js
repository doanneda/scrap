const mongoose = require('mongoose');


const stickerSchema = new mongoose.Schema({
  stickerType: {
    type: String,
    required: true,
  },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
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
  stickers: {
    type: [stickerSchema], // Embedded array of stickers
    default: [], // Default to an empty array if no stickers are saved
  },
  
});

module.exports = mongoose.model('ScrapPage', scrapPageSchema);