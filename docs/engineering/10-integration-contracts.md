# 10 · CONTRATOS DE INTEGRAÇÃO

> Origem: `docs/design/22-storytelling.md`
> Origem: `docs/design/13-components/*.md`

---

## Estrutura de páginas

O portfolio é uma única página. A ordem narrativa é fixa e imutável:

```
/ (index.astro)
  └── PortfolioLayout
        ├── Navigation
        ├── HeroSection
        ├── ResidualSpace (compact)
        ├── ManifestoSection
        ├── ResidualSpace (compact)
        ├── AboutSection
        ├── ResidualSpace
        ├── ProjectsSection
        ├── ResidualSpace
        ├── ContactSection
        └── Footer
```

`ResidualSpace` entre Manifesto e About é `compact` (metade da altura)
porque as duas seções compartilham o mesmo espaço editorial — a pausa
é breve.

---

## Coleções de dados (Astro Content Collections)

### Estrutura de diretórios

```
src/content/
├── config.ts              # Schemas Zod + definição das coleções
├── manifesto.md           # Texto do manifesto
├── about.md               # Dados do About
└── projects/
    ├── 001-sistema-xyz.md
    ├── 002-compilador-c.md
    └── ...
```

### Schema de projeto

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectSchema = z.object({
  title: z.string(),
  date: z.string(),           // "2024" ou "2024–2025"
  category: z.enum([
    'BACKEND',
    'SISTEMAS',
    'FERRAMENTAS',
    'COMPILADORES',
    'DADOS',
    'PESQUISA',
  ]),
  technologies: z.array(z.string()),
  description: z.string().optional(),
  image: z.object({
    src: z.string(),          // Caminho para a imagem original em src/assets/images/
    alt: z.string(),          // "FIG. NN — descrição — data — contexto"
  }),
  featured: z.boolean().default(false),
  order: z.number(),          // Ordem de exibição (cronologia inversa: 2024=1, 2023=2...)
});

const projects = defineCollection({
  type: 'content',
  schema: projectSchema,
});

export const collections = { projects };
```

### Exemplo de arquivo de projeto

```md
---
# src/content/projects/001-sistema-orion.md
title: "SISTEMA DE ROTEAMENTO DISTRIBUÍDO"
date: "2024"
category: "BACKEND"
technologies: ["go", "postgres", "redis", "grpc"]
description: "Motor de roteamento com consistência eventual e failover automático."
image:
  src: "../../assets/images/projetos/orion-architecture.png"
  alt: "FIG. 01 — Diagrama de arquitetura do sistema Orion mostrando três nós conectados via gRPC com PostgreSQL como storage compartilhado — 2024 — Projeto Orion"
featured: true
order: 1
---

<!-- Conteúdo markdown opcional para a página de detalhe -->
```

### Conteúdo do manifesto

```md
---
# src/content/manifesto.md
title: "MANIFESTO"
---

Engenharia é a consequência material da filosofia.

Cada sistema que construo é uma tese verificável.
...
```

### Conteúdo do About

A estrutura de dados do About não usa Content Collections (são dados
estruturados, não markdown). Definido como um arquivo de dados:

```ts
// src/data/about.ts
export interface AboutData {
  fields: { label: string; value: string }[];
  supplementaryText: string;
}

export const aboutData: AboutData = {
  fields: [
    { label: 'NOME', value: '[Nome completo]' },
    { label: 'FORMAÇÃO', value: '[Curso], [Instituição], [Ano]' },
    { label: 'ÁREA', value: 'Sistemas distribuídos e engenharia de dados' },
    { label: 'LOCALIZAÇÃO', value: 'São Paulo, Brasil' },
    { label: 'LINGUAGENS', value: 'go · python · c · rust · typescript' },
  ],
  supplementaryText: 'Texto complementar sobre formação do pensamento...',
};
```

---

## Página principal (index.astro)

```astro
---
// src/pages/index.astro
import PortfolioLayout from '../components/layout/PortfolioLayout.astro';
import Navigation from '../components/compounds/NavigationItem.astro'; // renderizado pelo layout
import HeroSection from '../components/sections/HeroSection.astro';
import ManifestoSection from '../components/sections/ManifestoSection.astro';
import AboutSection from '../components/sections/AboutSection.astro';
import ProjectsSection from '../components/sections/ProjectsSection.astro';
import ContactSection from '../components/sections/ContactSection.astro';
import ResidualSpace from '../components/sections/ResidualSpace.astro';
import Footer from '../components/sections/Footer.astro';

import { getCollection } from 'astro:content';
import { aboutData } from '../data/about';

const projects = await getCollection('projects');
const sortedProjects = projects
  .map(p => ({ ...p.data, id: p.id }))
  .sort((a, b) => a.order - b.order);

const categories = ['TODOS', ...new Set(sortedProjects.map(p => p.category))];

const navLinks = [
  { href: '/#manifesto', label: 'MANIFESTO' },
  { href: '/#sobre',     label: 'SOBRE' },
  { href: '/#projetos',  label: 'PROJETOS' },
  { href: '/#contato',   label: 'CONTATO' },
];

const footerMeta = {
  portfolioName: 'CONCRETO, MENTE E TRÓPICOS',
  date: 'MM/AAAA',
  version: '1.0',
};
---

<PortfolioLayout navLinks={navLinks} footerMeta={footerMeta}>
  <HeroSection
    name="CONCRETO, MENTE E TRÓPICOS"
    descriptor="engenharia de software"
    slot="sections"
  />

  <ResidualSpace height="compact" slot="sections" />

  <ManifestoSection
    title="MANIFESTO"
    paragraphs={window.manifestoParagraphs}
    quotations={window.manifestoQuotations}
    slot="sections"
  />

  <ResidualSpace height="compact" slot="sections" />

  <AboutSection
    fields={aboutData.fields}
    supplementaryText={aboutData.supplementaryText}
    slot="sections"
  />

  <ResidualSpace slot="sections" />

  <ProjectsSection
    title="PROJETOS"
    totalProjects={sortedProjects.length}
    dateRange="2020–2026"
    lastUpdated="MM/AAAA"
    projects={sortedProjects}
    categories={categories}
    slot="sections"
  />

  <ResidualSpace slot="sections" />

  <ContactSection
    contacts={[
      { label: 'EMAIL', value: 'email@dominio.com', href: 'mailto:email@dominio.com' },
      { label: 'GITHUB', value: 'github.com/usuario', href: 'https://github.com/usuario' },
      { label: 'LINKEDIN', value: 'linkedin.com/in/usuario', href: 'https://linkedin.com/in/usuario' },
      { label: 'LOCALIZAÇÃO', value: 'São Paulo, Brasil' },
    ]}
    closingQuote="A engenharia é a consequência material da filosofia."
    slot="sections"
  />
</PortfolioLayout>
```

---

## PortfolioLayout

```astro
---
// src/components/layout/PortfolioLayout.astro
import '../styles/tokens.css';
import '../styles/reset.css';
import '../styles/fonts.css';
import '../styles/noise.css';
import '../styles/layout.css';

import Navigation from '../compounds/NavigationItem.astro';
import Footer from '../sections/Footer.astro';
import NoiseSVG from '../styles/noise.svg?raw';

interface Props {
  navLinks: { href: string; label: string }[];
  footerMeta: { portfolioName: string; date: string; version: string };
}
---

<!-- O HTML é gerado uma vez no build — é estático. Zero JS de framework. -->
```

O layout injeta:
1. Tokens, reset, fontes, noise CSS globais.
2. SVG de filtros inline no `<body>`.
3. Navegação fixa no topo.
4. Footer ao final.
5. Slots de seção entre navegação e footer.

---

## Estados globais

### Tema (diurno/noturno)

```ts
// src/utils/theme.ts
// Ver 04-css-architecture.md para implementação completa.
// Exposto como custom property data-theme no <html>.
// Toggle: botão oculto no Hero ou Footer (implementação futura).
```

### Nível de textura

```ts
// src/utils/texture-detector.ts
// Ver 07-asset-pipeline.md para implementação completa.
// Exposto como custom property --texture-level no <html>.
// Lido por Surface para decidir nível de textura.
```

### Redução de movimento

```css
/* Definido em tokens.css, camada STATE */
/* Sem JS necessário — CSS media query em custom properties */
```

---

## Scripts de build

### package.json (scripts relevantes)

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "npm run build:fonts && npm run build:textures && npm run build:images && astro build",
    "build:fonts": "tsx scripts/build-fonts.ts",
    "build:textures": "tsx scripts/generate-textures.ts",
    "build:images": "tsx scripts/process-images.ts",
    "check:contrast": "tsx scripts/check-contrast.ts",
    "check:a11y": "tsx scripts/check-a11y.ts",
    "lint:css": "stylelint 'src/**/*.css'",
    "lint": "npm run lint:css && npm run check:contrast"
  }
}
```

---

## Dependências

### Produção

```json
{
  "dependencies": {
    "astro": "^5.0.0"
  }
}
```

Sem dependências de runtime além do Astro. Sem React, Vue, Svelte.

### Build

```json
{
  "devDependencies": {
    "sharp": "^0.33.0",
    "stylelint": "^16.0.0",
    "typescript": "^5.5.0"
  }
}
```

- `sharp`: processamento de imagens (duotone, crop marks, redimensionamento).
- `stylelint`: enforcement das regras CSS banidas.
- `typescript`: type-checking dos contratos de componente.

### Proibido

- Tailwind CSS (ver ADR-002).
- Qualquer biblioteca de componentes UI (Radix, shadcn, Headless UI, etc.).
- Qualquer biblioteca de animação (Framer Motion, GSAP, anime.js).
- Qualquer framework adicional (React, Vue, Svelte).
- Qualquer biblioteca de ícones (Lucide, Phosphor, Heroicons, etc.).
