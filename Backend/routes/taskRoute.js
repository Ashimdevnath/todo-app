const express = require('express');
const router = express.Router();
const { addTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/tasks', authenticateToken, addTask);
router.get('/tasks', authenticateToken, getTasks);
router.put('/tasks/:id', authenticateToken, updateTask);
router.delete('/tasks/:id', authenticateToken, deleteTask);

module.exports = router;
