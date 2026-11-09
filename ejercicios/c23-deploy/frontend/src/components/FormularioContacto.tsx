import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Button, Form, Toast, ToastContainer } from 'react-bootstrap'
import '../assets/styles/App.css'

export function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    asunto: "Consulta",
    mensaje: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [showToast, setShowToast] = useState(false);
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); //Para que se oculte solo a los 3 segundos
  };
  return (
    <div className="container my-0" style={{ maxWidth: "600px" }}>
      {/* Contenedor de Toast */}
      <ToastContainer position="top-center" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} autohide delay={3000} >
          <Toast.Body className="text-white"> Mensaje enviado correctamente </Toast.Body>
        </Toast>
      </ToastContainer>
      {/* Formulario */}
      <Form className="container my-5" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label className="d-flex me-auto">Nombre</Form.Label>
          <Form.Control type="text" name="nombre" id="nombreForm" value={formData.nombre} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="correo">
          <Form.Label className="d-flex me-auto">Correo electrónico</Form.Label>
          <Form.Control type="email" name="correo" id="mailForm" value={formData.correo} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="asunto">
          <Form.Label className="d-flex me-auto">Asunto</Form.Label>
          <Form.Select value={formData.asunto} onChange={handleChange} name="asunto" id="opcionForm" required>
            <option>Consulta</option>
            <option>Sugerencia</option>
            <option>Reclamo</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="mensaje">
          <Form.Label className="d-flex me-auto">Mensaje</Form.Label>
          <Form.Control as="textarea" rows={4} value={formData.mensaje} name="mensaje" id="mensajeForm" onChange={handleChange} required />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button type="submit" variant="primary">Aceptar</Button>
        </div>
      </Form>
    </div>
  );
}