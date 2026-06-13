export function EsCIValido(ci: string): boolean {
  if (!ci) return false;
  const ciRegex = /^\d{6,8}(-[A-Za-z0-9]{1,2})?$/;
  return ciRegex.test(ci.trim());
}