# 03 · CONTRATOS DE COMPONENTE

> Origem: `docs/design/13-components/*.md`
> Origem: `docs/design/05-chromatic-atmosphere.md`
> Origem: `docs/design/06-typographic-character.md`

---

Este documento define a assinatura técnica de cada componente. Nenhuma
implementação é descrita — apenas o contrato que o código deve cumprir.

---

## CAMADA A · PRIMITIVAS

### Text

```ts
interface TextProps {
  voice: 'grotesk' | 'serif' | 'mono';
  size?: 'display' | 'headline' | 'subhead' | 'body' | 'small' | 'micro';
  weight?: 'regular' | 'medium' | 'bold' | 'italic';
  tracking?: 'tight' | 'normal' | 'expanded' | 'monumental';
  leading?: 'tight' | 'normal' | 'relaxed';
  color?: 'primary' | 'secondary' | 'active' | 'inverse';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'figcaption' | 'time';
  class?: string;  // apenas para o consumidor aplicar margem externa
  children: string;
}
```

**Restrições:**
- `children` é sempre string — nunca elementos aninhados.
- A combinação `voice: 'serif'` + `weight: 'italic'` requer `as: 'p'` ou `as: 'span'`.
- `color: 'active'` (verde ácido) só é válido com `voice: 'mono'` e modo noturno.
- `as` mapeia para o elemento HTML semântico correto. Ex: o nome no Hero é `as: 'h1'`.

**Tokens utilizados:**
- `--type-voice-grotesk`, `--type-voice-serif`, `--type-voice-mono`
- `--type-size-*`, `--type-weight-*`, `--type-tracking-*`, `--type-leading-*`
- `--color-text-*`

---

### Rule

```ts
interface RuleProps {
  direction: 'horizontal' | 'vertical';
  material: 'steel' | 'ink';
  length?: string;   // CSS length. Default: 100%.
  thickness?: 'thin' | 'normal' | 'thick';
}
```

**Restrições:**
- `material: 'steel'` → cor `var(--color-surface-tecnico)` mais escura (simula aço).
- `material: 'ink'` → cor `var(--color-text-primary)`.
- Nunca usar `box-shadow` para simular profundidade da linha. Linha é plana.
- Steel usa `border-bottom` ou `border-left` com largura definida por thickness.

---

### Surface

```ts
interface SurfaceProps {
  material: 'concrete-raw' | 'concrete-polished' | 'paper' | 'marble';
  textureLevel?: 0 | 1 | 2;
  as?: 'div' | 'section' | 'article';
  class?: string;
  children: any;  // slot — recebe conteúdo arbitrário
}
```

**Restrições:**
- `marble` nunca é usado como fundo funcional — apenas em `Quotation`.
- `textureLevel: 2` carrega textura WebP estática.
- `textureLevel: 1` usa filtro SVG inline.
- `textureLevel: 0` usa apenas cor plana.
- O nível de textura é detectado em runtime via custom property `--texture-level`.

---

### Image

```ts
interface ImageProps {
  src: string;
  alt: string;
  treatment: 'blueprint' | 'calor';
  ratio: '1:1' | '4:3' | '3:2';
  caption: string;
  priority?: boolean;  // true = preload, sem lazy loading
}
```

**Restrições:**
- `treatment: 'blueprint'` → duotone azul cobalto + preto tinta.
- `treatment: 'calor'` → duotone laranja ferrugem + cinza concreto.
- A imagem original é processada no build (ver `07-asset-pipeline.md`).
  O componente renderiza a versão processada, não a original.
- Sempre renderiza margem interna + crop marks + legenda.
- `priority: true` apenas para a imagem do Hero (se houver) ou primeira
  imagem above the fold.
- `caption` é obrigatório. Formato: `FIG. NN — DESCRIÇÃO — DATA — CONTEXTO`.
- Proporção 16:9 é proibida. O tipo `ratio` não a inclui.

---

### TechnicalMark

```ts
interface TechnicalMarkProps {
  symbol: 'dimension' | 'level-mark' | 'north-arrow' | 'section-cut'
         | 'ground' | 'signal' | 'coordinate' | 'crop-mark'
         | 'cross-reference' | 'diameter' | 'summation';
  size?: 'small' | 'normal';
  color?: 'secondary' | 'primary' | 'active';
}
```

**Restrições:**
- Renderiza SVG inline importado de `src/icons/`.
- Construído sobre grid de 24×24px, traço de 2px (`stroke-width`).
- Cantos vivos: `stroke-linejoin: miter`, `stroke-linecap: square`.
- Sem preenchimento (`fill: none`), exceto hachuras.
- Nunca usar emoji ou ícone de biblioteca externa.

---

### CropMark

```ts
interface CropMarkProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
```

**Restrições:**
- Renderiza um L de 8px × 8px com traço de 1px.
- Cor: `var(--color-text-secondary)` (azul cobalto) ou `var(--color-text-primary)` (preto tinta).
- Posicionado absolutamente no canto do container pai.

---

### GridLine

```ts
interface GridLineProps {
  direction: 'horizontal' | 'vertical';
  style?: 'solid' | 'dashed';  // dashed para linhas de referência
}
```

**Restrições:**
- Material: aço. Cor derivada de `var(--color-surface-tecnico)`.
- Traço: 1px.
- Usado por `TechnicalLayout` para renderizar as linhas visíveis do grid.

---

## CAMADA B · COMPOSTOS

### SectionTitle

```ts
interface SectionTitleProps {
  label: string;
  prefix?: 'bracket' | 'section';  // [MANIFESTO] ou § MANIFESTO
}
```

**Restrições:**
- Renderiza `Text` (grotesk, headline, bold) para o label.
- `prefix: 'bracket'` → adiciona `TechnicalMark` (bracket) antes e depois.
- `prefix: 'section'` → prefixa com `§`.
- Sempre `as: 'h2'`.

---

### MetadataLine

```ts
interface MetadataLineProps {
  label: string;
  value: string;
  separator?: 'dot' | 'colon';  // · ou :
}
```

**Restrições:**
- `label` em `Text` (mono, small, weight: regular, color: secondary).
- `value` em `Text` (mono, small, weight: regular, color: primary).
- Separador padrão: `·` (middle dot) entre label e value.
- `separator: 'colon'` usado no About (ex: `NOME: valor`).

---

### ProjectMetadata

```ts
interface ProjectMetadataProps {
  date: string;            // "2024" ou "2024–2025"
  category: string;        // "BACKEND", "SISTEMAS", etc.
  technologies: string[];  // ["go", "postgres", "redis"]
  description?: string;    // Uma linha em serif italic
}
```

**Restrições:**
- Compõe 4 `MetadataLine` internos:
  1. `date` + `category` (separados por `·`).
  2. `technologies` unidos por `·`.
  3. `description` em `Text` (serif, small, italic) se presente.

---

### Quotation

```ts
interface QuotationProps {
  text: string;
  attribution: string;
  reference?: string;
}
```

**Restrições:**
- Fundo opcional: `Surface` (marble) — apenas se `reference` contiver
  autor clássico (Sêneca, Marco Aurélio, Epicteto).
- Estrutura: `Rule` (ink, horizontal, thin) → `Text` (serif, body, italic, color: primary) → `MetadataLine` (attribution + reference).
- Alinhamento à direita. Margem direita > esquerda.
- Atribuição: `Text` (mono, small, color: secondary).

---

### ContactLine

```ts
interface ContactLineProps {
  label: string;
  value: string;
  href?: string;
}
```

**Restrições:**
- Se `href` definido: renderiza `<a>` com `Text` (mono, small, color: primary).
- Se `href` ausente: renderiza `Text` (mono, small, color: primary) sem link.
- Prefixo: `TechnicalMark` (cross-reference) ao lado esquerdo.
- Hover: glitch no texto do valor (não no label).

---

### NavigationItem

```ts
interface NavigationItemProps {
  href: string;
  label: string;
  active?: boolean;
}
```

**Estados:**
| Estado | Comportamento |
|---|---|
| Default | `Text` (mono, small, tracking: expanded, color: primary) |
| Hover | Glitch — duração `--motion-hover`. Não afeta layout. |
| Focus | Bracket/cota mark visível (pseudoelemento `::before`). |
| Active | Linha horizontal abaixo (como cota de nível) + `aria-current="page"`. Cor: `var(--color-accent-annotation)`. |

**Restrições:**
- Nunca underline padrão de link.
- Nunca color change no hover — apenas glitch.
- Ilha Astro: `client:load` (precisa detectar URL ativa imediatamente).

---

### FilterBar

```ts
interface FilterBarProps {
  categories: string[];
  active: string;  // "TODOS" | "BACKEND" | ...
  onChange: (category: string) => void;
}
```

**Estados:**
| Estado | Comportamento |
|---|---|
| Default | Items renderizados como `Text` (mono, small, color: secondary) separados por `·`. |
| Active | `Text` (mono, small, weight: bold, color: primary) + linha horizontal abaixo (cota de nível). |
| Click | Disjuntor (snap) — `--motion-toggle`. Sem transição de saída dos projetos. |

**Restrições:**
- Nunca usar "pills", chips ou badges.
- Nunca animar a transição dos itens filtrados.
- Ilha Astro: `client:idle`.

---

### ProjectImage

```ts
interface ProjectImageProps {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}
```

**Restrições:**
- Sempre usa `treatment: 'blueprint'` (imagens de projeto são software).
- Sempre `ratio: '1:1'`.
- Renderiza `Image` + `CropMark[]` + legenda.
- Hover: overlay de scanner (banda horizontal) — implementado no `ProjectPreview`,
  não aqui.

---

## CAMADA C · SEÇÕES

### HeroSection

```ts
interface HeroSectionProps {
  name: string;
  descriptor: string;
}
```

**Estrutura:**
```
MonumentalLayout
  └── Surface (concrete-raw)
        ├── Text (grotesk, display, weight: bold, tracking: monumental)
        │     └── name
        └── Text (mono, small, color: secondary)
              └── descriptor
```

**Restrições:**
- `name` é o elemento `<h1>` da página.
- Altura: 100dvh (`MonumentalLayout`).
- Sem animação de entrada — o nome já está lá.
- Sem botão. Sem CTA. Sem imagem de fundo.
- Modo noturno: `name` em `color: inverse` (creme papel).
- Estático — zero JavaScript.

---

### ManifestoSection

```ts
interface ManifestoSectionProps {
  title: string;
  paragraphs: string[];
  annotations?: { text: string; position: number }[];  // posição = índice do parágrafo
  quotations?: QuotationProps[];
}
```

**Estrutura:**
```
EditorialLayout
  └── Surface (paper)
        ├── SectionTitle → "[MANIFESTO]" (prefix: bracket)
        ├── Text (serif, body) × N
        ├── anotações marginais: Text (mono, micro, color: secondary)
        └── Quotation[]
```

**Restrições:**
- Anotações marginais aparecem na margem esquerda (wide) ou como notas
  de rodapé (medium) ou são suprimidas (compact).
- Numeração dos parágrafos: `01.`, `02.`, etc. em `Text` (mono, micro, color: secondary).
- Estático — zero JavaScript.

---

### AboutSection

```ts
interface AboutSectionProps {
  fields: { label: string; value: string }[];
  supplementaryText?: string;
}
```

**Estrutura:**
```
EditorialLayout
  └── Surface (paper)
        ├── SectionTitle → "[SOBRE]" (prefix: bracket)
        ├── MetadataLine[] (separator: colon)
        └── Text (serif, body) → supplementaryText
```

**Restrições:**
- Formato de ficha técnica — labels em monospace cobalt, valores em serif.
- Moldura sutil (border) ao redor da ficha para separá-la do resto.
- Labels podem ter textura de carimbo (leve irregularidade na cor).
- Estático — zero JavaScript.

---

### ProjectsSection

```ts
interface ProjectsSectionProps {
  title: string;
  totalProjects: number;
  dateRange: string;      // "2020–2026"
  lastUpdated: string;    // "MM/AAAA"
  projects: ProjectData[];
  categories: string[];
}

interface ProjectData {
  id: string;
  title: string;
  date: string;
  category: string;
  technologies: string[];
  description?: string;
  image: { src: string; alt: string };
  featured?: boolean;
}
```

**Estrutura:**
```
TechnicalLayout
  └── Surface (concrete-polished)
        ├── SectionTitle → "[PROJETOS]"
        ├── MetadataLine → "N PROJETOS REGISTRADOS · 2020–2026 · ATUALIZADO EM MM/AAAA"
        ├── FilterBar
        └── Grid de ProjectPreview[]
```

**Estados:**
| Estado | Comportamento |
|---|---|
| Default | Grid 3 colunas (wide), 2 (medium), 1 (compact). Todos projetos visíveis. |
| Filtrado | Disjuntor — projetos não-matching removidos. Grid se recompacta. |
| Projeto expandido | Um projeto ocupa altura extra via trilho vertical. Demais mantêm posição. |

**Restrições:**
- Grid usa `display: grid` com `GridLine` visíveis entre células.
- Linhas de grid são elementos DOM, não bordas CSS — para que o glitch
  do hover possa afetá-las individualmente.
- Projetos ordenados por `order` field (cronologia inversa ou relevância).
- Nunca carrossel. Nunca lista vertical simples.

---

### ProjectPreview

```ts
interface ProjectPreviewProps {
  project: ProjectData;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
}
```

**Estados:**
| Estado | Comportamento |
|---|---|
| Default | Todos elementos visíveis. Informação nunca suprimida. |
| Hover | `GridLine` ao redor glitcha. `ProjectImage` recebe overlay scanner (banda horizontal). Título e metadados estáveis. |
| Focus (teclado) | `GridLine` espessa + bracket de cota na lateral esquerda. |
| Expanded | Trilho vertical revela detalhes completos. Vizinhos mantêm posição. |

**Restrições:**
- Nunca esconder metadados (Princípio 1: exposição estrutural).
- Nunca `scale` no hover.
- Nunca `box-shadow` no hover.
- Ilha Astro: `client:visible`.

---

### ContactSection

```ts
interface ContactSectionProps {
  contacts: ContactLineProps[];
  closingQuote?: string;
}
```

**Estrutura:**
```
Surface (concrete-polished)
  ├── SectionTitle → "[CONTATO]"
  ├── ContactLine[]
  └── Text (serif, small, italic, alinhado à direita) → closingQuote
```

**Restrições:**
- Nunca formulário de contato. Apenas links e texto.
- Links abrem externamente (`target="_blank"`) com `rel="noopener noreferrer"`.
- Clique em link: disjuntor — sem animação de saída.
- Estático (links são HTML nativo).

---

### ResidualSpace

```ts
interface ResidualSpaceProps {
  height?: 'normal' | 'compact';
}
```

**Restrições:**
- Renderiza `Surface` (concrete-raw) sem conteúdo.
- `height: 'normal'` = `var(--space-residual-height)`.
- `height: 'compact'` = metade do normal. Usado entre seções próximas
  (ex: Manifesto → About).
- Textura máxima — é o espaço de sentir o edifício.
- Estático — zero JavaScript.

---

### Footer

```ts
interface FooterProps {
  navLinks: NavigationItemProps[];
  portfolioName: string;
  date: string;
  version: string;
}
```

**Estrutura:**
```
Surface (concrete-polished)
  ├── Rule (horizontal, ink, thin)
  ├── NavigationItem[] (mono, micro)
  └── MetadataLine → "CONCRETO, MENTE E TRÓPICOS · MM/AAAA · VERSÃO N"
```

**Restrições:**
- Nunca fixo (sticky). Aparece ao final do scroll.
- Nunca "© 2024". Nunca "Made with ❤️".
- Links com mesmo comportamento de `NavigationItem` (glitch hover).
- Estático — zero JavaScript.
