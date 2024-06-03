const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/dbConfig");


const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  exposedHeaders: ['x-total-pages'],
}

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.set("port", process.env.PORT || 3003);

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))


const db = require("./models")

db.sequelize.sync()
  .then(() => {
    console.log('Synced db');
  })
  .catch((err) => {
    console.log('Error syncing db', err);
  })


  app.get("/", (req, res) => {
    res.json({ message: "Hi there" });
  });

  app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });