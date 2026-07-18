# 02 · ARQUITETURA DE COMPONENTES

> Origem: `docs/design/13-components/*.md`
> Origem: `docs/design/01-principles.md` (Princípio 1: Exposição estrutural, Princípio 6: Redução, não minimalismo)
> Origem: `docs/design/03-layout-rules.md`

---

## Princípio arquitetural

A arquitetura de componentes segue **composição sobre herança**.

Nenhum componente estende outro. Nenhum componente conhece detalhes
internos de outro. Componentes são compostos por slots e props — cada
camada é um recipiente que recebe a camada inferior, sem saber como
ela funciona internamente.

O resultado é uma árvore de dependências onde cada nível só conhece
o nível imediatamente abaixo.

---

## As cinco camadas

```
CAMADA E · PÁGINAS     → Orquestram layouts + seções
CAMADA D · LAYOUTS     → Definem grid, margens, espaçamento
CAMADA C · SEÇÕES      → Compõem primitivas + compostos
CAMADA B · COMPOSTOS   → Compõem primitivas em padrões
CAMADA A · PRIMITIVAS  → Elementos atômicos puros
```

### Regras de dependência

```
Páginas   ──→ Layouts ──→ Seções ──→ Compostos ──→ Primitivas
   │           │           │            │              │
   │           │           │            │              └── importam: nada
   │           │           │            └── importam: apenas primitivas
   │           │           └── importam: primitivas + compostos
   │           └── importam: apenas seções (via slots)
   └── importam: layouts + seções

Nenhuma seta aponta para cima. Nenhuma seta salta camadas.
```

---

## CAMADA A · PRIMITIVAS

Elementos atômicos. Não conhecem nenhuma outra camada. São funções
puras de props → markup.

### Catálogo

| Componente | Arquivo | Função |
|---|---|---|
| `Text` | `primitives/Text.astro` | Renderiza texto na voz, tamanho e peso corretos. |
| `Rule` | `primitives/Rule.astro` | Linha horizontal/vertical (material: aço ou tinta). |
| `Surface` | `primitives/Surface.astro` | Aplica material de fundo com textura. |
| `Image` | `primitives/Image.astro` | Wrapper de duotone + margem + crop marks + legenda. |
| `TechnicalMark` | `primitives/TechnicalMark.astro` | Símbolo iconográfico SVG inline. |
| `CropMark` | `primitives/CropMark.astro` | Marca de corte editorial nos cantos. |
| `GridLine` | `primitives/GridLine.astro` | Linha de grid visível (aço). |

### Regras

- Primitivas nunca importam outras primitivas.
- Primitivas nunca conhecem layout — sem margin/padding próprio.
  Espaçamento é injetado pelo consumidor (composto, seção ou layout).
- Primitivas nunca possuem estado — são funções puras.
- Primitivas nunca emitem eventos. Respondem apenas a props.

### Exemplo de contrato (Text)

```ts
interface TextProps {
  voice: 'grotesk' | 'serif' | 'mono';
  size?: 'display' | 'headline' | 'subhead' | 'body' | 'small' | 'micro';
  weight?: 'regular' | 'medium' | 'bold' | 'italic';
  tracking?: 'tight' | 'normal' | 'expanded' | 'monumental';
  leading?: 'tight' | 'normal' | 'relaxed';
  color?: 'primary' | 'secondary' | 'active' | 'inverse';
  as?: keyof HTMLElementTagNameMap;  // h1, h2, p, span...
  children: string;
}
```

---

## CAMADA B · COMPOSTOS

Compõem primitivas em padrões reutilizáveis. Conhecem apenas primitivas.

### Catálogo

| Componente | Arquivo | Primitivas usadas |
|---|---|---|
| `SectionTitle` | `compounds/SectionTitle.astro` | `Text` + `TechnicalMark` |
| `MetadataLine` | `compounds/MetadataLine.astro` | `Text` (mono, cobalt) + `Text` (mono, ink) |
| `ProjectMetadata` | `compounds/ProjectMetadata.astro` | `MetadataLine[]` |
| `Quotation` | `compounds/Quotation.astro` | `Rule` + `Text` (serif, italic) + `MetadataLine` |
| `ContactLine` | `compounds/ContactLine.astro` | `MetadataLine` + `TechnicalMark` |
| `NavigationItem` | `compounds/NavigationItem.astro` | `Text` (mono) + estados hover/focus/active |
| `FilterBar` | `compounds/FilterBar.astro` | `NavigationItem[]` |
| `ProjectImage` | `compounds/ProjectImage.astro` | `Image` + `CropMark[]` + `Text` (mono, caption) |

### Regras

- Compostos nunca importam outros compostos.
- Compostos nunca conhecem layout. São blocos autônomos.
- Compostos podem ter estado local (hover, focus, active, expanded).
- Compostos nunca emitem efeitos colaterais globais.
- Compostos são tipados com interfaces que expõem apenas dados,
  nunca implementação.

### Exemplo de contrato (Quotation)

```ts
interface QuotationProps {
  text: string;
  attribution: string;    // "Sêneca"
  reference?: string;     // "Cartas a Lucílio, Carta 33"
}
```

---

## CAMADA C · SEÇÕES

Compõem primitivas + compostos em uma seção completa. Conhecem a camada
de layout apenas via slots — nunca importam layouts diretamente.

### Catálogo

| Componente | Arquivo | Composição |
|---|---|---|
| `HeroSection` | `sections/HeroSection.astro` | `Surface`(concrete-raw) + `Text`(grotesk, display) + `Text`(mono, metadata) |
| `ManifestoSection` | `sections/ManifestoSection.astro` | `Surface`(paper) + `SectionTitle` + `Text`(serif, body) × N + `Quotation[]` |
| `AboutSection` | `sections/AboutSection.astro` | `Surface`(paper) + `SectionTitle` + `MetadataLine[]` + `Text`(serif) |
| `ProjectsSection` | `sections/ProjectsSection.astro` | `Surface`(concrete-polished) + `SectionTitle` + `FilterBar` + `ProjectPreview[]` |
| `ContactSection` | `sections/ContactSection.astro` | `Surface`(concrete-polished) + `SectionTitle` + `ContactLine[]` |
| `ResidualSpace` | `sections/ResidualSpace.astro` | `Surface`(concrete-raw) — sem conteúdo |
| `Footer` | `sections/Footer.astro` | `Surface`(concrete-polished) + `NavigationItem[]` + `MetadataLine` + `Rule` |

### Regras

- Seções nunca importam outras seções.
- Seções nunca definem grid ou margens — preenchem slots de layout.
- Seções podem ter estado local com escopo de seção.
- Seções recebem dados como props — nunca buscam dados diretamente.

---

## CAMADA D · LAYOUTS

Definem grid, margens e espaçamento. Recebem seções via slots.
Não conhecem primitivas nem compostos.

### Catálogo

| Componente | Arquivo | Função |
|---|---|---|
| `PortfolioLayout` | `layout/PortfolioLayout.astro` | Dispõe seções verticalmente, insere `ResidualSpace` entre elas. Slot: `sections[]`. |
| `EditorialLayout` | `layout/EditorialLayout.astro` | Aplica margens editoriais + coluna de texto 60-70%. Slot: conteúdo. |
| `TechnicalLayout` | `layout/TechnicalLayout.astro` | Aplica grid de 12 colunas com `GridLine` visíveis. Slot: conteúdo. |
| `MonumentalLayout` | `layout/MonumentalLayout.astro` | 100dvh, margens monumentais. Slot: conteúdo. |

### Regras

- Layouts nunca importam primitivas ou compostos.
- Layouts nunca possuem estado ou lógica de negócio.
- Layouts são pura apresentação estrutural.
- Layouts usam `display: grid` ou `display: flex` apenas para dispor slots.
- Layouts aplicam tokens de espaçamento (`--space-margin-*`).

---

## CAMADA E · PÁGINAS

Orquestram layouts + seções. Única camada que conhece a ordem narrativa.

### Catálogo

| Página | Arquivo | Composição |
|---|---|---|
| `Index` | `pages/index.astro` | `PortfolioLayout` { HeroSection → ManifestoSection → AboutSection → ProjectsSection → ContactSection → Footer } |

### Regras

- Páginas são o ponto de entrada do roteamento do Astro.
- Páginas compõem a ordem narrativa — a sequência das seções conta a história.
- Páginas não contêm markup além da composição de layout + seções.
- Páginas podem importar dados de coleções (Content Collections).

---

## Árvore de dependências completa

```
pages/index.astro
  └── PortfolioLayout
        ├── MonumentalLayout
        │     └── HeroSection
        │           ├── Surface
        │           ├── Text (grotesk, display, monumental)
        │           └── Text (mono, small, secondary)
        ├── ResidualSpace
        │     └── Surface (concrete-raw)
        ├── EditorialLayout
        │     ├── ManifestoSection
        │     │     ├── Surface (paper)
        │     │     ├── SectionTitle → Text + TechnicalMark
        │     │     ├── Text (serif, body) × N
        │     │     └── Quotation[] → Rule + Text + MetadataLine
        │     └── AboutSection
        │           ├── Surface (paper)
        │           ├── SectionTitle
        │           ├── MetadataLine[] → Text + Text
        │           └── Text (serif)
        ├── ResidualSpace
        │     └── Surface (concrete-raw)
        ├── TechnicalLayout
        │     └── ProjectsSection
        │           ├── Surface (concrete-polished)
        │           ├── SectionTitle
        │           ├── FilterBar → NavigationItem[]
        │           └── ProjectPreview[] → ProjectImage + ProjectMetadata
        ├── ResidualSpace
        │     └── Surface (concrete-raw)
        ├── ContactSection
        │     ├── Surface (concrete-polished)
        │     ├── SectionTitle
        │     └── ContactLine[] → MetadataLine + TechnicalMark
        └── Footer
              ├── Surface (concrete-polished)
              ├── NavigationItem[]
              ├── MetadataLine
              └── Rule
```

---

## Diretórios

```
src/
├── components/
│   ├── primitives/
│   │   ├── Text.astro
│   │   ├── Rule.astro
│   │   ├── Surface.astro
│   │   ├── Image.astro
│   │   ├── TechnicalMark.astro
│   │   ├── CropMark.astro
│   │   └── GridLine.astro
│   ├── compounds/
│   │   ├── SectionTitle.astro
│   │   ├── MetadataLine.astro
│   │   ├── ProjectMetadata.astro
│   │   ├── Quotation.astro
│   │   ├── ContactLine.astro
│   │   ├── NavigationItem.astro
│   │   ├── FilterBar.astro
│   │   └── ProjectImage.astro
│   ├── sections/
│   │   ├── HeroSection.astro
│   │   ├── ManifestoSection.astro
│   │   ├── AboutSection.astro
│   │   ├── ProjectsSection.astro
│   │   ├── ContactSection.astro
│   │   ├── ResidualSpace.astro
│   │   └── Footer.astro
│   └── layout/
│       ├── PortfolioLayout.astro
│       ├── EditorialLayout.astro
│       ├── TechnicalLayout.astro
│       └── MonumentalLayout.astro
```

---

## Ilhas e hidratação (Astro Islands)

Componentes que precisam de JavaScript são marcados como islands
com hidratação seletiva:

| Componente | Diretiva | Justificativa |
|---|---|---|
| `NavigationItem` | `client:load` | Scroll spy + glitch hover. Precisa de JS imediato para não perder o estado da URL. |
| `ProjectPreview` | `client:visible` | Glitch hover + scanner overlay + trilho expand. Só ativa quando o grid de projetos entra na viewport. |
| `FilterBar` | `client:idle` | Disjuntor snap. Baixa prioridade — só ativa quando o thread principal está ocioso. |
| Todos os outros | — (estático) | Zero JavaScript enviado. |

---

## Regras de borda de componente

1. **Props, nunca contexto global.** Componentes recebem tudo via props.
   Exceção: tokens CSS são herdados via cascata (custom properties) — isso
   é design intencional da plataforma, não violação de encapsulamento.

2. **Slots para composição, não children.** Layouts usam slots nomeados
   para receber seções. Seções usam slots para receber conteúdo opcional.

3. **Tipagem exportada.** Todo componente exporta sua interface de props
   para consumo por outros componentes e verificação estática.

4. **CSS escopado.** Todo componente usa CSS Modules (`.module.css`).
   Nenhum estilo vaza para fora do componente.
