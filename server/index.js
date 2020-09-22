import express from "express";
import dotenv from "dotenv";
import sequelize from "./utils/sequelize.js";
import syncModels from "./utils/syncModels.js";
const cors = require("cors");

const main = async () => {
  const app = express();
  dotenv.config({ path: "./config" });

  //load .env variable

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // middleware to parse json & urlencoded data

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  // testing connection

  await syncModels(sequelize);

  const PORT = 8080;

  app.listen(PORT, () => {
    console.log(`app is listening on http://localhost:${PORT}`);
  });
  //listen for requests on http://localhost:8080
};

main();
