# 🌐 BGM Tecnologia Web - Portfólio

## 📋 Sobre o Projeto

Site pessoal e portfólio profissional do desenvolvedor **Bruno Gusmão Mulim**, especializado em desenvolvimento Full Stack. Este projeto foi construído com as mais modernas tecnologias web para demonstrar competências técnicas e apresentar serviços de desenvolvimento.

### 🎯 Objetivo

Criar uma presença digital profissional que apresente serviços, projetos e facilite o contato com potenciais clientes e parceiros.

---

## 🚀 Tecnologias Utilizadas

### **Core Framework**

- **[Next.js 16.0.1](https://nextjs.org/)** - Framework React de produção com App Router
- **[React 19.2.0](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript com tipagem estática

### **Estilização**

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS utility-first
- **CSS Custom Properties** - Tema personalizado com paleta de cores específica
- **Animações CSS** - Sistema de animações personalizadas

### **Funcionalidades**

- **[EmailJS](https://www.emailjs.com/)** - Envio de emails direto do frontend
- **[Next.js Image](https://nextjs.org/docs/api-reference/next/image)** - Otimização automática de imagens
- **Responsive Design** - Layout adaptável para todos os dispositivos

### **Desenvolvimento**

- **[ESLint 9](https://eslint.org/)** - Análise estática de código
- **[Prettier](https://prettier.io/)** - Formatação automática de código
- **[Lucide React](https://lucide.dev/)** - Ícones SVG modernos

---

## 🎨 Design e Tema

### **Paleta de Cores**

```css
--primary: #049dd9 /* Azul claro - elementos principais */ --secondary: #140126
  /* Roxo escuro - elementos secundários */ --accent: #4a1fa6
  /* Roxo médio - destaques */ --card: #3658bf /* Azul roxo - containers */
  --background: #000000 /* Preto - fundo principal */ --foreground: #ffffff
  /* Branco - texto principal */;
```

### **Características visuais**

- 🌙 **Tema escuro** como padrão
- ✨ **Animações suaves** com delays progressivos
- 📱 **Design responsivo** mobile-first
- 🎯 **Foco na experiência do usuário**

---

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── layout.tsx         # Layout raiz da aplicação
│   ├── page.tsx           # Página inicial
│   ├── globals.css        # Estilos globais e tema
│   ├── portfolio/         # Página do portfólio
│   ├── services/          # Página de serviços
│   ├── contact/           # Página de contato
│   └── api/contact/       # API route para contato
├── components/            # Componentes reutilizáveis
│   ├── Button/           # Sistema de botões
│   ├── Card/             # Componentes de card
│   ├── ContactForm/      # Formulário de contato
│   ├── Header/           # Cabeçalho responsivo
│   ├── Input/            # Campos de formulário
│   ├── ProjectCard/      # Cards de projeto
│   ├── ServiceCard/      # Cards de serviço
│   └── index.tsx         # Exports centralizados
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

- Hero section com apresentação
- Cards de serviços oferecidos
- Navegação responsiva
- Animações de entrada

### **💼 Portfólio**

- Grid de projetos realizados
- Cards interativos com hover effects
- Links para GitHub e demos
- Suporte a imagens otimizadas

### **🛠️ Serviços**

- Lista detalhada de serviços oferecidos
- Cards com features de cada serviço
- Layout responsivo

### **📞 Contato**

- Formulário funcional com EmailJS
- Informações de contato
- Horários de disponibilidade
- Links para redes sociais
- Validação de campos em tempo real

### **📱 Responsividade**

- Design mobile-first
- Menu hamburger para dispositivos móveis
- Breakpoints otimizados
- Imagens responsivas

---

## 🧩 Componentes Principais

### **Header**

```tsx
// Cabeçalho responsivo com navegação
<Header />
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
- 🎨 **CSS otimizado** com Tailwind CSS
- ⚡ **Loading states** para melhor UX
- 🔍 **Meta tags** otimizadas para SEO

---

## 🚀 Deploy

### **Vercel (Recomendado)**

```bash
# Conecte o repositório GitHub à Vercel
# O deploy acontece automaticamente
```

### **Netlify**

```bash
npm run build
# Upload da pasta 'out' para Netlify
```

### **Servidor próprio**

```bash
npm run build
npm run start
# Configure reverse proxy (nginx)
```

---

## 📞 Contato

- **Email:** bruno.mulim.prog@gmail.com
- **LinkedIn:** [/in/bruno-mulim](https://www.linkedin.com/in/bruno-mulim/)
- **GitHub:** [/bmulim](https://github.com/bmulim)
- **Instagram:** [@brunopmulim](https://instagram.com/brunopmulim)

---

## 📝 Licença

Este projeto é **privado** e de propriedade de Bruno Gusmão Mulim. Todos os direitos reservados.

---

## 🤝 Contribuições

Este é um projeto pessoal, mas sugestões e feedbacks são sempre bem-vindos! Entre em contato pelos canais mencionados acima.

---

**🌟 BGM Tecnologia Web - Transformando ideias em soluções digitais**
