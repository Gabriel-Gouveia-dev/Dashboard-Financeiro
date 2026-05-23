// =============================================
//  JS/validacoes.js
//  Funções de validação dos inputs do usuário
// =============================================

export function descricaoValida(descricao) {
  return typeof descricao === "string" && descricao.trim() !== "";
}

export function valorValido(valor) {
  return typeof valor === "number" && Number.isFinite(valor) && valor > 0;
}

export function tipoValido(tipo) {
  return tipo === "receita" || tipo === "despesa";
}

export function categoriaValida(categoria) {
  return typeof categoria === "string" && categoria.trim() !== "";
}

export function mesValido(mes) {
  // Formato esperado: "YYYY-MM"
  return typeof mes === "string" && /^\d{4}-\d{2}$/.test(mes);
}
