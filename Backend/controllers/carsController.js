import fs from 'fs'
import { fileURLToPath } from 'url';
import path from 'path'
import asyncHandler from "../middleware/asyncHandler.js";
import Car from "../models/carModel.js";

const defaultImage = '/image/sample.jpg'

// @desc    Get all cars
// @route   GET /api/cars/all
// @access  Private/Admin
const getCars = asyncHandler(async (req, res) => {
    const cars = await Car.find({}).sort({ createdAt: -1 });
    res.json(cars);
  });

   //@desc add a new car
  //@route POST/api/cars/add
  //@access Private Admin
  const addCar = asyncHandler(async (req, res) => {
    const { name, image, description, price } = req.body;
  
    const newCar = {
      name: name,
      image: image || defaultImage,
      description,
      price: price
    };
  
    if (req.file && req.file.path) {
      let imagePath = req.file.path.replace(/\\/g, "/");
      if (!imagePath.startsWith('/')) {
        imagePath = '/' + imagePath;
      }
      newCar.image = imagePath;
    }
  
    // Create a new car in the database
    const car = new Car(newCar);
    const createdCar = await car.save();
  
    res.status(201).json(createdCar);
  });

//@desc fetches a car
//@route GET/api/cars/get/:id
//@access Public
const getCarById = asyncHandler( async (req, res) => {
  const car = await Car.findById(req.params.id)

  if(car){
      return res.json(car)
  } else {
  res.status(404).json({error: true, message: 'Resource not found!'});
}
}) 

  // @desc    Update a car
  // @route   PUT /api/cars/edit/:id
  // @access  Private/Admin
  const updateCar = asyncHandler(async (req, res) => {
    const { name, description, price } = req.body;
  
    const car = await Car.findById(req.params.id);
  
    if (car) {
      car.name = name;
      car.description = description;
      car.price = price;
  
        // Check if a new image was uploaded
      if (req.file && req.file?.path) {
        // Delete the old image file if a new one is uploaded
        if (car.image !== '/images/sample.jpg') {
          const oldImagePath = `.${car.image}`;
          if (fs.existsSync(oldImagePath)) {
            try {
              fs.unlinkSync(oldImagePath);
            } catch (error) {
              throw new Error(error)
            }
          }
        }
  
        // Update with the new image
        let imagePath = req.file.path.replace(/\\/g, "/");
        if (!imagePath.startsWith('/')) {
          imagePath = '/' + imagePath;
        }
        car.image = imagePath;
      }
  
      const updatedCar = await car.save();
  
      // Convert relative image path to absolute URL for the response
      let imagePath = updatedCar.image;
      if (imagePath.startsWith('/')) {
        imagePath = imagePath.slice(1);
      }
      updatedCar.image = `http://localhost:5000/${imagePath.replace(/^\/+/, '')}`;
  
      res.json(updatedCar);
  
    } else {
      res.status(404).json({error: true, message: 'Car not found' });
    }
  })

  // @desc    Delete a car
  // @route   DELETE /api/cars/delete/:id
  // @access  Private/Admin
  const deleteCar = asyncHandler(async (req, res) => {

    const car = await Car.findById(req.params.id);
  
    if (car) {
      
      await car.deleteOne({_id : car._id})
      if(car.image !== defaultImage){
        try {
            const carImagePath = path.join(__dirname, '..', '..', car.image);
            if (fs.existsSync(carImagePath)) {
                fs.unlinkSync(carImagePath);
            }
        } catch (error) {
            console.error(error);
        }
      }
  
      res.status(200).json({message: 'Car and associated image deleted'})
    } else {
      res.status(404).json({error: true, message: 'Car not found!'});
    }
  });
  


export { getCars, addCar, getCarById, updateCar, deleteCar }
