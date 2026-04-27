"use strict";
//Función asincrónica
async function obtenerUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`); //Corroboro si se produjo algún error al traer los datos de la API
        }
        const users = await response.json();
        return users;
    }
    catch (error) {
        console.error('Error al obtener libros:', error); //Informo si hay algún error al traer los datos de la API
        return [];
    }
}
//Función para destructurar nombre y correo
function mostrarUsuario({ name: nombre, email: correo }) {
    console.log(`${nombre} - ${correo}`);
}
async function recorrer() {
    const usuarios = await obtenerUsuarios();
    usuarios.forEach(mostrarUsuario);
}
recorrer();
