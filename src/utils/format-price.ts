/**
 * Formata um número como preço em kwanzas.
 * @param value - O valor numérico a ser formatado.
 * @returns O valor formatado como string no formato "120.000,00 Kz".
 */
export function formatPriceToKwanza(value: number): string {
  return (
    value
      .toFixed(2) // Garante duas casas decimais
      .replace(".", ",") // Substitui o ponto decimal por vírgula
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + // Adiciona pontos como separadores de milhares
    " Kz"
  ); // Adiciona a unidade de moeda
}
