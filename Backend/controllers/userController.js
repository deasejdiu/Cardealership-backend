// src/controllers/userController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
  const { name, personalNumber, email, phoneNumber } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        personalNumber,
        email,
        phoneNumber,
      }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create user' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch user' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, personalNumber, email, phoneNumber } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        personalNumber,
        email,
        phoneNumber,
      }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete user' });
  }
};

