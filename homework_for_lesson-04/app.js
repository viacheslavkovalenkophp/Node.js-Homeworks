const express = require('express');
const app = express();
const PORT = 3100;

// Task 04
app.get('/', (req, res) => {
  res.send('home');
});

// Task 05
app.get('/json', (req, res) => {
  res.json({ title: "express", success: 1 });
});

// Task 06
app.get('/redirect', (req, res) => {
  res.redirect('/json');
});

// Task 07
app.get('/goods/:id', (req, res) => {
  const { id } = req.params;
  res.json({ url: "goods", id: id });
});

// Task 08
app.get('/q', (req, res) => {
  res.json(req.query);
});

// Task 09
app.get('/random', (req, res) => {
  const { min, max } = req.query;
  const random = Math.floor(Math.random() * (max - min + 1)) + parseInt(min);
  res.json({ min: parseInt(min), max: parseInt(max), random: random });
});

// Task 10
app.use((req, res) => {
  res.status(404).send('not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});