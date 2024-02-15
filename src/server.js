const express = require("express");
const app = express();

require("dotenv").config();

var cookieParser = require("cookie-parser");

const Users = require("./models/users.model");

// Configuraciones
app.set("port", process.env.PORT || 8000);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

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

// DB checks
Users.sync({});

// Usar rutas
app.use("/auth", authRoutes);
app.use("/users", authMiddleware, userRoutes);

// Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
