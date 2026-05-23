// =============================================
//  JS/calculadora.js
//  Lógica de cálculo dos totais do dashboard
// =============================================

/**
 * Calcula totais de receitas, despesas e saldo para um conjunto de transações.
 * @param {Array} transacoes
 * @returns {{ totalReceitas: number, totalDespesas: number, saldo: number }}
 */
export function calcularTotais(transacoes) {
  const totalReceitas = transacoes
    .filter(t => t.tipo === "receita")
    .reduce((acc, t) => acc + t.valor, 0);

  const totalDespesas = transacoes
    .filter(t => t.tipo === "despesa")
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  return { totalReceitas, totalDespesas, saldo };
}

/**
 * Agrupa transações por mês e calcula os totais de cada mês.
 * Retorna os dados ordenados cronologicamente para uso no gráfico.
 * @param {Array} transacoes
 * @returns {Array<{ mes: string, receitas: number, despesas: number, saldo: number }>}
 */
export function calcularEvolucaoMensal(transacoes) {
  const mapa = {};

  transacoes.forEach(t => {
    if (!mapa[t.mes]) {
      mapa[t.mes] = { mes: t.mes, receitas: 0, despesas: 0 };
    }

    if (t.tipo === "receita") mapa[t.mes].receitas += t.valor;
    if (t.tipo === "despesa") mapa[t.mes].despesas += t.valor;
  });

  // Ordena por mês cronologicamente e calcula saldo
  return Object.values(mapa)
    .sort((a, b) => a.mes.localeCompare(b.mes))
    .map(m => ({ ...m, saldo: m.receitas - m.despesas }));
}

/**
 * Agrupa despesas por categoria e retorna percentual de cada uma.
 * Usado para o gráfico de pizza/categorias.
 * @param {Array} transacoes
 * @returns {Array<{ categoria: string, valor: number, percentual: number }>}
 */
export function calcularPorCategoria(transacoes) {
  const despesas = transacoes.filter(t => t.tipo === "despesa");
  const total    = despesas.reduce((acc, t) => acc + t.valor, 0);
  const mapa     = {};

  despesas.forEach(t => {
    mapa[t.categoria] = (mapa[t.categoria] || 0) + t.valor;
  });

  return Object.entries(mapa)
    .map(([categoria, valor]) => ({
      categoria,
      valor,
      percentual: total > 0 ? (valor / total) * 100 : 0,
    }))
    .sort((a, b) => b.valor - a.valor);
}

/**
 * Retorna a lista de meses únicos presentes nas transações, ordenados.
 * @param {Array} transacoes
 * @returns {Array<string>}
 */
export function extrairMeses(transacoes) {
  const meses = [...new Set(transacoes.map(t => t.mes))];
  return meses.sort();
}
