💸 Dashboard Financeiro

Uma aplicação web desenvolvida com foco em visualização e gerenciamento financeiro, inspirada em dashboards modernos como Nubank, Inter e plataformas corporativas.

O projeto foi criado como parte do meu portfólio de estudos em desenvolvimento web, com o objetivo de construir uma aplicação mais próxima de um cenário real — combinando gráficos interativos, dados dinâmicos, filtros inteligentes e uma interface intuitiva.

🚀 Tecnologias utilizadas
<div align="left">
JavaScript ES6+
HTML5 Semântico
CSS3
Chart.js
localStorage
API REST
</div>
✨ Funcionalidades

✅ Dashboard com indicadores financeiros em tempo real
✅ Cards de resumo com receitas, despesas e saldo
✅ Gráfico de evolução mensal (receitas vs despesas)
✅ Gráfico de categorias com distribuição percentual
✅ Histórico completo de transações
✅ Cadastro e remoção de transações
✅ Filtros encadeados por mês, categoria e tipo
✅ Integração com cotação USD/BRL em tempo real
✅ Tema claro e escuro com persistência
✅ Persistência de dados utilizando localStorage
✅ Interface responsiva e moderna
✅ Validação completa dos formulários

🧠 Sobre o projeto

A proposta do projeto foi ir além de um CRUD tradicional, criando um painel financeiro mais completo e visualmente profissional.

O sistema foi inspirado em interfaces modernas do setor financeiro, utilizando:

sidebar escura
cards informativos
hierarquia visual clara
gráficos dinâmicos
experiência focada em usabilidade

Toda a aplicação foi construída utilizando JavaScript modularizado, separando responsabilidades entre lógica de negócio, renderização, armazenamento e consumo de API.

📊 Funcionalidades visuais
📈 Evolução mensal

Gráfico de barras comparando:

receitas
despesas
saldo mensal
🍩 Distribuição por categorias

Gráfico de rosca exibindo:

percentual de gastos
categorias mais utilizadas
📋 Histórico de transações

Tabela completa contendo:

descrição
categoria
tipo
data
valor

Com destaque visual através de badges e cores.

🌐 API utilizada
AwesomeAPI — Cotação USD/BRL em tempo real
https://economia.awesomeapi.com.br/json/last/USD-BRL

✅ Gratuita
✅ Sem necessidade de autenticação
✅ Atualização em tempo real

O sistema possui tratamento de erros de rede, garantindo funcionamento mesmo caso a API fique indisponível.

🗂 Estrutura do projeto
dashboard-financeiro/
│
├── arquivo-html/
│   └── index.html
│
├── arquivo-css/
│   └── style.css
│
└── JS/
    ├── main.js
    ├── dados.js
    ├── validacoes.js
    ├── formatacao.js
    ├── storage.js
    ├── calculadora.js
    ├── graficos.js
    ├── cotacaoAPI.js
    └── render.js
🧩 Arquitetura modular

O projeto foi estruturado seguindo separação de responsabilidades, deixando cada módulo responsável por uma única função da aplicação.

Módulo	Responsabilidade
dados.js	Dados mockados e categorias
validacoes.js	Validação dos formulários
formatacao.js	Formatação de valores e datas
storage.js	CRUD via localStorage
calculadora.js	Regras de negócio e cálculos
graficos.js	Renderização dos gráficos
cotacaoAPI.js	Consumo da AwesomeAPI
render.js	Manipulação do DOM
main.js	Inicialização e orquestração
📐 Lógica de cálculo
Totais financeiros
receitas = soma de todas as receitas
despesas = soma de todas as despesas
saldo = receitas - despesas
Evolução mensal

As transações são:

agrupadas por mês
organizadas cronologicamente
separadas entre receitas e despesas

Os dados alimentam automaticamente o gráfico principal.

Distribuição por categoria

O sistema:

filtra apenas despesas
agrupa por categoria
calcula percentual de participação

Os resultados são exibidos dinamicamente no gráfico de rosca.

🎨 Design e experiência

O visual da aplicação foi inspirado em dashboards financeiros modernos, utilizando:

✅ Sidebar escura em tons de roxo
✅ Cards coloridos por categoria financeira
✅ Interface limpa e intuitiva
✅ Temas claro e escuro
✅ Responsividade para telas menores
✅ Gráficos adaptados ao tema ativo

▶️ Como executar o projeto

Como o projeto utiliza módulos ES6 (import/export), ele precisa ser executado em um servidor HTTP.

Passo a passo
# Clone o repositório
git clone https://github.com/seu-usuario/dashboard-financeiro.git

# Abra a pasta no VS Code

# Execute com Live Server

Ou:

Abra a pasta raiz do projeto no VS Code
Clique com botão direito em arquivo-html/index.html
Selecione "Open with Live Server"
💡 Objetivo do projeto

Este projeto foi desenvolvido com foco em prática de:

Manipulação de DOM
Programação modular
JavaScript moderno (ES6+)
CRUD com localStorage
Consumo de APIs REST
Estruturação de dashboards
Gráficos interativos
Responsividade
Organização de aplicações front-end
📦 Tecnologias e conceitos aplicados
JavaScript ES6+ (modules, async/await, destructuring)
HTML5 semântico
CSS3 (grid, flexbox, variáveis CSS)
Chart.js 4.4
localStorage
Consumo de API REST
👨‍💻 Autor

Desenvolvido por Gabriel Gouveia
Transformando aprendizado em aplicações reais 🚀
