const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  enonce: { type: String, required: true },
  public: { type: String },
  media: {
    image: String,
    audio: String,
    video: String
  },
  note: { type: Number, required: true },
  duree: { type: Number, required: true },
  reponseDirecte: {
    valeur: String,
    tolerance: Number
  },
  qcm: {
    options: [String],
    bonnesReponses: [Number]
  }
});

module.exports = mongoose.model('Question', questionSchema);
