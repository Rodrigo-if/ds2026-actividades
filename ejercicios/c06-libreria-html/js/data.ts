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
let destacados: LibroOL[] = []; // Variable global para almacenar los libros destacados y poder acceder a ellos desde la función guardarLibro
async function renderizarDestacados() {
    const contenedor = document.getElementById("destacados");
    if (!contenedor) return;
    const q = obtenerQ("bestseller"); // Si no hay q, usamos "bestseller" como default
    if (!q){
        console.warn("No se proporcionó un término de búsqueda válido para destacados.");
        return;
    }
    const libros = await obtenerLibros(q); // 🔑 query que devuelve destacados
    destacados = libros.slice(0, 6); // cortamos los primeros 6
    contenedor.innerHTML = destacados.map((libro, index) => `
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
}

//Guardar el libro seleccionado en localStorage para mostrarlo en la página de detalles
//Posibilidad de mejorar este método guardando solo el ID del libro y luego haciendo
//un nuevo fetch en la página de detalles para obtener la información más actualizada
//Por ahora, para simplificar, guardo el objeto completo del libro seleccionado
function guardarLibro(btn: HTMLButtonElement) {
  const index = parseInt(btn.getAttribute("data-index") || "0", 10);
  const libro = destacados[index]; // destacados está en el mismo scope
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