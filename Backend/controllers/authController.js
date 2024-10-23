const User = require("../Model/user.js");
const {hashpassword,comparePassword} = require("../helper/auth");
const jwt = require("jsonwebtoken");

// const test = (req, res) => {
//   res.json("Test is working");
// };

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check username
    if (!username) {
      return res.json({
        error: "Username is required",
      });
    }

    // Check password
    if (!password || password.length <= 6) {
      return res.json({
        error: "Password is required and it sholud be more than 6 characters",
      });
    }

    // Check Email
    const checkE = await User.findOne({ email });

    if (checkE) {
      return res.json({
        error: "Email is taken",
      });
    }

    // Hash the password
    const hashedPassword = await hashpassword(password);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.json(user);

  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password
    const checkPassword = await comparePassword(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate JWT for Passport-JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username }, 
      process.env.SECRET_KEY, 
      { expiresIn: '1h' }
    );

    // Return token to client in the Authorization header
    res.json({ token: `Bearer ${token}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const dashboard = (req,res) =>{
  const {token} = req.cookies;
  if(token){
    jwt.verify(token,process.env.SECRET_KEY,{},(err,user)=>{
      if(err) throw err;
      res.json(user);
    });
  }
  else{
    res.json(null);
  }
}

module.exports = {
  signup,
  login,
  dashboard
};
