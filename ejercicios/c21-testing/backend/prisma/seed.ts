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

// Imagen genérica estable de libros para evitar enlaces rotos de Amazon
const FALLBACK_LIBRO_IMG = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80";

const libros = [
  {
    "titulo": "El principito",
    "descripcion": "Un tierno relato poético y filosófico sobre la soledad, la amistad, el amor y el sentido de la vida visto a través de los ojos de un pequeño príncipe proveniente de otro asteroide.",
    "autor": "Antoine de Saint-Exupéry",
    "precio": 4500,
    "imagen": FALLBACK_LIBRO_IMG,
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "Patrones de diseño",
    "descripcion": "Guía esencial de programación orientada a objetos para reutilizar soluciones a problemas comunes en el desarrollo de software moderno.",
    "autor": "Alexander Shvets",
    "precio": 8500,
    "imagen": "https://refactoring.guru/images/patterns/book/web-cover-es-2x.png",
    "disponible": true,
    "categorias": ["Técnico"]
  },
  {
    "titulo": "Farenheit 451",
    "descripcion": "Una novela distópica que retrata una sociedad futura donde los libros están prohibidos y los bomberos se encargan de quemarlos.",
    "autor": "Ray Bradbury",
    "precio": 5200,
    "imagen": FALLBACK_LIBRO_IMG,
    "disponible": false,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "Cien años de soledad",
    "descripcion": "La obra maestra del realismo mágico que narra la historia de la familia Buendía en el pueblo mítico de Macondo.",
    "autor": "Gabriel García Márquez",
    "precio": 6200,
    "imagen": FALLBACK_LIBRO_IMG,
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "1984",
    "descripcion": "Clásico político y social que introduce conceptos icónicos como el Gran Hermano, la policía del pensamiento y la vigilancia masiva.",
    "autor": "George Orwell",
    "precio": 5400,
    "imagen": FALLBACK_LIBRO_IMG,
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "El alquimista",
    "descripcion": "Una inspiradora fábula sobre seguir los sueños personales y escuchar los dictados del corazón.",
    "autor": "Paulo Coelho",
    "precio": 4300,
    "imagen": FALLBACK_LIBRO_IMG,
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "Sapiens: De animales a dioses",
    "descripcion": "Un recorrido fascinante por la historia de la humanidad, desde nuestros ancestros cazadores-recolectores hasta las revoluciones tecnológicas modernas.",
    "autor": "Yuval Noah Harari",
    "precio": 7800,
    "imagen": FALLBACK_LIBRO_IMG,
    "disponible": false,
    "categorias": ["Ensayo", "Técnico"]
  },
  {
    "titulo": "El código Da Vinci",
    "descripcion": "Un thriller de misterio y conspiración religiosa que sigue al profesor Robert Langdon en la búsqueda de un secreto milenario.",
    "autor": "Dan Brown",
    "precio": 5100,
    "imagen": FALLBACK_LIBRO_IMG,
    "disponible": true,
    "categorias": ["Novela", "Ensayo"]
  },
  {
    "titulo": "Matar a un ruiseñor",
    "descripcion": "Una conmovedora historia sobre la injusticia racial, la pérdida de la inocencia y el valor en el sur profundo de Estados Unidos.",
    "autor": "Harper Lee",
    "precio": 4700,
    "imagen": FALLBACK_LIBRO_IMG,
    "disponible": true,
    "categorias": ["Ficción"]
  },
  {
    "titulo": "La sombra del viento",
    "descripcion": "Un misterio literario ambientado en la Barcelona gótica de la posguerra, centrado en el enigmático 'Cementerio de los Libros Olvidados'.",
    "autor": "Carlos Ruiz Zafón",
    "precio": 6900,
    "imagen": FALLBACK_LIBRO_IMG,
    "disponible": false,
    "categorias": ["Novela", "Ensayo"]
  }
];

async function main() {
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

  const librosExistentes = await prisma.libro.findMany({
    select: { id: true }
  });

  for (const libro of librosExistentes) {
    await prisma.libro.update({
      where: { id: libro.id },
      data: { categorias: { set: [] } },
    });
  }

  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();
  await prisma.categoria.deleteMany();

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

  console.log("Seed con descripciones y portadas limpias ejecutado exitosamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });