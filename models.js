import { Schema, model } from 'mongoose';

// Contact Schema
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
}, {
  timestamps: true,
});

// Exporting the models

export const Contact = model('Contact', ContactSchema);
