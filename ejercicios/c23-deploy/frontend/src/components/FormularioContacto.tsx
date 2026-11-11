import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Button, Form, Toast, ToastContainer } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactoSchema, type ContactoFormData } from '../schemas/contactoSchema'
import '../assets/styles/App.css'

export function FormularioContacto() {
  const [showToast, setShowToast] = useState(false);

  // Configuramos React Hook Form con el resolver de Zod y el schema importado
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactoFormData>({
    resolver: zodResolver(contactoSchema),
    defaultValues: {
      nombre: "",
      correo: "",
      asunto: "Consulta",
      mensaje: "",
    }
  });

  const onSubmit = (data: ContactoFormData) => {
    console.log("Datos válidos:", data);
    setShowToast(true);
    reset(); // Limpia el formulario tras enviarlo con éxito
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="container my-0" style={{ maxWidth: "600px" }}>
      {/* Contenedor de Toast */}
      <ToastContainer position="top-center" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} autohide delay={3000}>
          <Toast.Body className="text-white bg-success"> Mensaje enviado correctamente </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Formulario */}
      <Form className="container my-5" style={{ maxWidth: "600px" }} onSubmit={handleSubmit(onSubmit)}>
        
        {/* Campo Nombre */}
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label className="d-flex me-auto">Nombre</Form.Label>
          <Form.Control 
            type="text" 
            {...register("nombre")} 
            isInvalid={!!errors.nombre}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nombre?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Campo Correo */}
        <Form.Group className="mb-3" controlId="correo">
          <Form.Label className="d-flex me-auto">Correo electrónico</Form.Label>
          <Form.Control
            {...register("correo")} 
            isInvalid={!!errors.correo}
          />
          <Form.Control.Feedback type="invalid">
            {errors.correo?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Campo Asunto */}
        <Form.Group className="mb-3" controlId="asunto">
          <Form.Label className="d-flex me-auto">Asunto</Form.Label>
          <Form.Select 
            {...register("asunto")} 
            isInvalid={!!errors.asunto}
          >
            <option value="Consulta">Consulta</option>
            <option value="Sugerencia">Sugerencia</option>
            <option value="Reclamo">Reclamo</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.asunto?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Campo Mensaje */}
        <Form.Group className="mb-3" controlId="mensaje">
          <Form.Label className="d-flex me-auto">Mensaje</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={4} 
            {...register("mensaje")} 
            isInvalid={!!errors.mensaje}
          />
          <Form.Control.Feedback type="invalid">
            {errors.mensaje?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button type="submit" variant="primary">Aceptar</Button>
        </div>
      </Form>
    </div>
  );
}