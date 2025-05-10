const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  publicCible: { type: String, required: true },
  lienUnique: { type: String, required: true, unique: true },
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', examSchema);
