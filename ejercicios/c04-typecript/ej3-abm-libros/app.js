"use strict";
//Listado de libros aleatorios para probar las funciones
let lista_libros = [{ isbn: '978-3-16-148410-0', titulo: 'El Gran Gatsby', autor: 'F. Scott Fitzgerald', precio: 10.99, disponible: true, genero: 'Ficción' },
    { isbn: '978-0-14-028333-4', titulo: '1984', autor: 'George Orwell', precio: 8.99, disponible: false, genero: 'Distopía' },
    { isbn: '978-0-452-28423-4', titulo: 'Matar a un ruiseñor', autor: 'Harper Lee', precio: 12.99, disponible: true, genero: 'Ficción' }];
function validarFormulario() {
    const formulario = document.getElementById('formulario');
    const div = document.getElementById('errorForm');
    if (formulario) {
        const isbn = document.getElementById('isbn').value;
        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const genero = document.getElementById('genero').value;
        const disponible = document.getElementById('disponible').checked;
        const libro = validarLibro(isbn, titulo, autor, precio, disponible, genero);
        if (libro !== null) {
            agregarLibro(libro);
            formulario.reset(); //Limpia el formulario
        }
        else {
            if (div) {
                div.textContent = "Error en los campos ingresados.";
            }
        }
    }
}
function agregarLibro(libro) {
    lista_libros.push(libro);
    renderizar(lista_libros);
}
function eliminarLibro(libro) {
    const index = lista_libros.indexOf(libro);
    if (index !== -1) {
        lista_libros.splice(index, 1);
    }
    renderizar(lista_libros);
}
function validarLibro(isbn, titulo, autor, precio, disponible, genero) {
    if (isbn && titulo && autor && precio && genero && precio > 0) {
        const libro = { isbn, titulo, autor, precio, disponible, genero };
        return libro;
    }
    else
        return null;
}
function buscarPorAutor(autor) {
    let librosPorAutor = [];
    for (let i = 0; i < lista_libros.length; i++) {
        if (lista_libros[i].autor === autor) {
            librosPorAutor.push(lista_libros[i]);
        }
    }
    return librosPorAutor;
}
function mostrarDisponibles() {
    let disponibles = [];
    for (let i = 0; i < lista_libros.length; i++) {
        if (lista_libros[i].disponible) {
            disponibles.push(lista_libros[i]);
        }
    }
    return disponibles;
}
function precioPromedio(libros) {
    let total = 0;
    for (let i = 0; i < libros.length; i++) {
        total += libros[i].precio;
    }
    return total / libros.length;
}
function renderizar(libros) {
    const lista = document.getElementById('listado');
    const promedio = document.getElementById('stats');
    if (lista) {
        lista.innerHTML = '';
        for (let i = 0; i < libros.length; i++) {
            const libro = libros[i];
            const item = document.createElement('li');
            item.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio}`; //Agrego el título, autor y precio como strings de la lista
            lista.appendChild(item);
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick = function () {
                eliminarLibro(libro);
                renderizar(lista_libros);
            };
            lista.appendChild(botonEliminar);
        }
    }
    if (promedio) {
        promedio.textContent = ""; //Si no hay libros, limpio el texto del promedio
        if (libros.length > 0) {
            promedio.textContent = `Precio promedio: $${precioPromedio(libros).toFixed(2)}`; //Agrego el precio promedio con dos decimales
        }
    }
}
