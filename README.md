# DUOCARE Mobile

Primeira entrega navegável do aplicativo materno-infantil DUOCARE, construída com React Native, Expo Router e TypeScript. A implementação segue os documentos em `../design` e usa somente dados demonstrativos, sem diagnóstico ou orientação clínica.

## Requisitos

- Node.js LTS
- npm
- Expo Go, simulador Android/iOS ou navegador para validação visual

## Executar

```bash
npm install
npx expo start
```

Atalhos úteis:

```bash
npm run android
npm run ios
npm run web
npm run lint
npm run typecheck
npx expo-doctor
```

## Telas desta entrega

- M01 — Splash (`/`)
- M02 — Login (`/login`)
- M05–M07 — Onboarding (`/welcome`)
- M08 — Cadastro (`/register`)
- M03 — Home da Mãe (`/home`)
- M04 — Meu Bebê (`/baby`)
- M18 — Minha Saúde / Wearables (`/health`)

Conteúdos, alertas e perfil também possuem rotas navegáveis básicas. Fluxos futuros usam estados neutros e placeholders.

## Estrutura

- `src/app`: rotas e layouts do Expo Router
- `src/components`: UI reutilizável, navegação, cards, bebê e saúde
- `src/constants`: tokens de cor, tipografia, espaçamento, radius e layout
- `src/contexts`: estado demonstrativo compartilhado
- `src/hooks`: responsividade e preferência de movimento reduzido
- `src/mocks`: dados locais neutros
- `src/services` e `src/repositories`: limites preparados para integrações futuras
- `assets/illustrations`: imagens aprovadas para o protótipo

## Responsividade

- Celulares: conteúdo com largura máxima de 430 px e bottom navigation.
- Telas abaixo de 375 px: grids passam de três para duas colunas.
- Tablets a partir de 768 px: dashboards em duas colunas e navigation rail lateral.
- Formulários de autenticação permanecem limitados a 520 px.

## Limites atuais

- Sem backend, autenticação real, banco de dados ou persistência.
- Sem integração real com wearables, permissões ou sensores.
- Métricas e perfis são fictícios e identificados como demonstrativos.
- Conteúdo clínico continua sujeito à validação dos fisioterapeutas.
- As ilustrações são usadas como arquivos locais para manter a execução offline.
