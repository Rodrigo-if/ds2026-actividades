//switch clasificar nota
const clasificarNota = () => {
    const nota = parseFloat(document.getElementById("nota").value);
    switch (true) {
        case (nota < 4): console.log("Desaprobado"); break;
        case (nota >= 8): console.log("Promocionado"); break;
        case (nota >= 4): console.log("Aprobado"); break;
    }
}

//switch días de la semana
const diaDeLaSemana = () => {
    const dia = parseInt(document.getElementById("dia").value);
    switch (dia) {
        case 1: console.log("Lunes"); break;
        case 2: console.log("Martes"); break;
        case 3: console.log("Miércoles"); break;
        case 4: console.log("Jueves"); break;
        case 5: console.log("Viernes"); break;
        case 6: console.log("Sábado (fin de semana)"); break;
        case 7: console.log("Domingo (fin de semana)"); break;
        default: console.log("Número de día inválido");
    }
}