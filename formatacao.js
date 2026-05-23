// =============================================
//  JS/formatacao.js
//  Funções de formatação de valores e datas
// =============================================

export function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarMoedaUSD(valor) {
  return valor.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function formatarMes(mesStr) {
  // Converte "2025-01" → "Jan 2025"
  const [ano, mes] = mesStr.split("-");
  const nomes = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return `${nomes[parseInt(mes) - 1]} ${ano}`;
}

export function mesAtual() {
  // Retorna o mês atual no formato "YYYY-MM"
  const hoje = new Date();
  const ano  = hoje.getFullYear();
  const mes  = String(hoje.getMonth() + 1).padStart(2, "0");
  return `${ano}-${mes}`;
}
