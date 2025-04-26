const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./router/auth');
const cors = require('cors'); 

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors());
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
  

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
