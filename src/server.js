const express = require("express");
const app = express();

require("dotenv").config();

var cookieParser = require("cookie-parser");
var cors = require("cors");
var morgan = require("morgan");

// Configuraciones
app.set("port", process.env.NODE_DOCKER_PORT || 8000);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(morgan("common"));

// Is API up ?
app.get("/", (req, res) => {
  res.json({
    message: "HikeNet API is up !",
  });
});

// Import middlewares
const { authMiddleware } = require("./middlewares/auth.middleware");

// Import routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const friendsRoutes = require("./routes/follow");
const postsRoutes = require("./routes/posts");

// Usar rutas
app.use("/auth", authRoutes);
app.use("/users", authMiddleware, userRoutes);
app.use("/profile", authMiddleware, profileRoutes);
app.use("/friends", authMiddleware, friendsRoutes);
app.use("/posts", authMiddleware, postsRoutes);

// Iniciando el servidor
app.listen(app.get("port"), async () => {
  console.log(`Server listening on port ${app.get("port")} inside docker !`);
});
