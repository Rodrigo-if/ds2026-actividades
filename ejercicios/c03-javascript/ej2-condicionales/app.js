//Función para poder recibir la nota por un input desde HTML
const devolverNota = () => {
    const nota = parseFloat(document.getElementById("nota").value);
//switch clasificar nota
    const clasificarNota = (nota) => {
        switch (true) {
            case (nota < 4): return "Desaprobado";
            case (nota >= 8): return "Promocionado";
            case (nota >= 4): return "Aprobado";
        }
    }
    console.log(clasificarNota(nota));
}

//Función para poder recibir el día por un input desde HTML
const devolverDia = () => {
    const dia = parseInt(document.getElementById("dia").value);
//switch días de la semana
    const diaDeLaSemana = (dia) => {
        switch (dia) {
            case 1: return "Lunes";
            case 2: return "Martes";
            case 3: return "Miércoles";
            case 4: return "Jueves";
            case 5: return "Viernes";
            case 6: return "Sábado (fin de semana)";
            case 7: return "Domingo (fin de semana)";
            default: return "Número de día inválido";
        }
    }
    console.log(diaDeLaSemana(dia));
}