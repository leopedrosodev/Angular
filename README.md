Frontend - Pesquisa de Carros por Placa

Visao Geral

Aplicacao Angular demonstrativa para pesquisa de carros por placa. O objetivo e apresentar fundamentos do framework, RxJS e boas praticas em uma interface funcional, ideal para entrevistas.

Arquitetura

src/app/
├── app.ts
├── app.config.ts
├── app.routes.ts
├── components/
│   ├── placa-busca/          # Fluxo principal (Reactive Forms + RxJS)
│   ├── resultado-card/       # Card do resultado (ngOnChanges)
│   └── sobre/                # Referencias usadas
├── legacy/                   # Exemplo com NgModule + Lazy Loading
├── models/
│   └── carro.model.ts
├── pipes/                    # Pipes puros e impuros
├── services/
│   └── carro.service.ts      # Regras de negocio e historico
└── utils/
    └── placa.ts

Fundamentos Demonstrados

- Angular moderno com componentes standalone
- NgModule legado com Lazy Loading
- RxJS com switchMap, mergeMap, concatMap e exhaustMap
- Async Pipe para subscribe/unsubscribe automatico
- Pipes puros e impuros
- Template-driven Forms e Reactive Forms
- Change Detection com OnPush
- Testes unitarios com Jasmine + Karma

Como Executar

npm install
npm start

A aplicacao estara em http://localhost:4200/
