import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { apiFetch } from "../services/api";
import { guardarToken } from "../services/sesion";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const res = await apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      guardarToken(res.token);
      onLoginSuccess();
    } catch (err) {
      setError((err as Error).message || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card className="p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Iniciar Sesión</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="inputForm"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputForm"
                required
              />
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