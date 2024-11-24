const mongoose = require('mongoose');

// Example of a model schema to validate and structure documents
const scrapPage = new mongoose.Schema({
  name: { // user name or id associated with the scrap book page
    required: true,
    type: String,
  },
  images: { // images for scrap book page 
    required: false,
    type: [String], // Array of strings to store image URLs
      // ex. "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
  },
  text: { // text for scrap book page
    required: false,
    type: String
  },
  stickers: { // store number, position, and type of stickers
    required: false, 
    type: [
      {
        stickerType: { 
          type: String, required: true 
        }, // sticker type (ex. 'emoji', 'star', etc.)
        position: {
          type: [
            {
              x: { // x position in percentage
                type: Number, 
                required: true 
              }, 
              y: { // y position in percentage
                type: Number, 
                required: true 
              }, 
            },
          ],
          // validate: {
          //   validator: function (positions) {
          //     return positions.length === this.count;
          //   },
          //   message: 'Number of positions must match the count of stickers.',
          // },
        },
      },
    ],
  }
});

module.exports = mongoose.model('Example', scrapPage);