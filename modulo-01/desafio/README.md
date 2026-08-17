<div align="center">

# 🐾 PetCare Manager

**Sistema completo de gerenciamento de petshops**  
Agendamentos, CRUD de clientes e e-commerce — em uma SPA sem frameworks.

[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Design%20System-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://tc39.es/ecma262/)
[![WCAG](https://img.shields.io/badge/WCAG-2.2%20AA-00843D?style=flat-square)](https://www.w3.org/WAI/WCAG22/quickref/)
[![License](https://img.shields.io/badge/License-MIT-6366f1?style=flat-square)](./LICENSE)

</div>

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Demonstração](#-demonstração)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Design System](#-design-system)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Como executar](#-como-executar)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Módulos JavaScript](#-módulos-javascript)
- [Acessibilidade](#-acessibilidade)
- [Segurança](#-segurança)
- [Performance](#-performance)
- [Decisões técnicas](#-decisões-técnicas)
- [Licença](#-licença)

---

## 🎯 Visão Geral

O **PetCare Manager** é uma aplicação web completa desenvolvida como desafio prático do módulo 01 do curso **Teach 3035**. O projeto foi construído sem frameworks ou bundlers — apenas HTML5 semântico, CSS moderno com Design System baseado em tokens e JavaScript puro em módulos ES2024.

O objetivo foi demonstrar domínio de boas práticas de engenharia front-end em ambiente de produção, aplicando os princípios de **Clean Code**, **SOLID**, **DRY**, **KISS** e **Separation of Concerns** numa arquitetura escalável e de fácil manutenção.

---

## 🖥️ Demonstração

A aplicação é composta por três seções principais, acessíveis via navegação por abas:

| Seção | Descrição |
|---|---|
| **Início & Cadastro** | Formulário de agendamento com validação em tempo real e feedback visual |
| **Clientes** | Grid de agendamentos com busca, edição e exclusão |
| **E-commerce** | Catálogo de produtos com carrinho de compras lateral |

---

## ✅ Funcionalidades

### 🗓️ Gestão de Agendamentos
- Cadastro completo de atendimentos (tutor, pet e data)
- Validação de formulário customizada com mensagens de erro contextualizadas
- Validação de data retroativa (impede agendamentos no passado)
- Máscara automática de telefone `(00) 00000-0000`
- Listagem ordenada por data decrescente

### ✏️ CRUD Completo de Clientes
- **Criar** — agendamento via formulário validado
- **Visualizar** — modal com todos os detalhes do atendimento
- **Editar** — preenche o formulário com os dados existentes; botão muda para "Salvar Alterações"; botão "Cancelar" disponível
- **Excluir** — confirmação nativa antes de deletar; atualização imediata da lista

### 🛒 E-commerce e Carrinho
- Catálogo com 10 produtos de nutrição e acessórios para pets
- Adição ao carrinho com animação de feedback no badge
- Carrinho lateral com remoção individual de itens
- Cálculo automático do total em `pt-BR` com `Intl.NumberFormat`
- Finalização de compra com limpeza do carrinho e notificação

### 🎨 UI/UX
- Interface dark com efeito glassmorphism e formas de fundo animadas
- Notificações toast configuráveis (sucesso e erro) com temporizador automático
- Animações de entrada com `fade-in-up` em cards e modais
- Transições suaves com `cubic-bezier` customizado
- Design responsivo para mobile, tablet e desktop

---

## 🏗️ Arquitetura

O projeto adota uma **arquitetura modular baseada em ES Modules**, com separação clara de responsabilidades entre camadas:

```
┌─────────────────────────────────────────────────────────────────┐
│                           app.js (Entry Point)                  │
│         Orquestra a inicialização de todos os módulos           │
└──────┬───────────┬──────────────┬──────────────┬───────────────┘
       │           │              │              │
  ┌────▼───┐  ┌───▼────┐  ┌──────▼──────┐  ┌──▼──────┐
  │  UI    │  │Clients │  │  Products   │  │  Cart   │
  │(tabs,  │  │(CRUD,  │  │ (catálogo,  │  │(sidebar,│
  │ phone) │  │ cards) │  │  renderização)│ │ checkout│
  └────────┘  └───┬────┘  └──────┬──────┘  └──┬──────┘
                  │              │             │
            ┌─────▼──────────────▼─────────────▼──────┐
            │              Shared Layer                 │
            │  modal.js │ toast.js │ validation.js      │
            └─────────────────────────────────────────┘
                                │
            ┌───────────────────▼──────────────────────┐
            │             Foundation Layer              │
            │   constants.js │ storage.js │ utils.js   │
            └──────────────────────────────────────────┘
```

### Princípios Aplicados

| Princípio | Aplicação |
|---|---|
| **SRP** (Single Responsibility) | Cada módulo tem uma única razão para mudar |
| **OCP** (Open/Closed) | Novas funcionalidades adicionadas sem alterar módulos existentes |
| **DRY** | `SELECTORS` centraliza todos os seletores CSS; `createIcon()` elimina duplicação |
| **KISS** | Funções pequenas, nomes descritivos, sem lógica desnecessária |
| **Separation of Concerns** | Storage, UI, Validação e Lógica de Negócio em camadas distintas |

---

## 🎨 Design System

Todo o CSS é baseado em **tokens (Custom Properties)**, organizados em camadas:

```css
:root {
  /* Color Palette — 10 tons de base + accents + semânticos */
  --color-accent-violet: #8b5cf6;
  --color-success:       #10b981;
  --color-error:         #ef4444;

  /* Typography — fluid com clamp() */
  --text-base: clamp(0.90rem, 1.5vw, 1rem);
  --text-4xl:  clamp(1.90rem, 4vw,  2.5rem);

  /* Spacing — grid de 8 pontos */
  --space-4: 1rem;     /* 8px base */
  --space-8: 2rem;     /* 16px */

  /* Transition — easing curves customizadas */
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);

  /* Z-index — escala semântica */
  --z-modal:   300;
  --z-toast:   400;
}
```

**Componentes do sistema:**
- Glassmorphism (`glass`) — backdrop-filter com borda translúcida
- Botões — `.btn-primary`, `.btn-secondary`, `.btn-danger`
- Cards — cliente, produto, carrinho
- Formulários — estados: default, focus, error, disabled
- Feedback — Toast (sucesso/erro) e Modal de detalhes

---

## 🛠️ Tecnologias

| Tecnologia | Versão / Especificação | Uso |
|---|---|---|
| **HTML5** | Living Standard | Estrutura semântica (header, nav, main, section, aside, article) |
| **CSS** | Nível 4 / Custom Properties | Design System com tokens, Grid, Flexbox, `clamp()`, `aspect-ratio` |
| **JavaScript** | ES2024 (ESModules) | Lógica modular sem bundler |
| **Phosphor Icons** | Web CDN | Ícones SVG acessíveis com `aria-hidden` |
| **Google Fonts** | Inter + Outfit | Tipografia profissional via `<link preconnect>` |
| **localStorage** | Web API | Persistência de dados de clientes e carrinho entre sessões |
| **Intl API** | Web API | Formatação de moeda (`BRL`) e datas (`pt-BR`) |

---

## 📦 Pré-requisitos

- **Navegador moderno** com suporte a ES Modules (Chrome 80+, Firefox 80+, Safari 14+, Edge 80+)
- **Servidor HTTP local** — obrigatório para ES Modules (não abre via `file://`)

> [!IMPORTANT]
> ES Modules não funcionam com o protocolo `file://` por restrições de CORS. É necessário servir os arquivos via HTTP.

---

## 🚀 Como executar

### Opção 1 — VS Code com Live Server (recomendado)

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/petcare-manager.git

# 2. Abra no VS Code
code petcare-manager/modulo-01/desafio/

# 3. Instale a extensão Live Server (se ainda não tiver)
# 4. Clique com o botão direito no index.html > "Open with Live Server"
```

### Opção 2 — Python (sem instalação)

```bash
# Na pasta do projeto
cd modulo-01/desafio

# Python 3
python3 -m http.server 8080

# Acesse: http://localhost:8080
```

### Opção 3 — Node.js com npx

```bash
cd modulo-01/desafio
npx -y serve .
# Acesse a URL exibida no terminal
```

---

## 📁 Estrutura de Pastas

```
modulo-01/
└── desafio/
    ├── index.html          # Estrutura HTML semântica — único ponto de entrada
    ├── style.css           # Design System completo (1.2k linhas, ~70 tokens)
    ├── README.md           # Esta documentação
    └── js/
        ├── app.js          # Entry point — inicializa e orquestra todos os módulos
        ├── constants.js    # Dados imutáveis: produtos, seletores, tokens de config
        ├── storage.js      # Abstração do localStorage com validação de tipo
        ├── utils.js        # Utilitários puros: formatação, sanitização, máscaras
        ├── validation.js   # Engine de validação declarativa baseada em regras
        ├── modal.js        # Modal de detalhes com gerenciamento de foco (WCAG)
        ├── toast.js        # Sistema de notificações (success/error) com auto-hide
        ├── cart.js         # Estado e UI do carrinho com event delegation
        ├── clients.js      # CRUD de agendamentos e renderização dos cards
        ├── products.js     # Renderização do catálogo de produtos
        └── ui.js           # Navegação por abas com aria-current e máscara de tel.
```

---

## 📐 Módulos JavaScript

### `constants.js`
Único source of truth para todos os valores imutáveis da aplicação. Inclui o catálogo de produtos, configurações do toast, regras de validação e — criticamente — todos os seletores CSS centralizados em `SELECTORS`, para que uma mudança de ID no HTML precise ser corrigida em apenas um lugar.

### `storage.js`
Abstração completa do `localStorage` com `safeParse()` para evitar erros em dados corrompidos. Expõe interfaces de alto nível (`ClientStorage`, `CartStorage`) que escondem os detalhes do storage subjacente.

### `utils.js`
Funções utilitárias puras e reutilizáveis. Os formatadores `Intl.NumberFormat` e `Intl.DateTimeFormat` são instanciados **uma única vez** (módulo-level) para máxima performance. Destaque para `createIcon()` que elimina o uso de `innerHTML` para criar ícones, e `sanitizeText()` que previne XSS.

### `validation.js`
Engine de validação baseada em uma **tabela declarativa de regras** (`RULES`). Adicionar uma nova regra de validação não requer alterar nenhuma lógica existente — apenas um novo objeto no array. Suporte a regras condicionais (e.g., validar data no passado apenas se uma data foi selecionada). Previne erros de validação duplicados via `wrapper.classList.contains('error')`.

### `modal.js`
Gerencia o ciclo de vida completo do modal (abrir, fechar, ESC, click no backdrop). Implementa **gerenciamento de foco stateful** conforme WCAG 2.4.3: armazena o elemento que disparou o modal e restaura o foco ao fechar. Expõe callbacks `onEdit` e `onDelete` para inversão de dependências.

### `toast.js`
Singleton com refs cacheadas após `init()`. Gerencia o `timeout` de auto-hide garantindo que notificações em sequência não se sobreponham. Suporta tipos configuráveis (`success`, `error`) via tokens em `constants.js`.

### `cart.js`
Usa **event delegation** no container do carrinho (um único listener para todos os botões de remoção). Aplica `DocumentFragment` para inserção em batch sem reflow. Sidebar usa `translate` via CSS (GPU-composited, sem reflow do layout).

### `clients.js`
Gerencia o estado de edição via `data-editing-id` no formulário — sem variáveis globais. A função `buildClientFromForm` é uma função pura. A lógica de submit detecta se está em modo "criar" ou "editar" e chama `add()` ou `update()` respectivamente.

### `ui.js`
Gerencia a navegação por abas com um único listener delegado. Atualiza `aria-current="page"` nos botões para compatibilidade com leitores de tela. Expõe `navigateTo()` para que outros módulos possam navegar programaticamente sem acessar o DOM diretamente.

---

## ♿ Acessibilidade

O projeto busca conformidade com **WCAG 2.2 Nível AA**:

| Critério | Implementação |
|---|---|
| **1.3.1 Info and Relationships** | HTML semântico: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<article>` |
| **1.4.3 Contrast** | Cores com contraste mínimo de 4.5:1 verificadas no Design System |
| **2.1.1 Keyboard** | Todos os elementos interativos acessíveis via Tab/Enter/Space/Escape |
| **2.4.3 Focus Order** | Focus restaurado ao elemento original ao fechar modais |
| **2.4.7 Focus Visible** | `:focus-visible` com outline violeta de 2px em todos os interativos |
| **3.2.2 On Input** | Nenhuma mudança de contexto inesperada ao digitar |
| **3.3.1 Error Identification** | Erros de validação com `role="alert"` e `aria-describedby` no campo |
| **4.1.2 Name, Role, Value** | `aria-label`, `aria-hidden`, `aria-current`, `aria-live`, `aria-modal` aplicados |

---

## 🔒 Segurança

- **XSS Prevention** — `sanitizeText()` usa `element.textContent` (não `innerHTML`) para sanitizar todo o conteúdo vindo do usuário ou do `localStorage` antes de exibir na UI. Nenhum dado externo é injetado via `innerHTML`.
- **Sem `eval()`** — nenhum uso de `eval`, `Function()`, `document.write` ou `setTimeout(string)`.
- **Sem `onclick` inline** — todos os eventos são registrados programaticamente via `addEventListener`.
- **Validação de tipo no storage** — `safeParse()` valida que o dado desserializado é um `Array` antes de utilizá-lo, prevenindo erros com dados corrompidos.
- **ES Modules isolados** — por definição, cada módulo tem seu próprio escopo léxico. Nenhuma variável é exposta no objeto `window`.

---

## ⚡ Performance

- **`Intl` instanciado uma vez** — `NumberFormat` e `DateTimeFormat` criados no nível do módulo, não a cada chamada de função.
- **`DocumentFragment`** — inserções em batch de múltiplos elementos DOM para evitar reflows repetidos.
- **Event Delegation** — um único listener no container do carrinho e na `<nav>`, em vez de um listener por item.
- **DOM refs cacheadas** — todos os módulos armazenam referências ao DOM na inicialização (`init()`), sem queries repetidas a cada interação.
- **`loading="lazy"` e `decoding="async"`** — em todas as imagens de produto e carrinho.
- **`fetchpriority="high"`** na imagem hero para melhorar o LCP.
- **`translate` no sidebar** — usa a propriedade `translate` do CSS (GPU-composited) ao invés de `left`/`right`, evitando reflow do layout.
- **Fonte com `preconnect`** — `<link rel="preconnect">` para o Google Fonts reduz latência de DNS.

---

## 💡 Decisões Técnicas

### Por que sem framework?
O objetivo do desafio é demonstrar domínio dos fundamentos da web. Frameworks abstraem a complexidade do DOM, enquanto este projeto a enfrenta diretamente, aplicando as mesmas boas práticas (modularidade, separação de responsabilidades, estado) sem depender de ferramentas de terceiros.

### Por que `Object.freeze()` nos módulos exportados?
Para criar interfaces imutáveis. Garante que um módulo consumidor não possa sobrescrever acidentalmente os métodos de um serviço importado, tornando o comportamento do sistema mais previsível.

### Por que `window.confirm()` para exclusão?
A confirmação nativa é síncrona, sem necessidade de estado extra para gerenciar um modal de confirmação customizado. Mantém o projeto simples (KISS) sem sacrificar a segurança contra exclusões acidentais.

### Por que `data-editing-id` no formulário?
Alternativa limpa a variáveis de módulo mutáveis. Mantém o estado de edição colocado diretamente no elemento do DOM que ele afeta, tornando o ciclo de vida do estado visível e previsível.

---

## 📄 Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](./LICENSE) para mais informações.

---

<div align="center">

Desenvolvido como desafio prático do curso **Teach 3035 — Módulo 01**

</div>
