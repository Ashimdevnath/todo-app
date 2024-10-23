const express = require('express');
const router = express.Router();
const cors = require('cors');
const { signup,login,dashboard}= require('../controllers/authController.js');

router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
            
    })
)

router.post('/signup',signup);
router.post('/login',login);
router.get('/dashboard', dashboard);

module.exports = router;