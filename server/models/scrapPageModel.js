const mongoose = require('mongoose');

const scrapPageSchema = new mongoose.Schema({
  // name: { // user name or id associated with the scrap book page
  //   required: true,
  //   type: String,
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference the User model
    ref: 'User',
    required: true,
  },
  binaryImages: { // images for scrap book page 
    required: false,
    type: [ Buffer ]
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
  }
});

module.exports = mongoose.model('ScrapPage', scrapPageSchema);