import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "./LoginPage";

vi.mock("../components/Login", () => ({
  Login: () => <div data-testid="login-component">Login Component Mock</div>,
}));

describe("Página LoginPage", () => {
  it("renderiza el componente de Login correctamente", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("login-component")).toBeInTheDocument();
  });
});