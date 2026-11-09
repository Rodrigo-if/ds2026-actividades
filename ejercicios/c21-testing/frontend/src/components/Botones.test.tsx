import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { BotonInicio, BotonVolver } from "./Botones";

describe("Componentes Botones", () => {
  it("BotonInicio hace scroll al principio de la ventana", async () => {
    const user = userEvent.setup();
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    render(<BotonInicio />);
    const boton = screen.getByRole("button", { name: /ir al principio/i });
    await user.click(boton);

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    scrollToSpy.mockRestore();
  });

  it("BotonVolver llama a history.back", async () => {
    const user = userEvent.setup();
    const backSpy = vi.spyOn(window.history, "back").mockImplementation(() => {});

    render(<BotonVolver />);
    const boton = screen.getByRole("button", { name: /volver/i });
    await user.click(boton);

    expect(backSpy).toHaveBeenCalled();
    backSpy.mockRestore();
  });
});