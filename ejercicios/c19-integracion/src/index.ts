import express from "express";
import authRoutes from "./routes/auth.routes";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un container! 🐳" });
});

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de recursos
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});