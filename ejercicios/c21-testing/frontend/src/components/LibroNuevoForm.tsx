import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button } from "react-bootstrap";
import { libroSchema, type LibroValidado } from "../schemas/libroSchema.ts";
import { useState } from "react";
import { ToastMensaje } from "./NotifyToast.tsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles/App.css'
import { useNavigate } from "react-router-dom";

interface LibroNuevoFormProps {
  onAgregar: (nuevo: LibroValidado) => void;
}

function LibroNuevoForm({ onAgregar }: LibroNuevoFormProps) {
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState: { errors }, reset, } = useForm({
    resolver: zodResolver(libroSchema),
    defaultValues: { author_name: [{ name: "" }], disponible: "no disponible"},
  });
  const [showToast, setShowToast] = useState(false);
  const { fields, append, remove } = useFieldArray({control, name: "author_name"});
  const onSubmit = (data: LibroValidado) => {
    onAgregar(data);
    setShowToast(true);
    reset();
    navigate('/catalogo', { state: {nuevoLibro: data} });
  };
  return (
    <div className="container my-0 form-container">
      <ToastMensaje mensaje="Libro registrado correctamente" tipo="toast-good" mostrar={showToast} onClose={() => setShowToast(false)} />
      <Form onSubmit={handleSubmit(onSubmit)} className="p-3 mt-5">
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control className="inputForm w-50 mx-auto" type="text" {...register("title")} isInvalid={!!errors.title} />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Autor(es)</Form.Label>
          {fields.map((field, index) => (
            <div key={field.id} className="d-flex justify-content-center align-items-center mb-3 position-relative w-100">
              <div className="w-50 mx-auto">
                <Form.Control className="inputForm w-100" type="text" placeholder={`Autor ${index + 1}`} {...register(`author_name.${index}.name` as const)} isInvalid={!!errors.author_name?.[index]?.name} />
                <Form.Control.Feedback type="invalid">
                  {errors.author_name?.[index]?.name?.message}
                </Form.Control.Feedback>
              </div>
              {index > 0 && (
              <div className="position-absolute align-self-start" id="eliminarAutor">
                <Button variant="outline-danger" onClick={() => remove(index)}> ✕ </Button>
              </div>
              )}
            </div>
          ))}
          {errors.author_name?.message && (
            <Form.Text className="text-danger text-center">
              {errors.author_name.message}
            </Form.Text>
          )}
          <Button className="w-25 m-auto" variant="outline-primary" onClick={() => append({ name: "" })}>
            + Agregar autor
          </Button>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio del libro</Form.Label>
          <Form.Control className="inputForm w-50 mx-auto" type="number" {...register("precio")} isInvalid={!!errors.precio} />
          <Form.Control.Feedback type="invalid">
            {errors.precio?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Disponibilidad</Form.Label>
          <Form.Select className="selectForm w-50 mx-auto" {...register("disponible")} isInvalid={!!errors.disponible}>
            <option value="no disponible">No disponible</option>
            <option value="disponible">Disponible</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.disponible?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Agregar libro
        </Button>
      </Form>
    </div>
  );
}

export default LibroNuevoForm;
