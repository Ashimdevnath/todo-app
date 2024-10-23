const Task = require('../Model/Task');

const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; // Corrected user ID from authenticated user

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const newTask = new Task({ title, description, userId });
    await newTask.save();

    res.json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id; // Corrected user ID from authenticated user
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask
};
