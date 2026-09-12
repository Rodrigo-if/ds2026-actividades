import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un container! 🐳" });
});

app.use("/api/libros", libroRoutes);

app.use("/api/autores", autorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.use(errorHandler);