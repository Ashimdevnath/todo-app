const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./middleware/passportConfig'); // Path to your Passport config
const taskRoute = require('./routes/taskRoute');

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Database connected"))
.catch(err => console.log(err));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true
  })
);

app.use(passport.initialize()); // Initialize passport
passportConfig(passport); // Set up passport with your JWT strategy

app.use('/', require('./routes/authRoute'));

// Use authentication middleware for task routes
app.use('/api', passport.authenticate('jwt', { session: false }), taskRoute);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
