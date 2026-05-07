const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('CityGo API is running');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));