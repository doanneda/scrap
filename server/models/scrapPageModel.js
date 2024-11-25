const mongoose = require('mongoose');

const scrapPageSchema = new mongoose.Schema({
  name: { // user name or id associated with the scrap book page
    required: true,
    type: String,
  },
  images: { // images for scrap book page 
    required: false,
    type: [
      {
        data: { type: Buffer, required: true }, // Binary image data
        contentType: { type: String, required: true }, // MIME type (e.g., 'image/png')
      },
    ],
  
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