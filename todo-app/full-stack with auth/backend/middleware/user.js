const jwt = require("jsonwebtoken");

// Middleware to verify user token
function userMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .sendStatus(401)
      .json({ error: "Authorization token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      const user = {
        id: decoded.id,
        email: decoded.email,
      };
      req.user = user;
      next();
    } else {
      return res.status(403).json({ message: "You are not authenticated" });
    }
  } catch (e) {
    return res.status(401).json({ message: "Inavlid token" });
  }
}

module.exports = userMiddleware;
