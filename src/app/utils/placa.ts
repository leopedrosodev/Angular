export const PLACA_MERCOSUL_REGEX = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
export const PLACA_ANTIGA_REGEX = /^[A-Z]{3}[0-9]{4}$/;

export function normalizarPlaca(valor: string): string {
  return (valor || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function isPlacaValida(valor: string): boolean {
  const placa = normalizarPlaca(valor);
  return PLACA_MERCOSUL_REGEX.test(placa) || PLACA_ANTIGA_REGEX.test(placa);
}

export function formatarPlaca(valor: string): string {
  const placa = normalizarPlaca(valor);
  if (placa.length !== 7) {
    return placa;
  }

  return `${placa.slice(0, 3)}-${placa.slice(3)}`;
}
