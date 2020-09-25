const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("jwt_token");

  // Check if no token
  if (!token) {
    return res.status(403).json({ message: "Authorization denined" });
  }

  try {
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
