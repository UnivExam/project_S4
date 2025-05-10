const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: { type: String, unique: true },
  dateNaissance: String,
  sexe: String,
  etablissement: String,
  filiere: String,
  role: { type: String, enum: ["etudiant", "enseignant"] },
  password: String,
});

module.exports = mongoose.model("User", userSchema);