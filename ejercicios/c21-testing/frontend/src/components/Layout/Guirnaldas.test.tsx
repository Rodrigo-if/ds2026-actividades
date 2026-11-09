import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Guirnaldas from "./Guirnaldas";

describe("Componente Guirnaldas", () => {
  it("renderiza la imagen de decoración correctamente", () => {
    render(<Guirnaldas />);
    const imagen = screen.getByAltText("Decoración");
    expect(imagen).toBeInTheDocument();
  });
});