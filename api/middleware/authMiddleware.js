const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // includes userId and role
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient permissions" });
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  allowRoles,
};
