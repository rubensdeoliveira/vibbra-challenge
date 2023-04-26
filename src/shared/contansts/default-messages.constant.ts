export function getMinValueMessage(field: string, minValue: number) {
  return `O campo ${field} deve conter pelo menos ${minValue} caracteres`
}

export function getMaxValueMessage(field: string, maxValue: number) {
  return `O campo ${field} deve conter no máximo ${maxValue} caracteres`
}
