import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://ashimdevnath:HLFyZrnzxZbYZqxe@todo-database.bafgdqb.mongodb.net/?retryWrites=true&w=majority&appName=Todo-Database";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

const newSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", newSchema);

app.post('/signup', async (req, res) => {
  const { username, email, password, cpassword } = req.body;

  if (password !== cpassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    const newUser = new User({
      userName: username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User Not Found');
    }

    if (user.password !== password) {
      return res.status(401).send('Invalid Password');
    }

    res.status(200).send('User Found');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
