import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./config/db";
import chalk from "chalk";
import router from './api/routes'
require("dotenv").config();
console.log(chalk.bold.yellow('Trying to connect to Database .......'));
connectDB();

const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use('/api', router)
app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(port, () => {
  console.log(chalk.greenBright.bold(`Connected to port: ${port}`));
});
