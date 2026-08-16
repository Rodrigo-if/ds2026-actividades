import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un contenedor! 🐳" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

interface Libro {
  keyLibro: string;
  title: string;
  author_name?: string[];
  cover_i?: string;
}

const libros: Libro[] = [
  {
    keyLibro: "OL123M",
    title: "El principito",
    author_name: ["Antoine de Saint-Exupéry"],
    cover_i: "10521270"
  },
  {
    keyLibro: "OL456M",
    title: "1984",
    author_name: ["George Orwell"],
    cover_i: "12643521"
  },
  {
    keyLibro: "OL789M",
    title: "Fahrenheit 451",
    author_name: ["Ray Bradbury"]
  }
];

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería" });
});

app.get("/libros", (_req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});