interface LibroOL {
    title: string;
    author_name?: string[];
    cover_i?: number;
    precio?: number;
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
        const libros: LibroOL[] = await Promise.all(
            datos.docs.map(async (doc: any) => {
                return {
                    title: doc.title,
                    author_name: Array.isArray(doc.author_name) ? doc.author_name : [], //Necesario para que no tire error al usar join en el renderizado
                    cover_i: doc.cover_i,
                    precio: parseFloat((Math.random() * 20 + 5).toFixed(2)), // Genero un precio random para cada libro ya que la API no lo proporciona
                };
            })
        );
        return libros;
    } catch (error) {
        return [];
    }
}

//Función para obtener el parámetro q
function obtenerQ(s: string): string | null {
    const q: string | null = s;
    return q ? q : null;        //Devuelve q si el input no está vacío y sino devuelve null
}

// Renderizar solo los primeros 6 como destacados
let catalogo: LibroOL[] = []; // Variable global para almacenar los libros destacados y poder acceder a ellos desde la función guardarLibro
async function renderizarLibros(id: string, query: string, n: number) {
    const contenedor = document.getElementById(id);
    if (!contenedor) return;
    const q = obtenerQ(query);
    if (!q) return;
    const cargando = document.getElementById("mensajeCarga");
    if (cargando) cargando.textContent = "Cargando...";
    const libros = await obtenerLibros(q);
    catalogo = libros.slice(0, n); // cortamos los primeros n
    contenedor.innerHTML = catalogo.map((libro, index) => `
        <div class="card mb-3 gap-3" style="width: 18rem;">
            <img src="${libro.cover_i ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg` : 'placeholder.jpg'}" class="card-img-top" alt="Portada del libro">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${libro.title}</h5>
                <p class="card-text">${libro.author_name ? libro.author_name.join(", ") : "Autor desconocido"}</p>
                <div class="mt-auto d-flex justify-content-end">
                    <a href="./libro.html" class="btn" data-index="${index}" onclick="guardarLibro(this)">Ver más</a>
                </div>
            </div>
        </div>
    `).join("");
    if (cargando) {
        if (libros.length === 0) {
        cargando.textContent = "Sin resultados por ahora.";
        return;
        }
        cargando.textContent = "";
    }    
}

//Guardar el libro seleccionado en localStorage para mostrarlo en la página de detalles
//Posibilidad de mejorar este método guardando solo el ID del libro y luego haciendo
//un nuevo fetch en la página de detalles para obtener la información más actualizada
//Por ahora, para simplificar, guardo el objeto completo del libro seleccionado
function guardarLibro(btn: HTMLButtonElement) {
  const index = parseInt(btn.getAttribute("data-index") || "0", 10);
  const libro = catalogo[index];
  localStorage.setItem("libroSeleccionado", JSON.stringify(libro));
  window.location.href = "./libro.html";
}

//Función para cargar el libro seleccionado en la página de detalles
function cargarLibroSeleccionado() {
    const libroJSON = localStorage.getItem("libroSeleccionado");
    if (!libroJSON) return;
    const libro = JSON.parse(libroJSON);
    const titulo = document.getElementById("titulo");
    const autor = document.getElementById("autor");
    const portada = document.getElementById("portada") as HTMLImageElement;
    const precio = document.getElementById("precio");
    if (titulo) titulo.textContent = libro.title;
    if (autor) autor.textContent = libro.author_name?.join(", ") || "Autor desconocido";
    if (portada) portada.src = libro.cover_i? `https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`: "placeholder.jpg";
    if (precio) precio.textContent = `$${libro.precio.toFixed(2)}`;
}

async function filtrarCatalogo() {
    const input = document.getElementById("busquedaCatalogo") as HTMLInputElement;
    const contenedor = document.getElementById("catalogo");
    if (!input || !contenedor) return;
    const q = input.value.toLowerCase();
    if (!q) {
        renderizarLibros('catalogo', 'bestseller', 30);
        return;
    }
    renderizarLibros('catalogo', q, 30);
}

const boton = document.getElementById("botonInicio");
if (boton) {
    boton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

const botonVolver = document.getElementById("botonVolver");
if (botonVolver) {
    botonVolver.addEventListener("click", () => {
        history.back(); // vuelve a la página anterior
    });
}
