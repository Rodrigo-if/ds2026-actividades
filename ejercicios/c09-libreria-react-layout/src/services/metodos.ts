import type { LibroOL } from "../types/libroOL";

//Función asincrónica para el fetch
export async function obtenerLibros(q: string): Promise<LibroOL[]> {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}`);     //encodeURIComponent acomoda el q para que sea una URL válida
        if (!response.ok){
            throw new Error(`HTTP ${response.status}`);     //Corroboro si se produjo algún error al traer los datos de la API
        }
        const datos = await response.json();
        //Mapeo necesario para poder usar el slice después
        const libros: LibroOL[] = await Promise.all(
            datos.docs.map(async (doc: LibroOL) => {
                return {
                    title: doc.title,
                    author_name: Array.isArray(doc.author_name) ? doc.author_name : [],
                    cover_i: doc.cover_i,
                    key: doc.key,
                };
            })
        );
        return libros;
    } catch {
        return [];
    }
}

//fetch de un solo libro por id
export async function obtenerLibro(id: string) {
  try {
    //fetch del libro
    const response = await fetch(`https://openlibrary.org/works/${id}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    //fetch nombres de autores
    let authorNames: string[] = [];
    if (data.authors && Array.isArray(data.authors)) {
      const authorPromises = data.authors.map(async (autor: { author?: { key?: string }; key?: string }) => {
        const autorKey = autor.author?.key || autor.key;
        const autorRes = await fetch(`https://openlibrary.org${autorKey}.json`);
        if (autorRes.ok) {
          const autorData = await autorRes.json();
          return autorData.name;
        }
        return "Autor desconocido";
      });
      authorNames = await Promise.all(authorPromises);
    }
    const libroCompleto = {
      title: data.title,
      description: typeof data.description === "string" ? data.description : data.description?.value || "Sin descripción disponible",
      cover_i: data.covers?.[0]?.toString() || "",
      authors: authorNames,
      first_publish_date: data.first_publish_date || "Fecha desconocida",
    };
    return libroCompleto;
  } catch (error) {
    console.error("Error al obtener el libro:", error);
    return null;
  }
}
