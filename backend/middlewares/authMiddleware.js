const jwt = require('jsonwebtoken');

const JWT_SECRET = '562b8f461b60f8dcd1066f34dc0de4d9a17ab6d5ddc4a70fca8389f38235c264'; 

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
