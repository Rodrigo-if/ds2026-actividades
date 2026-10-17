const TOKEN_KEY = "token_libreria";

export function guardarToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function obtenerToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function borrarToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}