interface LibroOL {
    title: string;
    author_name?: string;
    first_publish_year?: number;
}

//Función asincrónica para el fetch
async function obtenerLibros(q: string): Promise<LibroOL[]> {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}`);     //encodeURIComponent acomoda el q para que sea una URL válida
        if (!response.ok){
            throw new Error(`HTTP ${response.status}`);     //Corroboro si se produjo algún error al traer los datos de la API
        }
        const datos = await response.json();
        //Mapeo necesario para poder usar el slice después
        const libros: LibroOL[] = datos.docs.map((doc:any) => ({
            title: doc.title,
            author_name: doc.author_name? doc.author_name[0]: undefined,
            first_publish_year: doc.first_publish_year
        }));
        return libros;
    } catch (error) {
        return [];                                          //Condición para imprimir el mensaje de error
    }
}

//Función para obtener el parámetro q del input
function obtenerQ(): string | null {
    const input = document.getElementById("buscador") as HTMLInputElement | null;
    if (!input) return null;
    const q: string | null = input.value.trim();
    return q ? q : null;        //Devuelve q si el input no está vacío y sino devuelve null
}

//Función para generar las tarjetas
function generarTarjetas(libros: LibroOL[]) {
    const div: HTMLElement | null = document.getElementById("resultados");
    if (!div) return;
    div.innerHTML = '';
    //slice me devuelve los primeros 10 o el array completo si hay menos
    libros.slice(0, 10).forEach((libro: LibroOL) => {
        const tarjeta: HTMLElement = document.createElement('div');
        tarjeta.className = "tarjeta";
        //Título no lo valido porque es obligatorio
        const titulo: HTMLElement = document.createElement('h3');
        titulo.textContent = libro.title;
        tarjeta.appendChild(titulo);
        //Autor sí lo valido porque es opcional
        if (libro.author_name) {
            const autor: HTMLElement = document.createElement('p');
            autor.textContent = libro.author_name;
            tarjeta.appendChild(autor);
        }
        //Año sí lo valido porque es opcional
        if (libro.first_publish_year){
            const anio: HTMLElement = document.createElement('p');
            anio.textContent = libro.first_publish_year.toString();
            tarjeta.appendChild(anio);
        }
        div.appendChild(tarjeta);
    });
}

//Función para errores
function mostrarError(texto: string){
    const error: HTMLElement | null = document.getElementById("error");
    if (error) error.textContent = `${texto}`;
}

async function buscar() {
    mostrarError('');
    const mensaje: HTMLElement | null = document.getElementById("mensaje");
    if (mensaje) mensaje.textContent = 'Cargando...'
    const q = obtenerQ();
    if (!q) {
        if (mensaje) mensaje.textContent = '';
        mostrarError('No hay resultados para la búsqueda.');
        return;
    }
    const libros: LibroOL[] = await obtenerLibros(q);
    if (libros.length === 0){
        if (mensaje) mensaje.textContent = '';
        mostrarError('El fetch tomó demasiado tiempo o no obtuvo respuesta.');
        return;
    } 
    generarTarjetas(libros);
    if (mensaje) mensaje.textContent = '';
}

document.getElementById("botonBuscar")?.addEventListener("click", buscar);
