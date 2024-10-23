const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models.UserInformation || mongoose.model('UserInformation', userSchema);

module.exports = User;
