import mongoose from 'mongoose';

const uri = "mongodb+srv://ashimdevnath:HLFyZrnzxZbYZqxe@todo-database.bafgdqb.mongodb.net/?retryWrites=true&w=majority&appName=Todo-Database";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

export default User;
