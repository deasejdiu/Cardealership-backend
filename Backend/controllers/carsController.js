// src/controllers/carController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCar = async (req, res) => {
  const { name, model, year, price, imageUrl } = req.body;
  try {
    const car = await prisma.car.create({
      data: {
        name,
        model,
        year,
        price,
        imageUrl
      }
    });
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create car' });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await prisma.car.findMany();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch cars' });
  }
};

exports.getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await prisma.car.findUnique({
      where: { id: parseInt(id) }
    });
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch car' });
  }
};

exports.updateCar = async (req, res) => {
  const { id } = req.params;
  const { name, model, year, price, imageUrl } = req.body;
  try {
    const car = await prisma.car.update({
      where: { id: parseInt(id) },
      data: {
        name,
        model,
        year,
        price,
        imageUrl
      }
    });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update car' });
  }
};

exports.deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.car.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete car' });
  }
};
