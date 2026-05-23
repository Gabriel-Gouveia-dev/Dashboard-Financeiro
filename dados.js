// =============================================
//  JS/dados.js
//  Dados mockados iniciais do dashboard
//  Carregados apenas se o localStorage estiver vazio
// =============================================

// Categorias disponíveis para transações
export const categorias = {
  receita: ["Salário", "Freelance", "Investimentos", "Outros"],
  despesa: ["Alimentação", "Moradia", "Transporte", "Saúde", "Educação", "Lazer", "Outros"],
};

// Transações iniciais para demonstração
export const transacoesMock = [
  { id: 1,  descricao: "Salário",         valor: 4500,  tipo: "receita", categoria: "Salário",       mes: "2025-01" },
  { id: 2,  descricao: "Freelance web",   valor: 1200,  tipo: "receita", categoria: "Freelance",     mes: "2025-01" },
  { id: 3,  descricao: "Aluguel",         valor: 1400,  tipo: "despesa", categoria: "Moradia",       mes: "2025-01" },
  { id: 4,  descricao: "Supermercado",    valor: 650,   tipo: "despesa", categoria: "Alimentação",   mes: "2025-01" },
  { id: 5,  descricao: "Transporte",      valor: 280,   tipo: "despesa", categoria: "Transporte",    mes: "2025-01" },
  { id: 6,  descricao: "Academia",        valor: 120,   tipo: "despesa", categoria: "Saúde",         mes: "2025-01" },
  { id: 7,  descricao: "Salário",         valor: 4500,  tipo: "receita", categoria: "Salário",       mes: "2025-02" },
  { id: 8,  descricao: "Rendimento CDB",  valor: 380,   tipo: "receita", categoria: "Investimentos", mes: "2025-02" },
  { id: 9,  descricao: "Aluguel",         valor: 1400,  tipo: "despesa", categoria: "Moradia",       mes: "2025-02" },
  { id: 10, descricao: "Supermercado",    valor: 720,   tipo: "despesa", categoria: "Alimentação",   mes: "2025-02" },
  { id: 11, descricao: "Curso online",    valor: 197,   tipo: "despesa", categoria: "Educação",      mes: "2025-02" },
  { id: 12, descricao: "Cinema",          valor: 80,    tipo: "despesa", categoria: "Lazer",         mes: "2025-02" },
  { id: 13, descricao: "Salário",         valor: 4500,  tipo: "receita", categoria: "Salário",       mes: "2025-03" },
  { id: 14, descricao: "Freelance app",   valor: 2100,  tipo: "receita", categoria: "Freelance",     mes: "2025-03" },
  { id: 15, descricao: "Aluguel",         valor: 1400,  tipo: "despesa", categoria: "Moradia",       mes: "2025-03" },
  { id: 16, descricao: "Supermercado",    valor: 580,   tipo: "despesa", categoria: "Alimentação",   mes: "2025-03" },
  { id: 17, descricao: "Restaurante",     valor: 240,   tipo: "despesa", categoria: "Alimentação",   mes: "2025-03" },
  { id: 18, descricao: "Médico",          valor: 350,   tipo: "despesa", categoria: "Saúde",         mes: "2025-03" },
  { id: 19, descricao: "Salário",         valor: 4800,  tipo: "receita", categoria: "Salário",       mes: "2025-04" },
  { id: 20, descricao: "Aluguel",         valor: 1400,  tipo: "despesa", categoria: "Moradia",       mes: "2025-04" },
  { id: 21, descricao: "Supermercado",    valor: 690,   tipo: "despesa", categoria: "Alimentação",   mes: "2025-04" },
  { id: 22, descricao: "Transporte",      valor: 310,   tipo: "despesa", categoria: "Transporte",    mes: "2025-04" },
  { id: 23, descricao: "Netflix",         valor: 45,    tipo: "despesa", categoria: "Lazer",         mes: "2025-04" },
  { id: 24, descricao: "Salário",         valor: 4800,  tipo: "receita", categoria: "Salário",       mes: "2025-05" },
  { id: 25, descricao: "Rendimento CDB",  valor: 420,   tipo: "receita", categoria: "Investimentos", mes: "2025-05" },
  { id: 26, descricao: "Aluguel",         valor: 1400,  tipo: "despesa", categoria: "Moradia",       mes: "2025-05" },
  { id: 27, descricao: "Supermercado",    valor: 760,   tipo: "despesa", categoria: "Alimentação",   mes: "2025-05" },
  { id: 28, descricao: "Viagem",          valor: 1800,  tipo: "despesa", categoria: "Lazer",         mes: "2025-05" },
];
