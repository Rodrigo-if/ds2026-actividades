import { prisma } from "../src/config/prisma";
import { Rol } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";

const usuarios = [
  {
    email: "admin@libreria.test",
    nombre: "Admin",
    rol: Rol.ADMIN,
    password: "Admin1234",
  },
  {
    email: "cliente@libreria.test",
    nombre: "Cliente",
    rol: Rol.CLIENTE,
    password: "Cliente1234",
  },
];

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
    "imagen": "https://m.media-amazon.com/images/I/71s8pGzVwBL._AC_UF1000,1000_QL80_.jpg",
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "Patrones de diseño",
    "autor": "Alexander Shvets",
    "precio": 8500,
    "imagen": "https://refactoring.guru/images/patterns/book/web-cover-es-2x.png",
    "disponible": true,
    "categorias": ["Técnico"]
  },
  {
    "titulo": "Farenheit 451",
    "autor": "Ray Bradbury",
    "precio": 5200,
    "imagen": "https://m.media-amazon.com/images/I/71OFqSRFDgL._AC_UF1000,1000_QL80_.jpg",
    "disponible": false,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "Cien años de soledad",
    "autor": "Gabriel García Márquez",
    "precio": 6200,
    "imagen": "https://m.media-amazon.com/images/I/81xU2eJ4YSL._AC_UF1000,1000_QL80_.jpg",
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "1984",
    "autor": "George Orwell",
    "precio": 5400,
    "imagen": "https://m.media-amazon.com/images/I/71rpa1-kyvL._AC_UF1000,1000_QL80_.jpg",
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "El alquimista",
    "autor": "Paulo Coelho",
    "precio": 4300,
    "imagen": "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg",
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "Sapiens: De animales a dioses",
    "autor": "Yuval Noah Harari",
    "precio": 7800,
    "imagen": "https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg",
    "disponible": false,
    "categorias": ["Ensayo", "Técnico"]
  },
  {
    "titulo": "El código Da Vinci",
    "autor": "Dan Brown",
    "precio": 5100,
    "imagen": "https://m.media-amazon.com/images/I/815W65zG1yL._AC_UF1000,1000_QL80_.jpg",
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "Matar a un ruiseñor",
    "autor": "Harper Lee",
    "precio": 4700,
    "imagen": "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
    "disponible": true,
    "categorias": ["Ficción"]
  },
  {
    "titulo": "La sombra del viento",
    "autor": "Carlos Ruiz Zafón",
    "precio": 6900,
    "imagen": "https://m.media-amazon.com/images/I/91pX4RmsR6L._AC_UF1000,1000_QL80_.jpg",
    "disponible": false,
    "categorias": ["Novela", "Ensayo"]
  }
];

async function main() {
  // Cargar usuarios iniciales
  for (const { password, ...datos } of usuarios) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {},
      create: {
        ...datos,
        passwordHash,
      },
    });
  }

  // Desconectar relaciones N:M implícitas antes de limpiar
  const librosExistentes = await prisma.libro.findMany({
    select: { id: true }
  });

  for (const libro of librosExistentes) {
    await prisma.libro.update({
      where: { id: libro.id },
      data: { categorias: { set: [] } },
    });
  }

  // Limpieza de tablas
  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();
  await prisma.categoria.deleteMany();

  // Inserción de datos con portadas reales
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  for (const { autor, categorias: cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map((nombre) => ({ nombre })) },
      },
    });
  }

  console.log("Seed con portadas reales ejecutado exitosamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });