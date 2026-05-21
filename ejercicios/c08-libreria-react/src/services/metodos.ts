export interface LibroOL {
    title: string;
    author_name?: string[];
    cover_i?: number;
}

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
                    author_name: Array.isArray(doc.author_name) ? doc.author_name : [], //Necesario para que no tire error al usar join en el renderizado
                    cover_i: doc.cover_i,
                };
            })
        );
        return libros;
    } catch {
        return [];
    }
}

