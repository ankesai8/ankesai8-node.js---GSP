const express = require('express');
const router = express.Router();
// const json_data = require("./data.json")
const path = require('path');

const json_data = require(path.join(__dirname, '../data/data.json'));

const fs = require('fs');

const dataFilePath = path.join(__dirname, '../data/data.json');
let jsonData = require(dataFilePath);

router.post('/add-json', (req, res) => {
  console.log('POST /add route hit');
  // const json_data = {
  //   name: 'sai',
  //   email: '456'
  // };
  const data = json_data
  res.json(data);
});

router.post('/add', (req, res) => {
  console.log('POST /add route hit');
  const data = {
    name: 'sai',
    email: '456'
  };
  res.json(data);
});

router.get('/json-', (req, res) => {
  const data = json_data
  res.json(data);
  // res.send('Welcome to the homepage!');
});

router.get('/about', (req, res) => {
  res.send('About us');
});

// Define the route to serve JSON data
router.get('/json', (req, res) => {
  res.json(json_data);
});

// Route to serve specific user by name
router.get('/json/:name', (req, res) => {
  const userName = req.params.name;
  const user = json_data.find(u => u.name.toLowerCase() === userName.toLowerCase());

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Route to update specific user's city by name
router.put('/json/:name/city', (req, res) => {

  // Get the name from the URL parameters
  const userName = req.params.name;

  // Find the index of the user with the given name in the jsonData array
  const userIndex = jsonData.findIndex(u => u.name.toLowerCase() === userName.toLowerCase());

  // Check if the user exists
  if (userIndex !== -1) {
    // Check if the request body contains the city field
    if (req.body.city) {

    // Update the city field of the user with the new value from the request body
      jsonData[userIndex].city = req.body.city;

    // Write the updated jsonData array back to the data.json file
      fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
      
        // Handle any errors that occur while writing to the file
        if (err) {
          return res.status(500).send('Error updating data file');
        }

        // Send a success response if the update was successful
        res.send('User city updated successfully');
      });
    } else {

      // Send a 400 Bad Request response if the city field is missing in the request body
      res.status(400).send('City is required');
    }
  } else {

    // Send a 404 Not Found response if the user does not exist
    res.status(404).send('User not found');
  }
});

// Route to delete a specific user by name
router.delete('/json/:name', (req, res) => {
  // Extract the user's name from the URL parameters
  const userName = req.params.name;

  // Find the index of the user with the given name in the jsonData array
  const userIndex = jsonData.findIndex(u => u.name.toLowerCase() === userName.toLowerCase());

  // Check if the user exists
  if (userIndex !== -1) {
    // Remove the user from the jsonData array
    jsonData.splice(userIndex, 1);

    // Write the updated jsonData array back to the data.json file
    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
      // Handle any errors that occur while writing to the file
      if (err) {
        return res.status(500).send('Error updating data file');
      }
      // Send a success response if the deletion was successful
      res.send('User deleted successfully');
    });
  } else {
    // Send a 404 Not Found response if the user does not exist
    res.status(404).send('User not found');
  }
});


// Route to update specific user by name
router.put('/json/:name', (req, res) => {
  const userName = req.params.name;
  const userIndex = jsonData.findIndex(u => u.name.toLowerCase() === userName.toLowerCase());

  if (userIndex !== -1) {
    jsonData[userIndex] = { ...jsonData[userIndex], ...req.body };
    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error updating data file');
      }
      res.send('User updated successfully');
    });
  } else {
    res.status(404).send('User not found');
  }
});

module.exports = router;
