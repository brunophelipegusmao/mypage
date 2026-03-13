# AGENTS.md

## 1. Identidade do projeto
- Este projeto é um site pessoal/profissional com evolução para um produto simples.
- O objetivo imediato é consolidar:
  - site institucional;
  - blog com SEO;
  - login próprio com email e senha;
  - área privada autenticada;
  - to-do app;
  - banco PostgreSQL no Neon;
  - deploy na Vercel.
- A base atual já está em Next.js com App Router e deve evoluir a partir dessa estrutura, sem reinvenção desnecessária.

## 2. Decisão arquitetural fixa
- A arquitetura escolhida é NEXT.JS FULL-STACK.
- Não criar NestJS.
- Não criar backend separado nesta fase.
- O backend inicial deve permanecer dentro do Next.js usando App Router.
- `app` deve ser tratado como convenção técnica do Next.js App Router, não como URL pública da área autenticada.
- A área autenticada deve usar `/dashboard` como URL pública principal.
- O to-do deve ficar em `/dashboard/todo`, salvo se a implementação optar por tornar o to-do a tela principal de `/dashboard`.
- Route Groups podem ser usados internamente para organização sem impactar a URL pública.
- Usar Route Handlers para endpoints executados no servidor.
- Usar Server Actions apenas quando fizer sentido claro de fluxo, ergonomia e segurança.
- Qualquer proposta de API separada deve ser tratada como escopo futuro, não como decisão atual.
- Enquanto não houver pressão técnica real, manter um único runtime, um único repositório e um único deploy.

## 3. Motivo da decisão
- O projeto ainda não justifica dois runtimes separados.
- Evitar complexidade prematura.
- Evitar dois deploys, CORS, duplicação de variáveis de ambiente e acoplamento desnecessário.
- Priorizar entrega funcional, manutenção simples e deploy barato ou gratuito.
- Reduzir custo cognitivo, superfície de erro e tempo de setup para futuras iterações.

## 4. Stack obrigatória
- Next.js com App Router
- TypeScript
- Tailwind CSS
- Auth.js com Credentials
- PostgreSQL no Neon
- Drizzle ORM
- Markdown em texto para o conteúdo inicial dos posts, persistido no banco
- Vercel para deploy

## 5. Regras de implementação
- Não criar NestJS, Express ou backend separado.
- Não criar CMS nesta fase.
- Não criar complexidade sem motivo real de negócio.
- Não usar `localStorage` como mecanismo principal de autenticação.
- Não tratar mock, simulação ou `console.log` como backend real.
- Não misturar área pública com área autenticada de forma irresponsável.
- Não usar `/app` como URL pública da área autenticada.
- Não aplicar cache público em páginas, rotas ou dados da área autenticada.
- Corrigir problemas estruturais antes de adicionar novas features.
- Antes de propor abstrações, validar se a base atual realmente precisa delas.
- Preferir convenções nativas do Next.js antes de adicionar camadas extras.

## 6. Organização funcional desejada
- Site público institucional
- Blog público para leitura
- Login do proprietário com email e senha
- Área privada pública em `/dashboard`
- Administração privada do blog em `/dashboard`
- To-do autenticado
- Rotas de API internas no próprio Next.js
- SEO consistente
- Deploy em um único projeto Vercel nesta fase
- Manter separação explícita entre domínio público, autenticação e área privada.
- Sempre que possível, organizar a aplicação em torno de `src/app`, reaproveitando a estrutura já existente.
- Route Groups podem ser usados para organizar a área privada sem alterar a convenção pública em `/dashboard`.

## 7. Regras para o blog
- O blog deve ficar no Next.js.
- O blog público deve ser aberto para leitura.
- Os posts do blog devem ser persistidos no banco de dados.
- MDX não é a estratégia principal de armazenamento dos posts.
- A administração do blog deve acontecer no dashboard privado.
- Apenas o proprietário autenticado pode criar, editar, publicar, despublicar e excluir posts.
- O conteúdo do post pode ser armazenado inicialmente como markdown em texto no banco, para evitar complexidade prematura.
- Priorizar simplicidade editorial e operacional.
- Priorizar SEO técnico limpo.
- Não mover o blog para backend separado.
- Não criar editor rico complexo, versionamento editorial ou CMS externo nesta fase.
- O blog público deve exibir apenas posts com status `published`.
- Rascunhos não podem aparecer publicamente.
- Cada post deve nascer com estrutura mínima consistente:
  - `title`
  - `slug`
  - `excerpt`
  - `content`
  - `status`
  - `publishedAt`
  - `authorId`
  - `createdAt`
  - `updatedAt`
- Aproveitar e evoluir `sitemap.ts` e `robots.ts` existentes em vez de recriar soluções paralelas.

## 8. Regras para autenticação
- Usar Auth.js com Credentials Provider.
- O login deve usar email e senha.
- Não criar cadastro público.
- Não usar OAuth nesta fase.
- A sessão deve ser real e segura.
- A estratégia de sessão atual é `session strategy JWT`.
- Não usar sessão em banco nesta fase.
- Rotas privadas devem ser protegidas no servidor.
- Nada de usuário logado fake.
- O estado autenticado deve depender da sessão real no servidor.
- Não confiar em checagem somente no cliente para proteger dados ou fluxos privados.
- A autenticação deve ser pensada para conviver bem com Vercel e Neon desde o início.
- O administrador inicial deve ser criado por bootstrap controlado ou seed equivalente.
- Não criar recuperação de senha nesta fase.
- Essa escolha foi feita para reduzir complexidade operacional no contexto atual.

## 9. Regras para banco e dados
- Usar Neon como PostgreSQL principal.
- Usar Drizzle ORM.
- A modelagem inicial mínima deve considerar:
  - `users`
  - `tasks`
  - `posts`
- A estrutura mínima de `posts` deve considerar:
  - `title`
  - `slug`
  - `excerpt`
  - `content`
  - `status`
  - `publishedAt`
  - `authorId`
  - `createdAt`
  - `updatedAt`
- Não criar `sessions` table agora por padrão.
- Só introduzir tabela de sessões se houver mudança arquitetural explícita no futuro.
- Evitar tabelas especulativas sem necessidade real.
- A modelagem inicial deve servir ao produto atual, não a cenários hipotéticos.
- Migrações e schema devem refletir o estado real da aplicação e ser mantidos com disciplina.

## 10. Regras para documentação da API
- OpenAPI deve ser o contrato da API interna do projeto.
- Swagger UI deve ser a visualização interativa oficial da documentação.
- O projeto deve expor o spec em uma rota dedicada, por exemplo `/api/openapi.json`.
- O projeto deve expor a documentação em uma rota dedicada, por exemplo `/docs`.
- A documentação deve cobrir no mínimo:
  - auth e sessão
  - CRUD de tasks
  - CRUD de posts
  - healthcheck, se existir
- A documentação deve refletir a implementação real.
- O spec e a UI não podem virar ornamento desatualizado.
- Sempre que endpoints forem alterados, a documentação deve ser atualizada no mesmo ciclo de trabalho.

## 11. Regras para deploy
- O deploy atual deve considerar um único projeto na Vercel.
- Preparar variáveis de ambiente para Development, Preview e Production.
- Manter compatibilidade com Vercel Hobby.
- Quando houver dúvida entre simplicidade e sofisticação, escolher simplicidade operacional.
- Evitar dependências de infraestrutura que obriguem serviços extras logo no início.
- Otimizações de deploy não devem comprometer clareza, previsibilidade ou custo.

## 12. Forma de trabalho do agente
- Antes de alterar código, analisar a base real.
- Explicar rapidamente o plano da etapa.
- Implementar direto nos arquivos.
- Ao final de cada etapa, resumir:
  - arquivos criados;
  - arquivos alterados;
  - arquivos removidos;
  - riscos remanescentes;
  - pendências externas.
- Não despejar código enorme no chat sem necessidade.
- A entrega principal deve ser o patch real no workspace.
- Se houver inconsistência estrutural, apontar com objetividade antes de avançar.
- Não pedir links, arquivos ou contexto já disponível no workspace.

## 13. Ordem prioritária de execução futura
1. saneamento da base atual;
2. ajuste de branding, metadata, sitemap e robots;
3. autenticação própria com Credentials usando JWT;
4. modelagem e conexão com Neon e Drizzle para `tasks` e `posts`;
5. proteção de rotas e consolidação da área privada em `/dashboard`;
6. administração privada do blog no dashboard;
7. publicação do blog público consumindo apenas posts com status `published`;
8. criação das rotas server-side e do CRUD do to-do autenticado;
9. documentação OpenAPI e Swagger UI para auth, tasks, posts e healthcheck, se existir;
10. revisão de cache e PWA;
11. preparação de deploy final.

## 14. Critério de decisão
- Preferir sempre:
  - clareza;
  - manutenção;
  - menor número de moving parts;
  - compatibilidade com Vercel Hobby;
  - solução real em vez de arquitetura cosmética.
- Se uma decisão aumentar a complexidade sem aumentar valor imediato, ela deve ser rejeitada.

## 15. O que está fora do escopo agora
- NestJS
- microserviços
- filas
- workers
- WebSockets
- arquitetura multi-app
- painel CMS
- abstrações prematuras

## 16. Comportamento esperado do agente
- Ser direto.
- Não suavizar problemas técnicos.
- Apontar inconsistências.
- Corrigir a estrutura antes de adicionar feature.
- Explicar trade-offs quando necessário.
- Não pedir arquivos ou links que já estejam no workspace.
- Manter o foco no objetivo atual do produto, sem expandir escopo por entusiasmo técnico.
