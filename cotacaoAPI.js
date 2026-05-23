// =============================================
//  JS/cotacaoAPI.js
//  Consumo da AwesomeAPI para cotação USD/BRL
//  Endpoint gratuito, sem necessidade de chave
// =============================================

const URL_API = "https://economia.awesomeapi.com.br/json/last/USD-BRL";

/**
 * Busca a cotação atual do dólar em relação ao real.
 * @returns {Promise<number>} Valor do dólar em BRL
 * @throws {Error} Se a requisição ou o dado retornado forem inválidos
 */
export async function buscarCotacaoDolar() {
  const resposta = await fetch(URL_API);

  if (!resposta.ok) {
    throw new Error(`Erro na API: ${resposta.status} — ${resposta.statusText}`);
  }

  const dados   = await resposta.json();
  const cotacao = parseFloat(dados.USDBRL.bid);

  if (!Number.isFinite(cotacao)) {
    throw new Error("Cotação retornada pela API é inválida.");
  }

  return cotacao;
}
