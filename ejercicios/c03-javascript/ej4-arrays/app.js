//array de ocho números fijo
const numeros = [1, 2, 3, 4, 5, 6, 7, 8];

console.log('Los números del array son:');

let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];
for (let i = 0; i < numeros.length; i++) {
    console.log(`${numeros[i]}`);   //Muestro los números del array
    suma += numeros[i];             //Suma total
    if (numeros[i] > mayor) {
        mayor = numeros[i];
    }
    if (numeros[i] < menor) {
        menor = numeros[i];
    }
}
console.log(`La suma total es: ${suma}`);
//Cálculo del promedio
let promedio = suma / numeros.length;
console.log(`El promedio es: ${promedio}`);
console.log(`El número mayor es: ${mayor}`);
console.log(`El número menor es: ${menor}`);

//Función para generar asteriscos
const generarAsteriscos = (cant) => {
    let stringAsteriscos = "";
    for (let i = 0; i < cant; i++) {
        stringAsteriscos += "*";
    }
    return stringAsteriscos;
}
const recibirCantidad = () => {
    let cant = parseInt(document.getElementById('cantidad').value); //Recibo el valor por input
    console.log(`${generarAsteriscos(cant)}`);                      //Muestro los asteriscos generados
}