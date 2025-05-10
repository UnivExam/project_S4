const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');

// POST /api/exams - create a new exam
router.post('/', async (req, res) => {
  const { titre, description, publicCible } = req.body;

  if (!titre || !description || !publicCible) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const lienUnique = Math.random().toString(36).substr(2, 9);
    const newExam = new Exam({
      titre,
      description,
      publicCible,
      lienUnique
    });

    await newExam.save();

    res.status(201).json({
      message: "Examen créé avec succès.",
      lien: `${req.protocol}://${req.get('host')}/exam/${lienUnique}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});
router.get('/', async (req, res) => {
    try {
      const exams = await Exam.find(); // Récupère tous les examens dans MongoDB
      res.status(200).json(exams);     // Envoie la liste au frontend ou à Postman
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  });
module.exports = router;
