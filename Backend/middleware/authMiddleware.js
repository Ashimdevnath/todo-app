const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });

    req.user = user; // Attach the user to the request
    next();
  });
};

module.exports = authenticateToken;
