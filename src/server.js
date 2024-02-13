const express = require("express");
const app = express();

require("dotenv").config();

// Configuraciones
app.set("port", process.env.PORT || 8000);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API is up ?
app.get("/", (req, res) => {
  res.json({
    message: "HikeNet API is up !",
  });
});

// Importar rutas
const userRoutes = require("./routes/users");

// Usar rutas
app.use("/users", userRoutes);

// Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
