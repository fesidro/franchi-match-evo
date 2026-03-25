# Identidade Visual — franchiMatch

Documento de referência para desenvolvedores. Descreve a paleta de cores, tipografia, componentes, layout e padrões visuais utilizados no projeto.

---

## 1. Paleta de Cores

Todas as cores são definidas como variáveis CSS em HSL no arquivo `src/index.css` e mapeadas no `tailwind.config.ts`. **Nunca use cores hardcoded nos componentes** — sempre utilize os tokens semânticos via classes Tailwind.

### Cores Primárias

| Token | HSL (light) | Uso |
|---|---|---|
| `--primary` | `217 91% 35%` | Azul Royal — cor principal da marca. Títulos, ícones, links, acentos. |
| `--primary-light` | `217 85% 45%` | Hover de botões primários, destaques mais claros. |
| `--primary-dark` | `217 91% 25%` | Texto de alto contraste, valores financeiros em destaque. |

### Cores Secundárias

| Token | HSL (light) | Uso |
|---|---|---|
| `--secondary` | `25 95% 53%` | Laranja vibrante — CTAs, botões de ação, conversão. |
| `--secondary-light` | `25 95% 63%` | Hover de botões secundários/CTA. |

### Neutros

| Token | HSL (light) | Uso |
|---|---|---|
| `--background` | `0 0% 100%` | Fundo geral (branco). |
| `--foreground` | `215 25% 15%` | Texto principal (quase preto azulado). |
| `--muted` | `215 20% 95%` | Fundos sutis, seções alternadas. |
| `--muted-foreground` | `215 15% 45%` | Texto secundário, descrições, labels menores. |
| `--border` | `215 20% 88%` | Bordas de cards, inputs, divisores. |
| `--card` | `0 0% 100%` | Fundo de cards (branco). |

### Cores de Estado

| Token | Uso |
|---|---|
| `--destructive` | Erros, ações destrutivas (vermelho). |
| `--ring` | Foco de acessibilidade (azul primário). |

### Tokens Legados (não usar em novos componentes)

Os tokens `--gold`, `--gold-dark`, `--gold-light` existem no CSS mas **não devem ser usados**. A estética dourada foi substituída pela paleta azul/laranja fintech.

### Dark Mode

O dark mode está definido na classe `.dark` em `index.css`. As variáveis se adaptam automaticamente:
- Fundo escuro: `215 30% 8%`
- Cards escuros: `215 25% 12%`
- Primário mais claro: `217 85% 45%`

---

## 2. Tipografia

### Fontes

O projeto utiliza a **stack de fontes padrão do sistema** via Tailwind (`font-sans`):

```
Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif
```

O logo SVG (`src/assets/logo.svg`) usa **Arial Black / Arial Bold**.

> **Nota:** Não há fontes externas importadas (Google Fonts, etc). Para adicionar uma fonte geométrica (Montserrat, Poppins), importar via `<link>` no `index.html` e atualizar `fontFamily` no `tailwind.config.ts`.

### Hierarquia de Títulos

Definida globalmente em `src/index.css` via `@layer base`:

| Elemento | Tamanho (mobile → desktop) | Peso |
|---|---|---|
| `h1` | `text-4xl` → `text-5xl` → `text-6xl` | `font-bold` |
| `h2` | `text-3xl` → `text-4xl` → `text-5xl` | `font-bold` |
| `h3` | `text-2xl` → `text-3xl` | `font-bold` |

Todos os headings possuem `tracking-tight` e `font-bold` por padrão.

**Padrão de destaque em títulos:** Palavras-chave são envolvidas em `<span className="text-primary">` para colorir em azul royal.

```tsx
<h1>Área do <span className="text-primary">Franqueado</span></h1>
```

### Texto Auxiliar

- Labels/categorias: `text-[10px] font-semibold uppercase tracking-[0.15em] text-primary`
- Descrições: `text-sm text-muted-foreground`
- Valores financeiros em destaque: `text-sm font-bold text-primary-dark`

---

## 3. Gradientes e Sombras

### Gradientes (variáveis CSS)

| Token | Valor | Uso |
|---|---|---|
| `--gradient-hero` | `linear-gradient(135deg, primary → primary-light)` | Fundo de seções hero, texto com `text-gradient`. |
| `--gradient-cta` | `linear-gradient(135deg, secondary → secondary-light)` | Botões CTA premium. |
| `--gradient-subtle` | `linear-gradient(180deg, white → muted)` | Fundo sutil de página. |

### Sombras (variáveis CSS)

| Token | Uso |
|---|---|
| `--shadow-sm` | Elevação mínima. |
| `--shadow-md` | Cards padrão. |
| `--shadow-lg` | Cards em destaque. |
| `--shadow-xl` | Elementos flutuantes. |
| `--shadow-primary` | Sombra azul (botões hero). |
| `--shadow-secondary` | Sombra laranja (botões CTA). |

### Classe utilitária `text-gradient`

```css
.text-gradient {
  background-image: var(--gradient-hero);
  -webkit-background-clip: text;
  color: transparent;
}
```

---

## 4. Componentes e Padrões de UI

### Botões (`src/components/ui/button.tsx`)

Variantes disponíveis via `class-variance-authority`:

| Variante | Visual | Quando usar |
|---|---|---|
| `default` | Azul sólido | Ações primárias genéricas. |
| `hero` | Azul com sombra azul + `font-semibold` | CTA principal da landing page. |
| `cta` | Laranja com sombra laranja + `font-semibold` | Botões de conversão (ex: agendar consultoria). |
| `secondary` | Laranja sólido | Ações secundárias de destaque. |
| `outline` | Borda cinza, fundo transparente | Ações alternativas, links secundários. |
| `ghost` | Sem fundo, hover sutil | Navegação, ações terciárias. |
| `link` | Texto azul com underline | Links inline. |
| `destructive` | Vermelho | Ações destrutivas (excluir, cancelar). |

Tamanhos: `sm`, `default`, `lg`, `xl`, `icon`.

Border radius dos botões: `rounded-md` (padrão) ou `rounded-lg` (tamanhos maiores). **Não usar `rounded-full`** (pílula) nos CTAs.

### Cards de Franquia (`PremiumFranchiseCard.tsx`)

- Fundo: `bg-background` (branco)
- Borda: `border border-border`, muda para `border-primary/30` quando em foco
- Sombra: tons de azul (`hsl(217 91% 35% / 0.1)`), **nunca amarelo/dourado**
- Acento superior: linha de 1px com gradiente `via-primary`
- Ícone de logo placeholder: círculo com `bg-primary/5` e letra em `text-primary`
- Estrelas de rating: preenchidas em `fill-secondary text-secondary` (laranja)
- Seção "Conteúdo Premium": fundo `bg-primary/5`, ícone de cadeado em `text-primary`
- Botão CTA: `bg-secondary` (laranja), sombra laranja, hover `bg-secondary-light`

### Sidebar (`DashboardSidebar.tsx`)

- Flutuante com `position: fixed`, `rounded-2xl`
- Efeito glassmorphism: `bg-background/70 backdrop-blur-xl`
- Borda: `border-border`
- Sombra: azul sutil
- Ícones de navegação: `text-primary`
- Hover dos links: `hover:bg-primary/5`
- Acento superior: gradiente `via-primary`
- Colapsável em mobile via `translate-x` com overlay `backdrop-blur-sm`

### Carrossel 3D (`Carousel3D.tsx`)

- Container com `perspective: 1200px`
- Card ativo: escala 1.0, sem blur, z-index máximo
- Cards adjacentes: `translateX(±220px)`, `translateZ(-120px)`, `rotateY(∓12°)`, escala reduzida em 12% por nível
- Cards distantes (>1 nível): blur progressivo (`3px` por nível)
- Máximo de 3 cards visíveis de cada lado
- Navegação: botões circulares com borda e ícone em `text-primary`
- Indicadores: barras horizontais, ativa em `bg-primary`, inativas em `bg-primary/20`
- Transição: `duration-500 ease-out`

---

## 5. Layout das Páginas

### Landing Page (`/`)

```
┌─────────────────────────────────────────┐
│  Hero (min-h-90vh, gradient background) │
│  ├── Logo + Título (text-gradient)      │
│  ├── Subtítulo (muted-foreground)       │
│  ├── Botões: Hero (azul) + Outline      │
│  └── Cards decorativos (rotacionados)   │
│  └── Stats: 3 colunas (text-primary)    │
├─────────────────────────────────────────┤
│  Packages (grid 1→2→4 colunas)         │
│  ├── Cards com step number              │
│  └── Botão CTA (laranja)               │
├─────────────────────────────────────────┤
│  FAQ (accordion)                        │
├─────────────────────────────────────────┤
│  Contact (formulário)                   │
└─────────────────────────────────────────┘
```

### Dashboard (`/dashboard`)

```
┌──────┬──────────────────────────────────┐
│      │  Header                          │
│ Side │  ├── "Área exclusiva" (label)    │
│ bar  │  ├── "Área do Franqueado" (h1)   │
│      │  └── Painel do investidor (right)│
│ (flu │──────────────────────────────────│
│ tuan │  Seção "Meus Matches"           │
│ te)  │  ├── Título + subtítulo          │
│      │  └── Carrossel 3D               │
│      │      (cards com perspectiva)     │
│      │      + navegação (dots + setas)  │
└──────┴──────────────────────────────────┘
```

- Sidebar: `w-56`, `fixed`, espaçamento `left-4 top-4 bottom-4`
- Conteúdo principal: `lg:pl-72` (compensa a sidebar)
- Mobile: sidebar escondida, botão hambúrguer `fixed top-5 left-5`
- Fundo: branco com gradiente radial azul muito sutil (3% opacidade) e gradiente de "chão reflexivo" (`from-muted/40`)

---

## 6. Responsividade

### Breakpoints (Tailwind padrão)

| Prefixo | Largura mínima |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1400px (container) |

### Padrões responsivos do projeto

- **Sidebar:** Escondida em `< lg`, visível e fixa em `≥ lg`
- **Grid de pacotes:** `1 col` → `2 cols (md)` → `4 cols (lg)`
- **Header do dashboard:** Empilhado em mobile (`flex-col`), lado a lado em `≥ md`
- **Carrossel 3D:** Funciona em todas as telas, mas a experiência ideal é em `≥ md` (928px+)
- **Títulos:** Escalam de `text-3xl` a `text-4xl` em `≥ md`

---

## 7. Animações e Transições

### Variáveis de transição

| Token | Valor | Classe utilitária |
|---|---|---|
| `--transition-base` | `all 0.2s ease` | `.transition-base` |
| `--transition-smooth` | `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` | `.transition-smooth` |

### Animações Tailwind (definidas no `tailwind.config.ts`)

| Nome | Efeito | Duração |
|---|---|---|
| `fade-in` | `opacity: 0 → 1` | 0.6s ease-out |
| `slide-up` | `opacity: 0, translateY(20px) → visível` | 0.6s ease-out |
| `accordion-down/up` | Expand/collapse de accordions | 0.2s ease-out |

### Decorativos

- Esferas de gradiente pulsantes na landing page (`animate-pulse`) com blur (`blur-3xl`) e baixa opacidade
- Carrossel 3D: transição de `duration-500 ease-out` nos transforms

---

## 8. Ícones

Biblioteca: **Lucide React** (`lucide-react`)

Padrão de uso:
- Tamanho em navegação/cards: `h-4 w-4`
- Tamanho em botões de ação: `h-5 w-5`
- Cor: `text-primary` (azul) na maioria dos contextos
- Ícones de rating (estrelas): `fill-secondary text-secondary` quando ativas

---

## 9. Acessibilidade

- `ring` definido como azul primário para foco visível
- `ring-offset-background` para contraste do anel de foco
- Overlay de sidebar mobile com `backdrop-blur-sm` e click-to-close
- Alt text em imagens de logo
- Semântica: `<header>`, `<main>`, `<nav>`, `<aside>`, `<section>`
- `font-feature-settings: 'cv11', 'ss01'` para legibilidade tipográfica
- `scroll-behavior: smooth` no body

---

## 10. Estrutura de Arquivos Relevantes

```
src/
├── index.css                     # Design tokens (cores, gradientes, sombras, tipografia)
├── App.css                       # Estilos legados (não usar em novos componentes)
├── assets/
│   └── logo.svg                  # Logo franchiMatch (Arial Black, azul #1a237e + rosa #E91E63)
├── components/
│   ├── ui/
│   │   └── button.tsx            # Botão com variantes (hero, cta, default, etc.)
│   ├── dashboard/
│   │   ├── DashboardSidebar.tsx  # Sidebar flutuante glassmorphism
│   │   ├── Carousel3D.tsx        # Carrossel 3D com perspectiva
│   │   └── PremiumFranchiseCard.tsx # Card de franquia premium
│   ├── Hero.tsx                  # Seção hero da landing page
│   ├── Packages.tsx              # Grid de pacotes/serviços
│   ├── FAQ.tsx                   # Accordion de perguntas frequentes
│   └── Contact.tsx               # Formulário de contato
├── pages/
│   ├── Index.tsx                 # Landing page (/)
│   ├── Dashboard.tsx             # Área do franqueado (/dashboard)
│   ├── Match.tsx                 # Tela de match (/match)
│   └── Auth.tsx                  # Autenticação (/auth)
tailwind.config.ts                # Extensões do Tailwind (cores, animações, sombras)
```

---

## 11. Regras para Novos Componentes

1. **Cores:** Use exclusivamente tokens semânticos (`text-primary`, `bg-secondary`, `border-border`, etc.). Nunca `text-blue-700` ou `bg-orange-500`.
2. **Sombras:** Use as variáveis CSS (`shadow-primary`, `shadow-secondary`) ou sombras com HSL dos tokens.
3. **Dourado:** Não usar tokens `gold-*` em novos componentes.
4. **Botões CTA:** Sempre usar variante `cta` (laranja) ou `hero` (azul). Border-radius `rounded-lg`, nunca `rounded-full`.
5. **Transições:** Usar `.transition-smooth` para interações de UI, `.transition-base` para mudanças rápidas.
6. **Tipografia de títulos:** `font-bold tracking-tight`, palavras-chave em `text-primary`.
7. **Cards:** Fundo `bg-background`, borda `border-border`, sombra azul sutil.
8. **Responsividade:** Mobile-first. Sidebar escondida em `< lg`. Grids começam em 1 coluna.
