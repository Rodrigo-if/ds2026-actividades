import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ToastMensaje } from "./NotifyToast";

describe("Componente ToastMensaje", () => {
  it("renderiza el mensaje correctamente cuando está visible", () => {
    render(
      <ToastMensaje
        mensaje="Acción realizada con éxito"
        mostrar={true}
        tipo="toast-good"
        onClose={() => {}}
      />
    );

    expect(screen.getByText("Acción realizada con éxito")).toBeInTheDocument();
  });

  it("no muestra el contenido de forma activa si la propiedad mostrar es false", () => {
    render(
      <ToastMensaje
        mensaje="Mensaje oculto"
        mostrar={false}
        tipo="toast-good"
        onClose={() => {}}
      />
    );

    const toastElement = screen.queryByText("Mensaje oculto");
    // El elemento puede estar en el DOM pero oculto/no visible por Bootstrap
    if (toastElement) {
      expect(toastElement).not.toBeVisible();
    } else {
      expect(toastElement).not.toBeInTheDocument();
    }
  });
});