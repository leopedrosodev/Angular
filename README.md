Frontend - Interface Angular

📋 Visão Geral

Este é o frontend do sistema de gerenciamento de produtos, desenvolvido com Angular. Fornece uma interface moderna e responsiva para interagir com a API REST.

🏗️ Arquitetura

Estrutura de Componentes

Plain Text


src/app/
├── app.ts                     # Componente principal
├── app.config.ts             # Configurações da aplicação
├── app.routes.ts             # Roteamento
├── components/
│   ├── produto-lista/        # Listagem de produtos
│   │   ├── produto-lista.ts
│   │   ├── produto-lista.html
│   │   └── produto-lista.css
│   └── produto-form/         # Formulário de produtos
│       ├── produto-form.ts
│       ├── produto-form.html
│       └── produto-form.css
├── services/
│   └── produto.ts            # Serviço HTTP
└── models/
    └── produto.model.ts      # Interface TypeScript


🔧 Tecnologias

•
Angular 18

•
TypeScript

•
RxJS

•
CSS3

•
Node.js & npm

🚀 Como Executar

Pré-requisitos

•
Node.js 18+

•
npm 9+

Comandos

Bash


# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start

# Ou usar Angular CLI diretamente
ng serve


A aplicação estará disponível em: http://localhost:4200/

