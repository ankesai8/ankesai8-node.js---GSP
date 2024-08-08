const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFilePath = path.join(__dirname, './data.json');
const indexRouter = require('./data.json');


// Helper function to read data from JSON file
const readData = () => {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
};

// Helper function to write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Route to add data
router.post('/add-data', (req, res) => {
  const newData = req.body;
  const data = readData();
  data.push(newData);
  writeData(data);
  res.status(201).json({ message: 'Data added successfully', data: newData });
});

// Route to get all data
router.get('/all', (req, res) => {
  const data = readData();
  res.json(data);
});

// Route to get specific data by name
router.get('/get/:name', (req, res) => {
  const name = req.params.name;
  const data = readData();
  const item = data.find(d => d.name === name);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// Route to delete specific data by name
router.delete('/delete/:name', (req, res) => {
  const name = req.params.name;
  let data = readData();
  const originalLength = data.length;
  data = data.filter(d => d.name !== name);
  if (data.length < originalLength) {
    writeData(data);
    res.json({ message: 'Data deleted successfully' });
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

module.exports = router;