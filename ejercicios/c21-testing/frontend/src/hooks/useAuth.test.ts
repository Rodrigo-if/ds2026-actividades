import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useAuth } from "./useAuth";
import { AuthProvider } from "../context/AuthContext";
import { createElement, type ReactNode } from "react";

describe("useAuth Hook", () => {
  it("lanza un error si se usa fuera de un AuthProvider", () => {
    const consoleErrorSpy = console.error;
    console.error = () => {};

    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth debe usarse dentro de un AuthProvider");

    console.error = consoleErrorSpy;
  });

  it("retorna el contexto correctamente cuando se usa dentro de AuthProvider", () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
      return createElement(AuthProvider, null, children);
    };

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toHaveProperty("estaAutenticado");
    expect(result.current).toHaveProperty("login");
    expect(result.current).toHaveProperty("logout");
    expect(result.current).toHaveProperty("tieneRol");
  });
});