// =============================================
//  JS/main.js
//  Ponto de entrada — conecta todos os módulos
// =============================================

import { descricaoValida, valorValido, tipoValido, categoriaValida, mesValido } from "./validacoes.js";
import { mesAtual }                                                               from "./formatacao.js";
import { lerTransacoes, adicionarTransacao, limparTransacoes }                   from "./storage.js";
import { extrairMeses }                                                           from "./calculadora.js";
import { buscarCotacaoDolar }                                                     from "./cotacaoAPI.js";
import {
  renderizarCotacao,
  renderizarCards,
  renderizarGraficos,
  renderizarHistorico,
  popularSelectMeses,
  popularSelectCategorias,
  atualizarCategoriasFormulario,
  exibirErro,
  limparErro,
  definirCotacao,
} from "./render.js";

// =============================================
//  ESTADO GLOBAL DA APLICAÇÃO
// =============================================

// Filtros ativos no momento
let filtroMes       = "todos";
let filtroCategoria = "todos";
let filtroTipo      = "todos";

// =============================================
//  INICIALIZAÇÃO
// =============================================

async function inicializar() {
  inicializarTema();
  await carregarCotacao();
  atualizarDashboard();
  configurarEventos();
}

// =============================================
//  ATUALIZA TODO O DASHBOARD
//  Chamado sempre que há mudança nos dados ou filtros
// =============================================

function atualizarDashboard() {
  const todasTransacoes = lerTransacoes();

  // Aplica filtros encadeados
  const filtradas = todasTransacoes
    .filter(t => filtroMes       === "todos" || t.mes       === filtroMes)
    .filter(t => filtroCategoria === "todos" || t.categoria === filtroCategoria)
    .filter(t => filtroTipo      === "todos" || t.tipo      === filtroTipo);

  const meses = extrairMeses(todasTransacoes);

  // Atualiza todos os componentes visuais
  popularSelectMeses(meses);
  popularSelectCategorias();
  renderizarCards(filtradas);
  renderizarGraficos(todasTransacoes); // Gráficos usam TODAS as transações
  renderizarHistorico(filtradas, atualizarDashboard);
}

// =============================================
//  COTAÇÃO
// =============================================

async function carregarCotacao() {
  try {
    const cotacao = await buscarCotacaoDolar();
    definirCotacao(cotacao);
    renderizarCotacao(cotacao);
  } catch (erro) {
    console.error("Falha ao buscar cotação:", erro.message);
    renderizarCotacao(null, true);
  }
}

// =============================================
//  LEITURA E VALIDAÇÃO DOS INPUTS DO FORMULÁRIO
// =============================================

function lerInputsFormulario() {
  const descricao = document.getElementById("formDescricao").value.trim();
  const valor     = parseFloat(document.getElementById("formValor").value);
  const tipo      = document.getElementById("formTipo").value;
  const categoria = document.getElementById("formCategoria").value;
  const mes       = document.getElementById("formMes").value;

  if (!descricaoValida(descricao)) {
    exibirErro("Informe uma descrição para a transação.");
    return null;
  }

  if (!valorValido(valor)) {
    exibirErro("Informe um valor válido e maior que zero.");
    return null;
  }

  if (!tipoValido(tipo)) {
    exibirErro("Selecione o tipo: receita ou despesa.");
    return null;
  }

  if (!categoriaValida(categoria)) {
    exibirErro("Selecione uma categoria.");
    return null;
  }

  if (!mesValido(mes)) {
    exibirErro("Selecione um mês válido.");
    return null;
  }

  return { descricao, valor, tipo, categoria, mes };
}

function limparFormulario() {
  document.getElementById("formDescricao").value = "";
  document.getElementById("formValor").value     = "";
  document.getElementById("formMes").value       = mesAtual();
}

// =============================================
//  TOGGLE DE TEMA
// =============================================

function inicializarTema() {
  const btn   = document.getElementById("btnTema");
  const icone = document.getElementById("temaIcone");
  const label = document.getElementById("temaLabel");

  // Recupera tema salvo
  const temaSalvo = localStorage.getItem("dashboard:tema");
  if (temaSalvo === "claro") {
    document.body.classList.add("tema-claro");
    if (icone) icone.textContent = "☀️";
    if (label) label.textContent = "Tema escuro";
  }

  if (!btn) return;

  btn.addEventListener("click", () => {
    const claro = document.body.classList.toggle("tema-claro");
    if (icone) icone.textContent = claro ? "☀️" : "🌙";
    if (label) label.textContent = claro ? "Tema escuro" : "Tema claro";
    localStorage.setItem("dashboard:tema", claro ? "claro" : "escuro");

    // Recria os gráficos para aplicar as novas cores do tema
    setTimeout(() => renderizarGraficos(lerTransacoes()), 100);
  });
}

// =============================================
//  CONFIGURAÇÃO DE TODOS OS EVENTOS
// =============================================

function configurarEventos() {

  // ---- Formulário: tipo → atualiza categorias ----
  document.getElementById("formTipo")?.addEventListener("change", (e) => {
    atualizarCategoriasFormulario(e.target.value);
  });

  // ---- Formulário: adicionar transação ----
  document.getElementById("btnAdicionar")?.addEventListener("click", () => {
    limparErro();

    const inputs = lerInputsFormulario();
    if (!inputs) return;

    adicionarTransacao(inputs);
    atualizarDashboard();
    limparFormulario();
  });

  // ---- Filtro por mês ----
  document.getElementById("filtroMes")?.addEventListener("change", (e) => {
    filtroMes = e.target.value;
    atualizarDashboard();
  });

  // ---- Filtro por categoria ----
  document.getElementById("filtroCategoria")?.addEventListener("change", (e) => {
    filtroCategoria = e.target.value;
    atualizarDashboard();
  });

  // ---- Filtro por tipo ----
  document.querySelectorAll(".btn-filtro-tipo").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-filtro-tipo").forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      filtroTipo = btn.dataset.tipo;
      atualizarDashboard();
    });
  });

  // ---- Resetar dados mockados ----
  document.getElementById("btnResetar")?.addEventListener("click", () => {
    limparTransacoes();
    atualizarDashboard();
  });

  // ---- Define mês atual no input do formulário ----
  const inputMes = document.getElementById("formMes");
  if (inputMes) inputMes.value = mesAtual();

  // ---- Inicializa categorias do formulário ----
  atualizarCategoriasFormulario("receita");
}

// =============================================
//  START
// =============================================

inicializar();
