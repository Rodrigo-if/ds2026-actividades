const recibirAltura = () => {
    const altura = parseInt(document.getElementById("altura").value);
    //Validación
    if (isNaN(altura) || altura <= 0) {
        alert("Error. Altura inválida.");
        return;
    }
    // Generar el medio árbol
    let resultado = "";
    for (let i = 1; i <= altura; i++) {
        resultado += `${("*").repeat(i)}\n`;                        //El repeat agrega un asteriscopor iteración
    }
    document.getElementById("resultado").textContent = resultado;   //Asigno el resultado al id que uso para el <pre>
}
