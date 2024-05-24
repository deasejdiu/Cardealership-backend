// src/server.js

const express = require('express');
const carController = require('./controllers/CarController');

const app = express();
app.use(express.json());

app.post('/cars', carController.createCar);
app.get('/cars', carController.getCars);
app.get('/cars/:id', carController.getCarById);
app.put('/cars/:id', carController.updateCar);
app.delete('/cars/:id', carController.deleteCar);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
