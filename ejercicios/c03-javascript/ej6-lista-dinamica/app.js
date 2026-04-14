let productos = [];

//Función para agregar un producto a la lista
const agregarProducto = (producto) => {
    productos.push(producto);
}

//Función para eliminar un producto de la lista
const eliminarProducto = (index) => {
    productos.splice(index, 1);
}

//Validación del input
const validarProducto = (producto) => {
    if (producto === '') {
        alert("Error. Nombre de producto inválido.");
        return false;
    }
    return true;
}

//Convertir array a HTML
const convertirAHTML = () => {
    const lista = document.getElementById('lista');                 //Recibo la lista del HTML
    lista.innerHTML = '';
    productos.forEach((producto, index) => {                        //Recorro el array de productos
        const item = document.createElement('li');                  //Creo un elemento de lista para cada producto
        item.textContent = producto;                                //Asigno el nombre del producto al elemento de lista
        const botonEliminar = document.createElement('button');     //Creo un botón para eliminar
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => {                             //Asigno la función al hacer click en el botón
            eliminarProducto(index);
            convertirAHTML();
            mostrarCantidad()
        };
        item.appendChild(botonEliminar);                            //Agrego el botón al elemento de lista
        lista.appendChild(item);                                    //Agrego el elemento de lista con el botón
    });
}

const recibirProducto = () => {
    const producto = document.getElementById('producto').value.trim();
    if (validarProducto(producto)) {
        agregarProducto(producto);
        convertirAHTML();
        mostrarCantidad();
    }
}

//Contar cantidad de productos
const contarProductos = () => {
    return productos.length;
}

//Mostrar la cantidad de productos
const mostrarCantidad = () => {
    const cantidad = contarProductos();
    document.getElementById('cantidad').textContent = `${cantidad} producto(s) en la lista.`;
}