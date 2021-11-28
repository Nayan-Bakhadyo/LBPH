import User from '../models/useeModel.js'

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password,age,sex,status} = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
      age,
      sex,
      status
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        sex:user.sex,
        status:user.status,
        isAdmin: user.isAdmin,
        // token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('User Not Created Invalid user data');
    }
  });

  export default registerUser;