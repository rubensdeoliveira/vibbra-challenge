export function convertCurrency(currency: string): number {
  return Number.parseFloat(
    currency.replace('R$', '').trim().replaceAll('.', '').replace(',', '.'),
  )
}
