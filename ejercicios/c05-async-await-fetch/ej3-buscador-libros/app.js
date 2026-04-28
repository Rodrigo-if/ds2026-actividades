"use strict";
//Función asincrónica para el fetch
async function obtenerLibros(q) {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}`); //encodeURIComponent acomoda el q para que sea una URL válida
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`); //Corroboro si se produjo algún error al traer los datos de la API
        }
        const datos = await response.json();
        //Mapeo necesario para poder usar el slice después
        const libros = datos.docs.map((doc) => ({
            title: doc.title,
            author_name: doc.author_name ? doc.author_name[0] : undefined,
            first_publish_year: doc.first_publish_year
        }));
        return libros;
    }
    catch (error) {
        return []; //Condición para imprimir el mensaje de error
    }
}
//Función para obtener el parámetro q del input
function obtenerQ() {
    const input = document.getElementById("buscador");
    if (!input)
        return null;
    const q = input.value.trim();
    return q ? q : null; //Devuelve q si el input no está vacío y sino devuelve null
}
//Función para generar las tarjetas
function generarTarjetas(libros) {
    const div = document.getElementById("resultados");
    if (!div)
        return;
    div.innerHTML = '';
    //slice me devuelve los primeros 10 o el array completo si hay menos
    libros.slice(0, 10).forEach((libro) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = "tarjeta";
        //Título no lo valido porque es obligatorio
        const titulo = document.createElement('h3');
        titulo.textContent = libro.title;
        tarjeta.appendChild(titulo);
        //Autor sí lo valido porque es opcional
        if (libro.author_name) {
            const autor = document.createElement('p');
            autor.textContent = libro.author_name;
            tarjeta.appendChild(autor);
        }
        //Año sí lo valido porque es opcional
        if (libro.first_publish_year) {
            const anio = document.createElement('p');
            anio.textContent = libro.first_publish_year.toString();
            tarjeta.appendChild(anio);
        }
        div.appendChild(tarjeta);
    });
}
//Función para errores
function mostrarError(texto) {
    const error = document.getElementById("error");
    if (error)
        error.textContent = `${texto}`;
}
async function buscar() {
    mostrarError('');
    const mensaje = document.getElementById("mensaje");
    if (mensaje)
        mensaje.textContent = 'Cargando...';
    const q = obtenerQ();
    if (!q) {
        if (mensaje)
            mensaje.textContent = '';
        mostrarError('No hay resultados para la búsqueda.');
        return;
    }
    const libros = await obtenerLibros(q);
    if (libros.length === 0) {
        if (mensaje)
            mensaje.textContent = '';
        mostrarError('El fetch tomó demasiado tiempo o no obtuvo respuesta.');
        return;
    }
    generarTarjetas(libros);
    if (mensaje)
        mensaje.textContent = '';
}
document.getElementById("botonBuscar")?.addEventListener("click", buscar);
