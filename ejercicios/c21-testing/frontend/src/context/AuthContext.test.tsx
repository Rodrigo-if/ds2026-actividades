import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthProvider, AuthContext } from "./AuthContext";
import { useContext } from "react";
import { apiFetch } from "../services/api";
import { obtenerToken, guardarToken, borrarToken } from "../services/sesion";

vi.mock("../services/api", () => ({
  apiFetch: vi.fn(),
}));

vi.mock("../services/sesion", () => ({
  obtenerToken: vi.fn(),
  guardarToken: vi.fn(),
  borrarToken: vi.fn(),
}));

// Componente auxiliar para consumir el contexto en los tests
function TestConsumer() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  return (
    <div>
      <span data-testid="cargando">{auth.cargando ? "Cargando" : "Listo"}</span>
      <span data-testid="autenticado">{auth.estaAutenticado ? "Sí" : "No"}</span>
      <span data-testid="usuario">{auth.usuario?.nombre || "Sin usuario"}</span>
      <button onClick={() => auth.login({ email: "test@test.com", password: "123" })}>
        Login
      </button>
      <button onClick={() => auth.logout()}>Logout</button>
      <span data-testid="es-admin">{auth.tieneRol("ADMIN") ? "Es Admin" : "No es Admin"}</span>
    </div>
  );
}

describe("AuthContext y AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("inicializa sin token y cargando en falso", () => {
    vi.mocked(obtenerToken).mockReturnValue(null);

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("cargando")).toHaveTextContent("Listo");
    expect(screen.getByTestId("autenticado")).toHaveTextContent("No");
    expect(screen.getByTestId("usuario")).toHaveTextContent("Sin usuario");
  });

  it("ejecuta login correctamente, guarda el token y setea el usuario", async () => {
    const user = userEvent.setup();
    vi.mocked(obtenerToken).mockReturnValue(null);
    vi.mocked(apiFetch).mockResolvedValueOnce({
      token: "fake-token",
      usuario: { id: "1", nombre: "Juan", email: "juan@test.com", rol: "ADMIN" },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(guardarToken).toHaveBeenCalledWith("fake-token");
      expect(screen.getByTestId("usuario")).toHaveTextContent("Juan");
      expect(screen.getByTestId("autenticado")).toHaveTextContent("Sí");
      expect(screen.getByTestId("es-admin")).toHaveTextContent("Es Admin");
    });
  });

  it("ejecuta logout correctamente, borra el token y limpia el usuario", async () => {
    const user = userEvent.setup();
    vi.mocked(obtenerToken).mockReturnValue("fake-token");
    vi.mocked(apiFetch).mockResolvedValueOnce({
      id: "1",
      nombre: "Juan",
      email: "juan@test.com",
      rol: "USER",
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("usuario")).toHaveTextContent("Juan");
    });

    await user.click(screen.getByRole("button", { name: /logout/i }));

    expect(borrarToken).toHaveBeenCalled();
    expect(screen.getByTestId("usuario")).toHaveTextContent("Sin usuario");
    expect(screen.getByTestId("autenticado")).toHaveTextContent("No");
  });
});