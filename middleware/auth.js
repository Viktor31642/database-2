// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET || "supersecret_key_change_me";

// exports.requireAuth = (req, res, next) => {
//   try {
//     const header = req.headers.authorization || "";
//     const [, token] = header.split(" "); // "Bearer <token>"
//     if (!token) return res.status(401).json({ error: "No token" });

//     const payload = jwt.verify(token, JWT_SECRET);
//     req.user = payload; // { uid, role, email }
//     next();
//   } catch (e) {
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// };

// // опційно: вимога конкретної ролі
// exports.requireRole = (role) => (req, res, next) => {
//   if (!req.user || req.user.role !== role) {
//     return res.status(403).json({ error: "Forbidden" });
//   }
//   next();
// };
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_123";

// Middleware: перевіряє, чи користувач залогінений
exports.requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Немає токена" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // додаємо info про користувача
    next();
  } catch (error) {
    return res.status(401).json({ message: "Недійсний токен" });
  }
};

// Middleware: дозволяє тільки адміну
exports.requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: "Доступ заборонено" });
  }
  next();
};
