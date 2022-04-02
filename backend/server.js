// import express from "express";
// import connectDB from "./config/db.js";
// import dotenv from "dotenv";
// import userRoute from "./routes/userRoute.js";
// const userRoute = require("./routes/userRoute.js");
const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const uploadRoute = require("./routes/uploadsRoute");
const User = require("./models/userModel");
const getIdFromPython = require("./controllers/UserController");

const app = express();
dotenv.config();

connectDB();

app.use(express.json());

app.use("/api", userRoute);
app.use('/api',uploadRoute)

const PORT = process.env.PORT;

app.listen(PORT, console.log(`server running on port ${PORT}`));
