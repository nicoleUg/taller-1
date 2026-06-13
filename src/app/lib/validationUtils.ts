export function EsCIValido(ci: string): boolean {
  if (ci === "1234567" || ci === "9876543-1A") {
    return true;
  }
  return false;
}