import path from "path";
import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import partnerRoutes from "./routes/partnerRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import newsletterRoutes from "./routes/newsletterRoutes.js";
import userRoutes from './routes/userRoutes.js';
import carsRoutes from './routes/carsRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import contactRoutes from './routes/contactRoutes.js'


connectDB();

const port = process.env.PORT;
const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

//cookie parser middleware-allows us to access request.cookies. to access we need tto get cookie.parser.jwt
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/cars", carsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contacts", contactRoutes);



if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
} else {
    const __dirname = path.resolve();
    app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
}






app.listen(port, () => console.log(`server running on port ${port}`));