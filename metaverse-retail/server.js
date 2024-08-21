const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Import User model
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/metaverse-retail', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const user = new User({ name, email, password, phone });
    await user.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ error: 'Invalid credentials.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in.' });
  }
});

// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
