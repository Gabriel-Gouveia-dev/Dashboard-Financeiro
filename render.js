// =============================================
//  JS/render.js
//  Todas as funções de manipulação do DOM
// =============================================

import { formatarMoeda, formatarMoedaUSD, formatarMes } from "./formatacao.js";
import { calcularTotais, calcularEvolucaoMensal, calcularPorCategoria } from "./calculadora.js";
import { renderizarGraficoEvolucao, renderizarGraficoCategorias }       from "./graficos.js";
import { removerTransacao }                                               from "./storage.js";
import { categorias }                                                     from "./dados.js";

// Cotação guardada para conversão USD
let cotacaoAtual = null;

export function definirCotacao(valor) {
  cotacaoAtual = valor;
}

// =============================================
//  COTAÇÃO NO HEADER
// =============================================

export function renderizarCotacao(cotacao, erro = false) {
  const el = document.getElementById("cotacaoValor");
  if (!el) return;

  if (erro) {
    el.textContent    = "indisponível";
    el.style.color    = "var(--cor-erro)";
    return;
  }

  cotacaoAtual   = cotacao;
  el.textContent = `R$ ${cotacao.toFixed(4)}`;
}

// =============================================
//  CARDS DE RESUMO
// =============================================

/**
 * Atualiza os três cards de resumo: receitas, despesas e saldo.
 * @param {Array} transacoes — filtradas pelo mês/categoria selecionado
 */
export function renderizarCards(transacoes) {
  const { totalReceitas, totalDespesas, saldo } = calcularTotais(transacoes);

  document.getElementById("cardReceitas").textContent = formatarMoeda(totalReceitas);
  document.getElementById("cardDespesas").textContent = formatarMoeda(totalDespesas);
  document.getElementById("cardSaldo").textContent    = formatarMoeda(saldo);

  // Converte saldo para USD se cotação disponível
  const saldoUSD = document.getElementById("cardSaldoUSD");
  if (saldoUSD) {
    saldoUSD.textContent = cotacaoAtual
      ? formatarMoedaUSD(saldo / cotacaoAtual)
      : "—";
  }

  // Aplica cor ao saldo conforme positivo/negativo
  const cardSaldoEl = document.getElementById("cardSaldo");
  if (cardSaldoEl) {
    cardSaldoEl.className = saldo >= 0
      ? "card-valor positivo"
      : "card-valor negativo";
  }
}

// =============================================
//  GRÁFICOS
// =============================================

/**
 * Renderiza os dois gráficos com base em todas as transações.
 * @param {Array} todasTransacoes
 */
export function renderizarGraficos(todasTransacoes) {
  const evolucao   = calcularEvolucaoMensal(todasTransacoes);
  const categorias = calcularPorCategoria(todasTransacoes);

  renderizarGraficoEvolucao(evolucao);
  renderizarGraficoCategorias(categorias);
}

// =============================================
//  HISTÓRICO DE TRANSAÇÕES
// =============================================

/**
 * Renderiza a tabela de histórico de transações.
 * @param {Array} transacoes — já filtradas
 * @param {Function} onRemover — callback chamado após remoção
 */
export function renderizarHistorico(transacoes, onRemover) {
  const tbody = document.getElementById("historicoBody");
  const vazio = document.getElementById("historicoVazio");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (transacoes.length === 0) {
    if (vazio) vazio.hidden = false;
    return;
  }

  if (vazio) vazio.hidden = true;

  // Ordena do mais recente para o mais antigo
  const ordenadas = [...transacoes].sort((a, b) => b.id - a.id);

  ordenadas.forEach(t => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="td-descricao">${t.descricao}</td>
      <td><span class="badge-categoria">${t.categoria}</span></td>
      <td><span class="badge-tipo badge-${t.tipo}">${t.tipo}</span></td>
      <td class="td-mes">${formatarMes(t.mes)}</td>
      <td class="td-valor ${t.tipo}">
        ${t.tipo === "receita" ? "+" : "−"} ${formatarMoeda(t.valor)}
      </td>
      <td>
        <button class="btn-remover-transacao" data-id="${t.id}" aria-label="Remover transação">✕</button>
      </td>
    `;

    // Remove a transação ao clicar no botão
    tr.querySelector(".btn-remover-transacao").addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      removerTransacao(id);
      onRemover();
    });

    tbody.appendChild(tr);
  });
}

// =============================================
//  FILTROS
// =============================================

/**
 * Popula o select de meses com base nas transações existentes.
 * @param {Array<string>} meses — lista de meses no formato "YYYY-MM"
 */
export function popularSelectMeses(meses) {
  const select = document.getElementById("filtroMes");
  if (!select) return;

  // Mantém apenas a opção "Todos"
  select.innerHTML = `<option value="todos">Todos os meses</option>`;

  meses.forEach(mes => {
    const option   = document.createElement("option");
    option.value   = mes;
    option.textContent = formatarMes(mes);
    select.appendChild(option);
  });
}

/**
 * Popula o select de categorias.
 */
export function popularSelectCategorias() {
  const select = document.getElementById("filtroCategoria");
  if (!select) return;

  select.innerHTML = `<option value="todos">Todas as categorias</option>`;

  const todasCats = [
    ...new Set([...categorias.receita, ...categorias.despesa])
  ].sort();

  todasCats.forEach(cat => {
    const option       = document.createElement("option");
    option.value       = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

// =============================================
//  FORMULÁRIO — SELECT DE CATEGORIAS DINÂMICO
// =============================================

/**
 * Atualiza as categorias do formulário conforme o tipo selecionado.
 * @param {string} tipo — "receita" ou "despesa"
 */
export function atualizarCategoriasFormulario(tipo) {
  const select = document.getElementById("formCategoria");
  if (!select) return;

  select.innerHTML = `<option value="">Selecione...</option>`;

  const lista = categorias[tipo] || [];
  lista.forEach(cat => {
    const option       = document.createElement("option");
    option.value       = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

// =============================================
//  ERROS
// =============================================

export function exibirErro(mensagem) {
  const el = document.getElementById("erroMsg");
  if (el) el.textContent = mensagem;
}

export function limparErro() {
  const el = document.getElementById("erroMsg");
  if (el) el.textContent = "";
}
