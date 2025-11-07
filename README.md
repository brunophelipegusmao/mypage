# 🌐 Corelayer - Arquitetura limpa, entrega previsível

## 📋 Sobre o Projeto

Site profissional da **Corelayer**, especializada em desenvolvimento de sistemas sob medida para web e mobile. Este projeto foi construído com as mais modernas tecnologias web, do planejamento ao deploy, com foco em performance, DX e qualidade de produção.

### 🎯 Objetivo

Criar uma presença digital profissional que apresente serviços, portfólio e facilite o contato com potenciais clientes e parceiros.

---

## 🚀 Tecnologias Utilizadas

### **Core Framework**

- **[Next.js 16.0.1](https://nextjs.org/)** - Framework React de produção com App Router
- **[React 19.2.0](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript com tipagem estática

### **Estilização**

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS utility-first
- **CSS Custom Properties** - Sistema de tema claro/escuro dinâmico
- **Animações CSS** - Sistema de animações personalizadas

### **Funcionalidades**

- **[EmailJS](https://www.emailjs.com/)** - Envio de emails direto do frontend
- **[Next.js Image](https://nextjs.org/docs/api-reference/next/image)** - Otimização automática de imagens
- **Theme Switcher** - Alternância entre tema claro e escuro
- **Responsive Design** - Layout adaptável para todos os dispositivos

### **Desenvolvimento**

- **[ESLint 9](https://eslint.org/)** - Análise estática de código
- **[Prettier](https://prettier.io/)** - Formatação automática de código
- **[Lucide React](https://lucide.dev/)** - Ícones SVG modernos

---

## 🎨 Design e Tema

### **Paleta de Cores Corelayer**

```css
/* Tema Claro (Padrão) */
--primary: #1B6AFF       /* Azul primário */
--secondary: #F5F5F7     /* Cinza claro */
--background: #FFFFFF    /* Fundo branco */
--foreground: #0E0E10    /* Texto escuro */
--card: #F5F5F7          /* Cards cinza claro */
--accent: #2780FF        /* Azul accent */

/* Tema Escuro */
--primary: #1B6AFF       /* Azul primário (consistente) */
--secondary: #252529     /* Cinza escuro */
--background: #0E0E10    /* Fundo escuro */
--foreground: #FFFFFF    /* Texto claro */
--card: #1A1A1D          /* Cards escuro */
--accent: #2780FF        /* Azul accent */

/* Gradientes de Azul */
--blue-1: #1B6AFF
--blue-2: #2780FF
--blue-3: #3B8CFF
```

### **Características Visuais**

- ☀️ **Tema claro** como padrão
- 🌙 **Tema escuro** opcional com toggle animado
- ✨ **Animações suaves** com delays progressivos
- 📱 **Design responsivo** mobile-first
- 🎯 **Foco na experiência do usuário**
- 💾 **Preferência de tema salva** no localStorage

---

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── layout.tsx         # Layout raiz da aplicação
│   ├── page.tsx           # Página inicial
│   ├── globals.css        # Estilos globais e temas
│   ├── portfolio/         # Página do portfólio
│   ├── services/          # Página de serviços
│   ├── contact/           # Página de contato
│   └── api/contact/       # API route para contato
├── components/            # Componentes reutilizáveis
│   ├── Button/           # Sistema de botões
│   ├── Card/             # Componentes de card
│   ├── ClientLayout/     # Wrapper cliente para tema
│   ├── ContactForm/      # Formulário de contato
│   ├── Header/           # Cabeçalho responsivo
│   ├── Input/            # Campos de formulário
│   ├── ProjectCard/      # Cards de projeto
│   ├── ServiceCard/      # Cards de serviço
│   ├── ThemeToggle/      # Botão de alternância de tema
│   └── index.tsx         # Exports centralizados
├── contexts/              # React Contexts
│   └── ThemeContext.tsx  # Gerenciamento de tema
├── lib/                  # Utilitários e configurações
│   ├── utils.ts          # Funções utilitárias
│   └── emailjs-config.ts # Configuração EmailJS
└── types/                # Definições TypeScript
    └── global.d.ts       # Tipos globais
```

---

## 🛠️ Instalação e Execução

### **Pré-requisitos**

- Node.js 18+ instalado
- npm, yarn, pnpm ou bun

### **Passos para execução**

1. **Clone o repositório**

```bash
git clone https://github.com/bmulim/mypage.git
cd mypage
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**

```bash
# Copie o arquivo de configuração do EmailJS
cp src/lib/emailjs-config.ts.example src/lib/emailjs-config.ts

# Edite o arquivo com suas credenciais do EmailJS
```

4. **Execute o projeto em desenvolvimento**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### **Build para produção**

```bash
npm run build
npm run start
```

---

## 📧 Configuração do EmailJS

O formulário de contato utiliza o EmailJS para envio de emails sem necessidade de backend.

### **Setup EmailJS:**

1. **Crie uma conta** em [EmailJS.com](https://www.emailjs.com/)

2. **Configure um serviço de email** (Gmail recomendado)

3. **Crie um template de email** com as variáveis:
   - `{{user_name}}` - Nome do usuário
   - `{{user_email}}` - Email do usuário
   - `{{subject}}` - Assunto da mensagem
   - `{{message}}` - Conteúdo da mensagem

4. **Atualize o arquivo de configuração**:

```typescript
// src/lib/emailjs-config.ts
export const EMAILJS_CONFIG = {
  SERVICE_ID: "seu_service_id",
  TEMPLATE_ID: "seu_template_id",
  PUBLIC_KEY: "sua_public_key",
};
```

### **Fallback de Email**

Se o EmailJS falhar, o sistema automaticamente abre o cliente de email padrão do usuário com os dados preenchidos.

---

## 🎯 Funcionalidades

### **🏠 Página Inicial**

- Hero section com slogan "Arquitetura limpa, entrega previsível"
- Cards de serviços (Desenvolvimento Web & Mobile, APIs & Dashboards)
- Navegação responsiva com logo SVG animado
- Toggle de tema claro/escuro
- Animações de entrada

### **💼 Portfólio**

- Grid de projetos realizados
- Cards interativos com hover effects
- Links para GitHub e demos
- Suporte a imagens otimizadas

### **🛠️ Serviços**

- Desenvolvimento Web & Mobile
- APIs RESTful e dashboards interativos
- Layout responsivo com cards

### **📞 Contato**

- Formulário funcional com EmailJS
- Informações de contato
- Horários de disponibilidade
- Links para redes sociais
- Validação de campos em tempo real

### **🎨 Sistema de Tema**

- ☀️ Tema claro padrão
- 🌙 Modo escuro opcional
- 🔄 Toggle animado com ícones sol/lua
- 💾 Preferência salva no localStorage
- ⚡ Prevenção de flash ao carregar
- 🎯 Suporte SSR sem hydration mismatch

### **📱 Responsividade**

- Design mobile-first
- Menu hamburger para dispositivos móveis
- Breakpoints otimizados
- Imagens responsivas
- Toggle de tema acessível em mobile e desktop

---

## 🧩 Componentes Principais

### **Header**

```tsx
// Cabeçalho responsivo com logo SVG e toggle de tema
<Header />
```

### **ThemeToggle**

```tsx
// Botão de alternância de tema claro/escuro
<ThemeToggle />
```

### **ProjectCard**

```tsx
// Card de projeto reutilizável
<ProjectCard
  title="Nome do Projeto"
  description="Descrição detalhada..."
  technologies={["React", "TypeScript"]}
  href="https://github.com/user/repo"
  animation="animate-fade-in-up"
/>
```

### **ContactForm**

```tsx
// Formulário de contato com EmailJS
<ContactForm animation="fade-in-up" />
```

### **Button**

```tsx
// Sistema de botões customizável
<Button variant="primary" size="lg" href="/contact">
  Entre em Contato
</Button>
```

### **ClientLayout**

```tsx
// Wrapper cliente para ThemeProvider e Header
<ClientLayout>{children}</ClientLayout>
```

---

## 🎬 Sistema de Animações

### **Classes disponíveis:**

- `animate-fade-in` - Fade in simples
- `animate-fade-in-up` - Fade in com movimento vertical
- `animate-slide-in-left` - Slide da esquerda
- `animate-slide-in-right` - Slide da direita
- `animate-slide-up` - Slide vertical

### **Delays:**

- `animation-delay-200` até `animation-delay-1000`
- Permite animações sequenciais suaves

### **Exemplo de uso:**

```tsx
<div className="animate-fade-in-up animation-delay-300">
  Conteúdo com animação atrasada
</div>
```

---

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento com hot reload
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Análise de código com ESLint
```

---

## 📈 Performance e SEO

- ⚡ **Next.js App Router** para roteamento otimizado
- 🖼️ **Next.js Image** para otimização automática de imagens
- 📱 **Responsive Design** para todos os dispositivos
- 🎨 **CSS otimizado** com Tailwind CSS v4
- ⚡ **Loading states** para melhor UX
- 🔍 **Meta tags** otimizadas para SEO
- 🌓 **Sistema de tema** sem flash de conteúdo
- 💾 **LocalStorage** para persistência de preferências
- 🎯 **Favicons SVG** adaptados ao tema (claro/escuro)

---

## 🎨 Branding Corelayer

### **Logo**

- SVG inline com 3 camadas horizontais
- Gradiente azul (#1B6AFF, #2780FF, #3B8CFF)
- Animação de hover com escala
- Responsivo (12x12 mobile, 16x16 desktop)

### **Favicon**

- Versões dark e light adaptadas ao tema
- "CL" tipográfico + 3 barras em gradiente
- 256x256px em SVG

### **Identidade Visual**

- Tipografia: System UI / Geist Sans
- Peso: 700 (bold) para logo e títulos
- Espaçamento: Consistente com Tailwind scale
- Border radius: 0.625rem padrão

---

## 📞 Contato

- **Website:** [corelayer.com](https://bgm-tecnologia.vercel.app)
- **Email:** contato@corelayer.com

---

## 📝 Licença

Este projeto é **privado** e de propriedade da Corelayer. Todos os direitos reservados.

---

## 🤝 Contribuições

Este é um projeto corporativo, mas sugestões e feedbacks são sempre bem-vindos! Entre em contato pelos canais mencionados acima.

---

**🌟 Corelayer - Arquitetura limpa, entrega previsível**
