const express = require('express');
const cors = require('cors');
const carController = require('./controllers/CarController');

const app = express();
app.use(express.json());

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests only from localhost:3000
};

// Enable CORS with the defined options
app.use(cors(corsOptions));

app.post('/cars', carController.createCar);
app.get('/cars', carController.getCars);
app.get('/cars/:id', carController.getCarById);
app.put('/cars/:id', carController.updateCar);
app.delete('/cars/:id', carController.deleteCar);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
