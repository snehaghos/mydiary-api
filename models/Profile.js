const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  bio: {
    type: String,
    maxlength: 500, 
  },
  avatar: {
    type: String, 
  },
  socialLinks: {
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
  },
}, { timestamps: true }); 
module.exports = mongoose.model('Profile', ProfileSchema);