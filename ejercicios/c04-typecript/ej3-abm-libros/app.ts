interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero: string;
}

//Listado de libros aleatorios para probar las funciones
let lista_libros: Libro[] = [{ isbn: '978-3-16-148410-0', titulo: 'El Gran Gatsby', autor: 'F. Scott Fitzgerald', precio: 10.99, disponible: true, genero: 'Ficción' },
{ isbn: '978-0-14-028333-4', titulo: '1984', autor: 'George Orwell', precio: 8.99, disponible: false, genero: 'Distopía' },
{ isbn: '978-0-452-28423-4', titulo: 'Matar a un ruiseñor', autor: 'Harper Lee', precio: 12.99, disponible: true, genero: 'Ficción' }];

function validarFormulario(): void {    //Agregar un nuevo libro desde el formulario
    const formulario: HTMLFormElement = document.getElementById('formulario') as HTMLFormElement;
    const div: HTMLElement = document.getElementById('errorForm') as HTMLElement;
    if (formulario) {
        const isbn: string = (document.getElementById('isbn') as HTMLInputElement).value;
        const titulo: string = (document.getElementById('titulo') as HTMLInputElement).value;
        const autor: string = (document.getElementById('autor') as HTMLInputElement).value;
        const precio: number = parseFloat((document.getElementById('precio') as HTMLInputElement).value);
        const genero: string = (document.getElementById('genero') as HTMLInputElement).value;
        const disponible: boolean = (document.getElementById('disponible') as HTMLInputElement).checked;
        const libro: Libro | null = validarLibro(isbn, titulo, autor, precio, disponible, genero);
        if (libro !== null){
            agregarLibro(libro);
            formulario.reset();     //Limpia el formulario
        }
        else {
            if (div) {
                div.textContent = "Error en los campos ingresados."
            }
        }
    }
}

function agregarLibro(libro: Libro): void {     //Función para agregar un libro a la lista
    lista_libros.push(libro);
    renderizar(lista_libros);
}

function eliminarLibro(libro: Libro): void {    //Función para eliminar un libro de la lista
    const index = lista_libros.indexOf(libro);
    if (index !== -1) {
        lista_libros.splice(index, 1);
    }
    renderizar(lista_libros);
}

function validarLibro(isbn: string, titulo: string, autor: string, precio: number, disponible: boolean, genero: string): Libro | null {
    if (isbn && titulo && autor && precio && genero && precio > 0) {
        const libro: Libro = { isbn, titulo, autor, precio, disponible, genero };
        return libro;
    }
    else return null;
}

function buscarPorAutor(autor:string): Libro[] {        //Función para filtrar por autor
    let librosPorAutor: Libro[] = [];
    for (let i = 0; i < lista_libros.length; i++) {
        if (lista_libros[i].autor === autor) {
            librosPorAutor.push(lista_libros[i]);
        }
    }
    return librosPorAutor;
}

function mostrarDisponibles(): Libro[] {                //Función para mostrar los libros disponibles
    let disponibles: Libro[] = [];
    for (let i = 0; i < lista_libros.length; i++) {
        if (lista_libros[i].disponible) {
            disponibles.push(lista_libros[i]);
        }
    }
    return disponibles;
}

function precioPromedio(libros: Libro[]): number {      //Función para calcular el precio promedio
    let total: number = 0;
    for (let i = 0; i < libros.length; i++) {
        total += libros[i].precio;
    }
    return total / libros.length;
}

function renderizar(libros: Libro[]): void {            //Función para renderizar los libros en la lista
    const lista: HTMLElement | null = document.getElementById('listado');
    const promedio: HTMLElement | null = document.getElementById('stats');
    if (lista) {
        lista.innerHTML = '';
        for (let i = 0; i < libros.length; i++) {
            const libro: Libro = libros[i];
            const item: HTMLElement = document.createElement('li');
            item.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio}`;           //Agrego el título, autor y precio como strings de la lista
            lista.appendChild(item);
            const botonEliminar: HTMLButtonElement = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick = function () {
                eliminarLibro(libro);
                renderizar(lista_libros);
            }
            lista.appendChild(botonEliminar);
        }
    }
    if (promedio) {
        promedio.textContent = "";                                                              //Si no hay libros, limpio el texto del promedio
        if (libros.length > 0) {
            promedio.textContent = `Precio promedio: $${precioPromedio(libros).toFixed(2)}`;    //Agrego el precio promedio con dos decimales
        }        
    }
}