const express = require("express");
const cors = require("cors");

const userRouter = require("./router/userRoute");
const doubtRouter = require("./router/doubtRoute");
const tutorAvailabilityRoute = require("./router/tutorAvailabilityRoute");

const { connection } = require("./config/db");

const verifyToken = require("./config/middleware/verifyToken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); //json parsar

//user router

app.get("/", (req, res) => {
  res.send("Welcome to Revly.io");
});

//user routers
app.use("/user", userRouter);
app.use("/doubt", doubtRouter);
app.use("/tutor", tutorAvailabilityRoute);

app.listen(process.env.port || 5000, async () => {
  await connection;
  console.log("Database is connected");
  console.log(`${process.env.port} is working`);
});
