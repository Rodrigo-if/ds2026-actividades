import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { apiFetch } from "../services/api";
import { guardarToken } from "../services/sesion";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";

interface LoginProps {
  onLoginSuccess: () => void;
}

interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
  };
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo al modificarlo
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorApi(null);
    setErrores({});

    // Validar datos con Zod
    const resultado = loginSchema.safeParse(formData);

    if (!resultado.success) {
      const mapaErrores: Record<string, string> = {};
      resultado.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          mapaErrores[issue.path[0].toString()] = issue.message;
        }
      });
      setErrores(mapaErrores);
      return;
    }

    setCargando(true);

    try {
      const res = await apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(resultado.data),
      });

      guardarToken(res.token);
      onLoginSuccess();
    } catch (err) {
      setErrorApi((err as Error).message || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card className="p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Iniciar Sesión</Card.Title>

          {errorApi && <Alert variant="danger">{errorApi}</Alert>}

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="usuario@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errores.email}
                className="inputForm"
              />
              <Form.Control.Feedback type="invalid">
                {errores.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errores.password}
                className="inputForm"
              />
              <Form.Control.Feedback type="invalid">
                {errores.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100 btn" disabled={cargando}>
              {cargando ? "Ingresando..." : "Ingresar"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};