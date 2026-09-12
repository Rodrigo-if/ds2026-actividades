import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "Ernesto Sabato", nacionalidad: "Argentina" },
  { nombre: "George Orwell", nacionalidad: "Reino Unido" },
  { nombre: "Paulo Coelho", nacionalidad: "Brasil" },
  { nombre: "Yuval Noah Harari", nacionalidad: "Israel" },
  { nombre: "Dan Brown", nacionalidad: "Estados Unidos" },
  { nombre: "Harper Lee", nacionalidad: "Estados Unidos" },
  { nombre: "Carlos Ruiz Zafón", nacionalidad: "España" },
  { nombre: "Ray Bradbury", nacionalidad: "Estados Unidos" },
  { nombre: "Alexander Shvets", nacionalidad: "Rusia" }
];
const categorias = [
  { nombre: "Novela" },
  { nombre: "Ensayo" },
  { nombre: "Técnico" },
  { nombre: "Ficción" }
];
const libros = [
  {
    "titulo": "El principito",
    "autor": "Antoine de Saint-Exupéry",
    "precio": 4500,
    "imagen": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "Patrones de diseño",
    "autor": "Alexander Shvets",
    "precio": 8500,
    "imagen": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    "disponible": true,
    "categorias": ["Técnico"]
  },
  {
    "titulo": "Farenheit 451",
    "autor": "Ray Bradbury",
    "precio": 5200,
    "imagen": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80",
    "disponible": false,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "Cien años de soledad",
    "autor": "Gabriel García Márquez",
    "precio": 6200,
    "imagen": "https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&w=400&q=80",
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "1984",
    "autor": "George Orwell",
    "precio": 5400,
    "imagen": "https://images.unsplash.com/photo-1473755504818-b72b6dfdc0a1?auto=format&fit=crop&w=400&q=80",
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "El alquimista",
    "autor": "Paulo Coelho",
    "precio": 4300,
    "imagen": "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=400&q=80",
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "Sapiens: De animales a dioses",
    "autor": "Yuval Noah Harari",
    "precio": 7800,
    "imagen": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    "disponible": false,
    "categorias": ["Ensayo", "Técnico"]
  },
  {
    "titulo": "El código Da Vinci",
    "autor": "Dan Brown",
    "precio": 5100,
    "imagen": "https://images.unsplash.com/photo-1496104679561-38b73d6fcdf0?auto=format&fit=crop&w=400&q=80",
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "Matar a un ruiseñor",
    "autor": "Harper Lee",
    "precio": 4700,
    "imagen": "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
    "disponible": true,
    "categorias": ["Ficción"]
  },
  {
    "titulo": "La sombra del viento",
    "autor": "Carlos Ruiz Zafón",
    "precio": 6900,
    "imagen": "https://images.unsplash.com/photo-1529480821492-a27f2b0b4b79?auto=format&fit=crop&w=400&q=80",
    "disponible": false,
    "categorias": ["Novela", "Ensayo"]
  }
];

async function main() {
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });
  for (const { autor, categorias, ...datos } of libros) {
    await prisma.libro.create({ data: {
      ...datos,
      autor: { connect: { nombre: autor } },
      categorias: { connect: categorias.map(nombre => ({ nombre })) },
    }});
  }
}
main();