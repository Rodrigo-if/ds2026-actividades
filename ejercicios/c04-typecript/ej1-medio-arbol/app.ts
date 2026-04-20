function generarAsteriscos(altura: string): string {    //Asigno mal el tipo de dato, altura debería ser un number
    //Validación
    if (isNaN(altura) || altura <= 0) {
        alert("Error. Altura inválida.");
        return "";
    }
    // Generar el medio árbol
    let resultado: string = "";
    for (let i = 1; i <= altura; i++) {
        resultado += `${("*").repeat(i)}\n`;    //El repeat agrega un asterisco por iteración
    }
    return resultado;
}

function mostrarResultado(): void {
    const a: HTMLInputElement | null = document.getElementById("altura") as HTMLInputElement;   //Asigno tipos especiales de HTML para evitar errores de tipo
    const r: HTMLDivElement | null = document.getElementById("resultado") as HTMLDivElement;
    //Valido que los elementos existan antes de usarlos
    if (a && r) {
        r.textContent = generarAsteriscos(parseInt(a.value));
    }
}
