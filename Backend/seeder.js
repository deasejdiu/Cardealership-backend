import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import users from "./data/users.js";
import User from "./models/userModel.js";
import Car from "./models/carModel.js";
import Contact from "./models/contactModel.js";
import Order from "./models/orderModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

   
    const importedUsers = await User.insertMany(users);
    console.log(`users imported ${importedUsers}`.green.inverse);


    console.log("All data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Car.deleteMany();
    await Contact.deleteMany();
    await Order.deleteMany();

    console.log("data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Command-line argument to destroy data (use with caution)
if (process.argv[2] === "-d") {
  destroyData(); // Delete data in the database and exit the app
} else {
  importData(); // Import data into the database
}