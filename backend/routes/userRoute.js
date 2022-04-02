// import express from "express";
// import registerUser from "../controllers/UserController";
const express = require("express");

const {
  registerUser,
  authUser,
  getSingleUser,
  getAllUser,
  getAffectedUsers,
  updateUser,
  deleteUser,
  getuserid,
  faceRecognizeUser,
  getIdFromPython,
  sendIdToPython,
  runPythonScript,
  userfromvideo,
  sendLogToPython,
  updateUserProfile,
  getLogsList,
  recognizedUser
} = require("../controllers/UserController.js");

const { admin, protect } = require("../middleware/authMiddleware");

// const authUser = require("../controllers/UserController.js");

const router = express.Router();
router.put('/users/profile',protect,updateUserProfile);
router.post("/register", registerUser, sendIdToPython);
router.post("/login", authUser);
router.get("/singleuser/:id", protect, admin, getSingleUser);
router.get("/alluser", getAllUser);
router.get("/affecteduser", protect, getAffectedUsers);
router.get("/userid", runPythonScript); 
router.post("/getidfrompython", getIdFromPython);
router.get("/getidfrompython", getIdFromPython);
router.post("/sendid", sendIdToPython);
router.get("/recognizeduser", recognizedUser);

router.get("/log", protect,sendLogToPython);
router.get("/logs-list", protect, getLogsList);
router.get("/userfromvideo", userfromvideo);
router.get("/facerecognizeuser", faceRecognizeUser); //Recognized user detail
router.put("/update/:id", protect, admin, updateUser);
router.delete("/delete/:id", protect, admin, deleteUser);

module.exports = router;
