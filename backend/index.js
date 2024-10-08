const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));


// MongoDB connection URI
const mongoURI = 'mongodb+srv://collaborativejournalteamwebdev:CQ4ZWsyKJldkVAIn@collaborativejournal.itlf7.mongodb.net/?retryWrites=true&w=majority&appName=CollaborativeJournal'
// Connect to MongoDB
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/test', async (req, res) => {
  try {
      await client.connect();
      const database = client.db('test');
      const collection = database.collection('test');
      const document = await collection.findOne({});
      res.json(document.test);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching document');
  } finally {
      await client.close();
  }
});

app.get('/doubleTest', async (req, res) => {
  res.status(200).send('Double test');
});


// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Protect the /main route
app.get('/main', (req, res) => {
  res.send('Welcome to the main page');
});

// Start the server
const PORT = process.env.PORT || 5008;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});