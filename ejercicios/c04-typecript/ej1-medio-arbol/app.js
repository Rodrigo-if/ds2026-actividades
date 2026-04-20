"use strict";
function generarAsteriscos(altura) {
    //Validación
    if (isNaN(altura) || altura <= 0) {
        alert("Error. Altura inválida.");
        return "";
    }
    // Generar el medio árbol
    let resultado = "";
    for (let i = 1; i <= altura; i++) {
        resultado += `${("*").repeat(i)}\n`; //El repeat agrega un asterisco por iteración
    }
    return resultado;
}
function mostrarResultado() {
    const a = document.getElementById("altura"); //Asigno tipos especiales de HTML para evitar errores de tipo
    const r = document.getElementById("resultado");
    //Valido que los elementos existan antes de usarlos
    if (a && r) {
        r.textContent = generarAsteriscos(parseInt(a.value));
    }
}
