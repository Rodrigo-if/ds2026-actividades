import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = 3000;

// Configuración de CORS basada en la variable de entorno FRONTEND_URL
const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"],
};
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un container! 🐳" });
});

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de recursos
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

// Middleware 404 en JSON para rutas inexistentes
app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo centralizado de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});