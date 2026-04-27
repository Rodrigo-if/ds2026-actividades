interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: number;
}

//Función asincrónica
async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok){
            throw new Error(`HTTP ${response.status}`);     //Corroboro si se produjo algún error al traer los datos de la API
        }
        const users: Usuario[] = await response.json();
        return users;
    } catch (error) {
        console.error('Error al obtener libros:', error);   //Informo si hay algún error al traer los datos de la API
        return [];
    }
}

//Función para destructurar nombre y correo
function mostrarUsuario({name: nombre, email: correo}: Usuario){
    console.log(`${nombre} - ${correo}`);
}

async function recorrer() {
    const usuarios: Usuario[] = await obtenerUsuarios();
    usuarios.forEach(mostrarUsuario);
}

recorrer();