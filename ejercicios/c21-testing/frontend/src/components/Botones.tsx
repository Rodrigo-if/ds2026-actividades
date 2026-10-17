import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import '../assets/styles/App.css'

//Botón para volver al inicio del catálogo
export function BotonInicio() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Button className="btn" id="botonInicio" onClick={handleClick}> Ir al principio </Button>
  );
}

//Botón volver atrás
export function BotonVolver() {
  const handleClick = () => {
    history.back(); // vuelve a la página anterior
  };
  return (
    <Button className="btn" id="botonVolver" onClick={handleClick}> Volver </Button>
  );
}