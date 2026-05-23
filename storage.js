// =============================================
//  JS/storage.js
//  CRUD completo de transações via localStorage
// =============================================

import { transacoesMock } from "./dados.js";

const CHAVE = "dashboard:transacoes";

// ---- READ ----

/**
 * Lê todas as transações do localStorage.
 * Na primeira execução, carrega os dados mockados.
 * @returns {Array}
 */
export function lerTransacoes() {
  try {
    const dados = localStorage.getItem(CHAVE);

    // Se não existir nada ainda, carrega os dados mockados
    if (!dados) {
      localStorage.setItem(CHAVE, JSON.stringify(transacoesMock));
      return transacoesMock;
    }

    return JSON.parse(dados);
  } catch {
    console.error("Erro ao ler transações do localStorage.");
    return [];
  }
}

// ---- CREATE ----

/**
 * Adiciona uma nova transação ao localStorage.
 * @param {{ descricao, valor, tipo, categoria, mes }} transacao
 * @returns {Object} A transação criada com id gerado
 */
export function adicionarTransacao(transacao) {
  try {
    const transacoes = lerTransacoes();

    const novaTransacao = {
      id:        Date.now(),
      descricao: transacao.descricao,
      valor:     transacao.valor,
      tipo:      transacao.tipo,
      categoria: transacao.categoria,
      mes:       transacao.mes,
    };

    transacoes.push(novaTransacao);
    localStorage.setItem(CHAVE, JSON.stringify(transacoes));
    return novaTransacao;
  } catch {
    console.error("Erro ao adicionar transação.");
    return null;
  }
}

// ---- DELETE ----

/**
 * Remove uma transação pelo id.
 * @param {number} id
 */
export function removerTransacao(id) {
  try {
    const transacoes  = lerTransacoes();
    const atualizadas = transacoes.filter(t => t.id !== id);
    localStorage.setItem(CHAVE, JSON.stringify(atualizadas));
  } catch {
    console.error("Erro ao remover transação.");
  }
}

// ---- DELETE ALL ----

/**
 * Apaga todas as transações do localStorage.
 */
export function limparTransacoes() {
  try {
    localStorage.removeItem(CHAVE);
  } catch {
    console.error("Erro ao limpar transações.");
  }
}
