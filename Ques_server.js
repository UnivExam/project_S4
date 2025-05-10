require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const questionRoutes = require('./routes/questions');
app.use('/api/questions', questionRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connecté à MongoDB Atlas');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`🚀 Serveur lancé sur le port ${process.env.PORT || 5000}`)
  );
}).catch(err => console.error('❌ Erreur MongoDB :', err));
