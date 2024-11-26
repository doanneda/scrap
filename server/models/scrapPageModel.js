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
  name: { // user name or id associated with the scrap book page
    required: true,
    type: String,
  },
  binaryImages: { // images for scrap book page 
    required: false,
    type: [String],
      // {
      //   data: { type: Buffer, required: true }, // Binary image data
      //   contentType: { type: String, required: true }, // MIME type (e.g., 'image/png')
      // },
    // ],
  
    // required: false,
    // type: [Object], // Array of strings to store image URLs
      // ex. "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
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