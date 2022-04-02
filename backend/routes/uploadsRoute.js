const express = require('express');
const path = require("path");
const multer = require("multer");
const router = express.Router();

// const storage = multer.diskStorage({
//   destination: "../../Face Recognition/test img/",
//   filename: function (req, file, cb) {
//     cb(null, "image" + Date.now() + path.extname(file.originalname));
//   },
// });

const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline)
const storage = multer.diskStorage({
    destination:"Face Recognition/test img/",
    filename:function(req,file,cb){
        cb(null, 0 + path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage,
}).single('file');

router.post("/imageupload", upload, async function(req, res) {
    // const {file, body:{name}} =req;
    // if(file.detectedFileExtension != '.jpg') next(new Error('Invalid file format'))
    // const fileName = name + Math.floor(Math.random()*1000) + file.detectedFileExtension;
    // await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../../Face Recognition/test img/${fileName}`))
    

  res.send("success");
});

module.exports = router;