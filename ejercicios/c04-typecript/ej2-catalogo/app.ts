interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero: string;
}

//Listado de libros aleatorios para probar las funciones
const lista_libros: Libro[] = [{ isbn: '978-3-16-148410-0', titulo: 'El Gran Gatsby', autor: 'F. Scott Fitzgerald', precio: 10.99, disponible: true, genero: 'Ficción' },
{ isbn: '978-0-14-028333-4', titulo: '1984', autor: 'George Orwell', precio: 8.99, disponible: false, genero: 'Distopía' },
{ isbn: '978-0-452-28423-4', titulo: 'Matar a un ruiseñor', autor: 'Harper Lee', precio: 12.99, disponible: true, genero: 'Ficción' }];

function buscarPorAutor(autor:string): Libro[] {    //Función para filtrar por autor
    for (let i = 0; i < lista_libros.length; i++) {
        if (lista_libros[i].autor === autor) {
            return [lista_libros[i]];
        }
    }
    return [];
}

function mostrarDisponibles(): Libro[] {    //Función para mostrar los libros disponibles
    for (let i = 0; i < lista_libros.length; i++) {
        if (lista_libros[i].disponible) {
            return [lista_libros[i]];
        }
    }
    return [];
}

function precioPromedio(libros: Libro[]): number {    //Función para calcular el precio promedio
    let total = 0;
    for (let i = 0; i < libros.length; i++) {
        total += libros[i].precio;
    }
    return total / libros.length;
}

function renderizar(libros: Libro[]): void {    //Función para renderizar los libros en la lista
    const lista = document.getElementById('listado');
    const promedio = document.getElementById('stats');
    if (lista) {
        lista.innerHTML = '';
        for (let i = 0; i < libros.length; i++) {
            const libro = libros[i];
            const item = document.createElement('li');
            item.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio}`;       //Agrego el título, autor y precio como strings de la lista
            lista.appendChild(item);
        }
    }
    if (promedio) {
        promedio.textContent = `Precio promedio: $${precioPromedio(libros).toFixed(2)}`;    //Agrego el precio promedio con dos decimales
    }
}