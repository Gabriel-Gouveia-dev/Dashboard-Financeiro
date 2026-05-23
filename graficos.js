// =============================================
//  JS/graficos.js
//  Renderização dos gráficos com Chart.js
//  Chart.js é carregado via CDN no HTML
// =============================================

import { formatarMes, formatarMoeda } from "./formatacao.js";

// Referências às instâncias dos gráficos (para destruir antes de recriar)
let graficoEvolucao   = null;
let graficoCategorias = null;

// Paleta de cores para o gráfico de categorias
const CORES_CATEGORIAS = [
  "#10b981", "#3b82f6", "#f59e0b", "#ef4444",
  "#8b5cf6", "#06b6d4", "#f97316", "#ec4899",
];

/**
 * Renderiza o gráfico de barras com evolução mensal.
 * @param {Array<{ mes, receitas, despesas, saldo }>} dados
 */
export function renderizarGraficoEvolucao(dados) {
  const canvas = document.getElementById("graficoEvolucao");
  if (!canvas) return;

  // Destrói instância anterior para evitar sobreposição
  if (graficoEvolucao) {
    graficoEvolucao.destroy();
    graficoEvolucao = null;
  }

  const labels   = dados.map(d => formatarMes(d.mes));
  const receitas = dados.map(d => d.receitas);
  const despesas = dados.map(d => d.despesas);

  graficoEvolucao = new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label:           "Receitas",
          data:            receitas,
          backgroundColor: "rgba(16, 185, 129, 0.75)",
          borderColor:     "#10b981",
          borderWidth:     1,
          borderRadius:    4,
        },
        {
          label:           "Despesas",
          data:            despesas,
          backgroundColor: "rgba(239, 68, 68, 0.75)",
          borderColor:     "#ef4444",
          borderWidth:     1,
          borderRadius:    4,
        },
      ],
    },
    options: {
      responsive:          true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color:    obterCorTexto(),
            font:     { size: 12 },
            boxWidth: 12,
          },
        },
        tooltip: {
          callbacks: {
            // Formata os valores do tooltip como moeda brasileira
            label: ctx => ` ${formatarMoeda(ctx.raw)}`,
          },
        },
      },
      scales: {
        x: {
          ticks: { color: obterCorTextoSecundario() },
          grid:  { color: obterCorGrade() },
        },
        y: {
          ticks: {
            color:    obterCorTextoSecundario(),
            callback: val => formatarMoeda(val),
          },
          grid: { color: obterCorGrade() },
        },
      },
    },
  });
}

/**
 * Renderiza o gráfico de rosca com despesas por categoria.
 * @param {Array<{ categoria, valor, percentual }>} dados
 */
export function renderizarGraficoCategorias(dados) {
  const canvas = document.getElementById("graficoCategorias");
  if (!canvas) return;

  // Destrói instância anterior para evitar sobreposição
  if (graficoCategorias) {
    graficoCategorias.destroy();
    graficoCategorias = null;
  }

  const labels = dados.map(d => d.categoria);
  const values = dados.map(d => d.valor);
  const cores  = dados.map((_, i) => CORES_CATEGORIAS[i % CORES_CATEGORIAS.length]);

  graficoCategorias = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data:            values,
        backgroundColor: cores.map(c => c + "cc"),
        borderColor:     cores,
        borderWidth:     1.5,
        hoverOffset:     6,
      }],
    },
    options: {
      responsive:          true,
      maintainAspectRatio: false,
      cutout:              "65%",
      plugins: {
        legend: {
          position: "right",
          labels: {
            color:     obterCorTexto(),
            font:      { size: 11 },
            boxWidth:  10,
            padding:   12,
          },
        },
        tooltip: {
          callbacks: {
            label: ctx => ` ${formatarMoeda(ctx.raw)} (${ctx.parsed.toFixed(1)}%)`,
          },
        },
      },
    },
  });
}

// =============================================
//  UTILITÁRIOS — lê as variáveis CSS do tema ativo
// =============================================

function obterCorTexto() {
  return getComputedStyle(document.documentElement)
    .getPropertyValue("--cor-texto-primario").trim() || "#f8fafc";
}

function obterCorTextoSecundario() {
  return getComputedStyle(document.documentElement)
    .getPropertyValue("--cor-texto-secundario").trim() || "#94a3b8";
}

function obterCorGrade() {
  return getComputedStyle(document.documentElement)
    .getPropertyValue("--cor-grade").trim() || "rgba(255,255,255,0.07)";
}
