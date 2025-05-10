const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Ajouter une question
router.post('/', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtenir toutes les questions
router.get('/', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// Supprimer une question
router.delete('/:id', async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ message: 'Question supprimée' });
});

// Modifier une question
router.put('/:id', async (req, res) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(question);
});

module.exports = router;
