//Función para poder recibir monto y medio de pago por input
const devolverMonto = () => {
    const monto =parseFloat(document.getElementById("monto").value);
    const medioPago = document.getElementById("medioPago").value;
//switch para aplicar descuento
    const calcularMontoFinal = (monto, medioPago) => {
        switch (true) {
            case (monto < 200): return monto;
            case (monto > 400): return monto * 0.6;
            case (monto >= 200 && monto <= 400): {
                switch (medioPago) {
                    case "E": return monto * 0.7; //Efectivo
                    case "D": return monto * 0.8; //Débito
                    case "C": return monto * 0.9; //Credito
                }
            }
        }
    }
    console.log(`Monto: ${monto} | Pago: ${medioPago} | Final: ${calcularMontoFinal(monto, medioPago)}`);
}
//Nota: no se contempla el caso de que el usuario ingrese un medio de pago no válido o un monto negativo