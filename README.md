# DUOCARE Mobile

Aplicativo materno-infantil construído com React Native, Expo Router e TypeScript. A interface segue os documentos em `../design`; dados clínicos e integrações com wearables continuam fora desta fase.

## Requisitos

- Node.js LTS
- npm
- Expo Go, simulador Android/iOS ou navegador

## Executar

```bash
npm install
cp .env.example .env.local
npx expo start
```

No PowerShell, a cópia pode ser feita com:

```powershell
Copy-Item .env.example .env.local
```

Comandos de qualidade:

```bash
npm run lint
npm run typecheck
npx expo-doctor
```

## Configuração de dados

As variáveis públicas são lidas por `src/constants/env.ts`.

```dotenv
EXPO_PUBLIC_ENABLE_MOCKS=true
EXPO_PUBLIC_API_URL=
```

### Modo mock

Use `EXPO_PUBLIC_ENABLE_MOCKS=true`. Este é o padrão quando a variável não é informada. As telas consomem as mesmas interfaces de repository usadas no modo real; somente a implementação selecionada muda.

O login mock aceita um e-mail válido e uma senha com pelo menos quatro caracteres. A senha nunca é persistida.

### Modo real

Use:

```dotenv
EXPO_PUBLIC_ENABLE_MOCKS=false
EXPO_PUBLIC_API_URL=https://api.exemplo.invalid
```

Substitua a URL de exemplo pelo endereço do backend. No modo real, a ausência ou invalidade de `EXPO_PUBLIC_API_URL` gera um erro de configuração antes da primeira requisição.

As rotas HTTP atualmente preparadas são:

- `POST /auth/login`, `POST /auth/refresh` e `POST /auth/logout`;
- `GET/PUT /mother/profile`;
- `GET/PUT /baby/profile`;
- `GET /contents` e `GET /contents/:id`;
- `GET /alerts`, `GET /alerts/:id` e `PATCH /alerts/:id/read`.

Os caminhos e payloads precisam ser reconciliados com o contrato definitivo do backend antes de habilitar o modo real em produção.

## Arquitetura de dados

- `src/services`: cliente HTTP e chamadas aos endpoints.
- `src/repositories`: contratos independentes da fonte e implementações mock/HTTP.
- `src/contexts/AuthContext.tsx`: autenticação, sessão, restauração, login e logout.
- `src/contexts/DataContext.tsx`: dados compartilhados da mãe, bebê, conteúdos e alertas.
- `src/hooks`: consultas e mutações isoladas por domínio, sem ampliar o `DataContext`.
- `src/storage/sessionStorage.ts`: persistência mínima da sessão.
- `src/types`: tipos de domínio usados por UI, contexts e repositories.
- `src/mocks`: fontes demonstrativas legadas acessadas exclusivamente por implementações de MockRepository.

As telas não executam `fetch`. A seleção entre mock e HTTP ocorre em `src/repositories/index.ts`.

O fluxo esperado em toda a aplicação é:

```text
Tela → Context ou hook de domínio → Repository → implementação mock ou HTTP
```

### Repositories disponíveis

- Com services HTTP já preparados: autenticação, mãe, bebê, conteúdos e alertas.
- Com contratos mock/HTTP e contrato HTTP ainda pendente: desenvolvimento, crescimento, puerpério, exercícios, bem-estar, preferências, dispositivos, detalhes de saúde, feedback e suporte.

Amamentação reutiliza `ContentRepository` por ser uma categoria editorial, evitando um repository duplicado. Marcos reutilizam `DevelopmentRepository`.

Os hooks `useBabyDevelopment`, `useGrowth`, `usePostpartum`, `useExercises`, `useWellbeing`, `usePreferences`, `useDevices`, `useHealthDetails`, `useFeedback` e `useSupport` encapsulam o acesso aos repositories. Nenhuma tela ou componente visual importa `src/mocks` diretamente.

### Contratos HTTP pendentes

Os repositories HTTP dos domínios consolidados não contêm URLs provisórias. Até que o backend publique contratos reais, eles retornam um erro explícito de contrato pendente. Isso inclui:

- desenvolvimento, marcos e crescimento;
- puerpério e bem-estar;
- exercícios;
- preferências;
- dispositivos;
- sono, passos e histórico de saúde;
- feedback e suporte.

No modo mock, todos esses fluxos usam dados neutros mantidos atrás dos MockRepositories. No modo real, cada domínio pode exibir o estado de erro até seu contrato ser implementado, sem fallback silencioso para mocks.

## Fluxo de autenticação

1. `AuthProvider` chama `restoreSession` ao iniciar.
2. Enquanto a sessão é restaurada, a splash nativa permanece visível e rotas protegidas não são renderizadas.
3. Sem sessão, a navegação segue para Login.
4. `signIn` obtém e persiste somente a sessão e os tokens necessários.
5. Com sessão, `DataProvider` carrega mãe, bebê, conteúdos e alertas pelos repositories.
6. `signOut` limpa a sessão local mesmo se a revogação remota falhar.

Em Android/iOS, tokens usam `expo-secure-store`. No Expo Web, onde SecureStore não está disponível, a sessão usa `sessionStorage` somente para desenvolvimento e é encerrada ao fechar a aba.

## Responsividade

- O mesmo código atende phones e tablets.
- Phones usam bottom navigation; tablets usam `TabletSidebar`.
- `ResponsiveContainer` e `ResponsiveGrid` preservam os breakpoints existentes.
- Esta fase não altera layout, tokens visuais ou componentes de apresentação.

## Limites atuais

- O cadastro ainda é uma experiência visual; o endpoint real de criação de conta não faz parte desta fase.
- Conteúdo clínico permanece neutro e sujeito à validação profissional.
- Dados de saúde, crescimento, desenvolvimento e wearable continuam demonstrativos, mas agora são acessados somente por repositories e hooks de domínio.
- Sem HealthKit, Apple Health, Garmin, push real, chat, analytics, API clínica ou sincronização em background.
- Não há banco local complexo; somente a sessão mínima é persistida.
