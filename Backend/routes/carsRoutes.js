import express from "express";
import { protectUser } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import { addCar, deleteCar, getCarById, getCars, updateCar } from "../controllers/carsController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });

const router = new express.Router();

router.get("/all", getCars);
router.get("/get/:id", getCarById);
router.post("/add", protectUser, upload.single('image'), addCar);
router.put("/edit/:id", protectUser, upload.single('image'), updateCar);
router.delete("/delete/:id", protectUser, deleteCar);


export default router;