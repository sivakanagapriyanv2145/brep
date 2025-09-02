const mongoose = require('mongoose');

const ProjectPhotoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
});

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['home', 'commercial', 'hospitality', 'interiors'],
    required: true,
  },
  sqft: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  mainPhoto: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  descriptionPhotos: [ProjectPhotoSchema],
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
