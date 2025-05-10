// Importations
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const User = require('./models/user');

// Configuration
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connexion à MongoDB réussie"))
.catch(err => console.error("❌ Erreur de connexion MongoDB :", err));

// Route pour l'inscription
// Route pour l'inscription
app.post('/api/signup', async (req, res) => {
  const { nom, prenom, email, password, dateNaissance, sexe, etablissement, filiere, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email déjà utilisé." });

    const user = new User({ nom, prenom, email, password, dateNaissance, sexe, etablissement, filiere, role });
    await user.save();

    res.status(201).json({ 
      message: "Inscription réussie.",
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        dateNaissance: user.dateNaissance,
        sexe: user.sexe,
        etablissement: user.etablissement,
        filiere: user.filiere,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// Route pour la connexion
app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, password, role });
    if (!user) return res.status(400).json({ message: "Identifiants incorrects." });

    res.status(200).json({ 
      message: "Connexion réussie", 
      redirect: role === "etudiant" ? "espace_etudiant.html" : "espace_enseignant.html" 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// 🌟 Route pour récupérer TOUS les utilisateurs (important pour éviter l'erreur 404)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(🚀 Serveur lancé sur le port ${PORT});
});