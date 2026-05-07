const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Debug: Log all environment variables
console.log('Available env vars:', Object.keys(process.env));
console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('MONGO_URL:', process.env.MONGO_URL);

const mongoUrl = process.env.MONGODB_URL || process.env.MONGO_URL;
console.log('Using URL:', mongoUrl);

mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('CityGo API is running');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));