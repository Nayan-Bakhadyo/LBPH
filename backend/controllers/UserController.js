// import User from "../models/userModel.js";
const User = require("../models/userModel");
const Log = require("../models/LogModel")
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const alert = require('alert'); 
// const userid = require("./test");
const Mongoose = require("mongoose");
const { PythonInteractive } = require("python-interactive");
const { PythonShell } = require("python-shell");

const testFunction = asyncHandler(async (req, res) => {});

const sendIdToPython = asyncHandler(async (req, res) => {
  // var PythonShell = require("python-shell");
  const { PythonShell } = require("python-shell");
  const path = "/Users/nayand/Desktop/LBPH/Face Recognition/data_set.py";
  var pyshell = new PythonShell(path);
  const id = await User.findOne().sort({ _id: -1 }).limit(1).select("_id");
  pyshell.send(JSON.stringify(id));

  pyshell.on("message", function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
  });

  // end the input stream and allow the process to exit
  pyshell.end(function (err) {
    if (err) {
      throw err;
    }
  });
});

//Last register User ID
const getuserid = asyncHandler(async (req, res, next) => {
  // const users = {};
  const id = await User.findOne().sort({ _id: -1 }).limit(1).select("_id");
  // const myjson = JSON.stringify(user);
  // const a = JSON.stringify(user);
  // const myjson = JSON.parse(user);
  // const a = JSON.stringify(user);
  // console.log("hello");
  // console.log(user);
  // console.log(myjson);
  // console.log(typeof myjson);
  res.send(id);
  next();
});


//Getting ID from python script as string
const runPythonScript = asyncHandler(async (req, res) => {
  
  const path = "/Users/nayand/Desktop/LBPH/Face Recognition/load_model_image.py";
  const { PythonShell } = require("python-shell");
  const pyshell = new PythonShell(path);
  try {
    pyshell.on("message", async function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      const id = message.toString();
      // const id = "61b6373bb2dfee2efaba0fb1";
      // const userExists = await User.findOne({ email });
      const userExists = await User.findById(id);
      if (userExists) {
        console.log(userExists);
        res.json({
          userExists,
        });
      }
    });
  } catch (err) {
    pyshell.end(function (err) {
      if (err) {
        console.log("Error");
      }
      console.log("finished");
    });
  }
});

//Get id from python

const getIdFromPython = asyncHandler(async (req, res, next) => {
  // res.locals.resp = req.body.data;
  // // var iid = new Mongoose.Types.ObjectId(id);
  // // var id = Mongoose.Types.ObjectId(data);
  // // const id = JSON.parse(data);
  // const user = await User.findById(res.locals.resp);
  // console.log(user);
  // console.log(typeof iid);
  // if (resp) {
  //   res.json({
  //     resp,
  //   });
  //   console.log(resp);
  // }
  // next();
});
//face recognize user
const faceRecognizeUser = asyncHandler(async (req, res) => {
  const user = getIdFromPython();
  // var id = mongoose.Types.ObjectId(data);
  // if (res.locals.resp) {
  //   console.log(res.locals.resp);
  // }
  // console.log(typeof id);
  // console.log(data);
  // const resp = req.resp;
  console.log(user);
  res.json({
    resp,
  });
});

//Getting ID from python script as string
const userfromvideo = asyncHandler(async (req, res) => {
  let buffer='';
  let x = 1;
  const path =
    "/Users/nayand/Desktop/LBPH/Face Recognition/load_model_video.py";
  // const myPythonScriptPath = "test.py";
  const { PythonShell } = require("python-shell");
  const pyshell = new PythonShell(path);

  let options = {
    args: ["value1", "value2"],
  };
  console.log('TOP');
  try {
   pyshell.on("message", async function (message) {
      const id = message.toString();
      if(buffer != id){
        buffer = id;
        x=1;
      }
      // console.log(id+"\t"+x+"\t"+buffer)
      if ((lastLogID = await Log.findOne({user:id}).sort({ createdAt: -1 }))) {
        const logtime = lastLogID._id.getTimestamp();
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - logtime);
        const diffDays = Math.ceil(diffTime / (1000 * 60));
        // console.log(diffDays);
        if (diffDays > 1) {
          if (x && x ===1){
            const userExists = Log.create({
            user: id,
          });
          x=0;
        }
        }
      } else {
        if (x && x === 1){
          const newuserExists = Log.create({
            user: id,
          });
          x++;
        }
      }
    });
  } catch (err) {
    pyshell.end(function (err) {
      if (err) {
        console.log("Error");
      }
      console.log("finished");
    });
  }
});

//To send log data to python interface and recieve id
//and sending mail to the affected users
const sendLogToPython = asyncHandler(async (req, res) => {
  // var PythonShell = require("python-shell");
  let data = ''
  const { PythonShell } = require("python-shell");
  const path = "/Users/nayand/Desktop/LBPH/Face Recognition//log.py";
  var pyshell = new PythonShell(path);
  console.log('Analyzing log');
  const log = await Log.find({},{ projection: { _id: 0,  updatedAt:0, __v:0}});
  console.log('-----------');
  log.forEach(l=>{
    data = data +'{"'+l.user._id+'":' + '"'+ l.createdAt + '"},'
  });
  data = data.slice(0,data.length-1)
  console.log(data)
  // console.log(data);
  const id = req.user._id;
  const send_data = id + "\t" + data;
  pyshell.send(JSON.stringify(send_data));
try{
  pyshell.on("message", async function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    const mail_array = message.split(" ");
    mail_array.pop();
    console.log('Traced Users: ');
    console.log(mail_array)
    const Status = await User.findById(req.user._id);
    if(Status.status=='Infected'){
    console.log('Sending Mail To Traced Contacts');
    alert('Sending Mail To Traced Contacts');

    for(const mid of mail_array){
      const users = await User.findById(mid);
    

      const mailuser = await User.findById(id);
      let usermail = mailuser.email;

      const nodemailer = require("nodemailer");
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "contacttracing.np@gmail.com",
          pass: "cts123456",
        },
      });

      let mailOptions = {
        from: "contacttracing.np@gmail.com",
        to:  `${users.email}`,
        subject: `You may have been exposed to COVID.`,
        text: `This message is to inform you that our system has recorded you being in direct or indirect contact with COVID patient. As a result, we request you to take all vital precautions and consult your local health care practitioner for extra safety measures before the virus spreads.
        This message is automatically generated by our system so if this message doesn't relate to you feel free to provide feedback.`,
      };

      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log("Error sending email");
        } else {
          console.log("Messege Sent");
          alert("Messege Sent");
        }
      });
    }
    }
    // console.log(typeof mail_array);
    // console.log(mail_array);
    // console.log(mail_array[1]);
  });
}catch(err){
  console.log(err)
}
  // end the input stream and allow the process to exit
  pyshell.end(function (err) {
    if (err) {
      throw err;
    }
  });

  res.json(req.user._id);
});

//@desc  Auth user && get token
//@route POST/api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      age: user.age,
      email: user.email,
      sex: user.sex,
      status: user.status,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getLogsList = asyncHandler(async (req,res)=>{
  const logs = await Log.find({}).sort({created: -1 });

  if (logs){
    res.json(logs);
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.status = req.body.status || user.status;
    user.sex = req.body.sex || user.sex;
    user.age = req.body.age || user.age;
    const updatedUser = await user.save();
    console.log(updatedUser);
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      status: updatedUser.status,
      age: updatedUser.age,
      sex: updatedUser.sex,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});



const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, age, sex, status } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    // _id: py_id,
    name,
    email,
    password,
    age,
    sex,
    status,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      age: user.age,
      email: user.email,
      sex: user.sex,
      status: user.status,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User Not Created Invalid user data");
  }
  next();

});

//Get all the user info
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

// const getIdFromPython = asyncHandler(async (req, res) => {
//   const spawn = require("child_process").spawn;
//   // console.log("test path");
//   const pythonProcess = spawn("python", [
//     "../../Face Recognition/connector.py",
//   ]);
//   pythonProcess.stdout.on("data", (data) => {
//     mystr = data.toString();
//     console.log(mystr);

//     myjson = JSON.parse(mystr);
//     console.log(myjson.id);
//   });
// });

//Get User by Id
//Getting ID from python script as string
const recognizedUser = asyncHandler(async (req, res) => {
  console.log('Scanning image and identifying user');
  alert('Scanning image and identifying user');

  const path =
    "/Users/nayand/Desktop/LBPH/Face Recognition/load_model_image.py";
  // const myPythonScriptPath = "test.py";
  const { PythonShell } = require("python-shell");
  const pyshell = new PythonShell(path);
  try {
    pyshell.on("message", async function (message) {
      // console.log('Inside pyshell');
      // received a message sent from the Python script
      const id = message.toString();
      let flag = true;
      console.log(id);
      if(id === '0'){
        console.log(id);
        console.log('Person From Image is not in our system.');
        alert('Person From Image is not in our system.');

        flag = false;
      }
      else if(id === '1'){
        console.log(id);
        console.log('Same image reported multiple times.');
        alert('Same image reported multiple times.');

        flag = false;
      }
      if(flag){
        console.log(id);
        const userExists = await User.findById(id);
        if (userExists) {
          console.log(userExists);
          res.json({
            userExists,
          });
        }else{
          console.log('User not recognized!!!');
          alert('User not recognized!!!');

        }
        console.log('Sending mail to user!!!!');
        alert('Sending mail to user!!!!');
        const mailuser = await User.findById(id);
        let usermail = mailuser.email;

        const nodemailer = require("nodemailer");
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "contacttracing.np@gmail.com",
            pass: "cts123456",
          },
        });

        let mailOptions = {
          from: "contacttracing.np@gmail.com",
          to: `${usermail}`,
          subject: `Request For Following Health Precaution`,
          text: `One of our user has reported you for not following health precautions(mask). We would humbly request you to follow all the health precautions to be safe and make others feel safe.
          This message is auto generated so do reply us with some feedbacks if this doesn't relate to you.
          Thank you in advance!`,
        };

        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log("Error sending email");
          } else {
            console.log("Messege Sent");
            alert("Messege Sent");

          }
        });
      }
      });
    } catch (err) {
      pyshell.end(function (err) {
        if (err) {
          console.log("Error");
        }
        console.log("finished");
      });
  }
});

const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); //Id comes from python and sent from react
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      sex: user.sex,
      status: user.status,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//Get all Covid affected user

const getAffectedUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .where("status")
    .equals("Infected")
    .select("-password");
  if (users) {
    res.json(users);
  }
});

//@desc  update user
//@route PUT/api/users/:id
//@access private/admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.status = req.body.status || user.status;
    user.age = req.body.age || user.age;
    user.sex = req.body.sex || user.sex;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      status: updatedUser.status,
      age: updatedUser.age,
      sex: updatedUser.sex,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Detete users
//@route DELETE/api/users/:id
//@access private/admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(users);
});

module.exports = {
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
  runPythonScript,
  sendIdToPython,
  userfromvideo,
  sendLogToPython,
  updateUserProfile,
  getLogsList,
  recognizedUser
};
