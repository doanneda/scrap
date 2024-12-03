const mongoose = require('mongoose');

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
        },
      },
    ],
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