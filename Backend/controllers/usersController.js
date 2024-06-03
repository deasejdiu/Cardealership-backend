const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); // Import bcryptjs
const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
  const { name, username, email, phoneNumber, role, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        phoneNumber,
        role,
        password: hashedPassword, // Store hashed password
      }
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create user' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, email, phoneNumber, role, password } = req.body;
  try {
    // Hash the password if it's provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        username,
        email,
        phoneNumber,
        role,
        // Update password only if it's provided
        ...(password && { password: hashedPassword }),
      }
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update user' });
  }
};



