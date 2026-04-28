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
        return [];                                          //Condición para imprimir el mensaje de error
    }
}

//Función para destructurar nombre y correo
const mostrarUsuario = ({name: nombre, email: correo}: Usuario): string => {
    return `${nombre} - ${correo}`;
};


async function recorrer() {
    const mensaje: HTMLElement | null = document.getElementById("mensaje");
    if (mensaje){
        mensaje.textContent = 'Cargando...'
    }
    const usuarios: Usuario[] = await obtenerUsuarios();
    if (usuarios.length === 0){
        const error: HTMLElement | null = document.getElementById("error");
        if (error && mensaje){
            mensaje.textContent = '';
            error.textContent = 'No se han cargado usuarios.';
            return;                                             //Si hay error imprimo el mensaje y corto ejecución
        }
    }
    const lista: HTMLElement | null = document.getElementById("lista");
    if (lista){
        lista.innerHTML = '';
        for (let i = 0; i < usuarios.length; i++){
            const item: HTMLElement = document.createElement('li');
            item.textContent = mostrarUsuario(usuarios[i]);;
            lista.appendChild(item);
        }
    }
    if (mensaje){
        mensaje.textContent = '';
    }
}

document.getElementById("botonRecorrer")?.addEventListener("click", recorrer);
