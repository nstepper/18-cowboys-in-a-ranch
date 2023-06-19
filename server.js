const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/socialnetworkdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Middleware
app.use(express.json());

// Define your API routes here

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
