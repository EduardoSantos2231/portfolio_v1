# 07 · PIPELINE DE ASSETS

> Origem: `docs/design/11-photography.md`
> Origem: `docs/design/08-material-atmosphere.md`
> Origem: `docs/design/10-iconography.md`
> Origem: `docs/design/06-typographic-character.md`

---

## Estratégia progressiva de texturas

```
NÍVEL 0: Cores planas     → baseline (qualquer dispositivo)
NÍVEL 1: Filtros SVG      → enhanced (viewport ≥ 400px, sem save-data)
NÍVEL 2: Texturas WebP    → enhanced+ (viewport ≥ 400px, sem save-data, conexão não lenta)
```

### Detecção de capacidade

```ts
// src/utils/texture-detector.ts
export function getTextureLevel(): 0 | 1 | 2 {
  if (typeof window === 'undefined') return 0;

  if (window.matchMedia('(prefers-reduced-data: reduce)').matches) return 0;
  if (window.matchMedia('(prefers-contrast: high)').matches) return 0;
  if (window.matchMedia('(forced-colors: active)').matches) return 0;

  const width = window.innerWidth;
  if (width < 400) return 0;

  const connection = (navigator as any).connection;
  const isSlow = connection?.effectiveType === 'slow-2g'
              || connection?.effectiveType === '2g'
              || connection?.saveData === true;
  if (isSlow) return 1;

  return 2;
}
```

O resultado é armazenado em `--texture-level` no `:root` e consumido
por `Surface` para decidir qual técnica aplicar.

---

## Geração de texturas

### Concreto (Nível 2 — WebP tile)

**Ferramenta:** Script de build (`scripts/generate-textures.ts`) usando
`sharp` ou ferramenta equivalente.

**Especificação:**
- Tile 256×256px, WebP, qualidade 60%.
- Ruído Perlin de baixa frequência (2–3 oitavas) gerando variação tonal
  entre `#D4CFC8` (concreto claro) e `#C8C2BA` (variação sutil).
- Marcas de fôrma: 3–5 linhas horizontais ou verticais com leve
  deslocamento (simula veios de madeira).
- Porosidade: pontos escuros de 1–3px com opacidade 5–10%,
  distribuídos irregularmente.
- Tamanho máximo: 8KB.

**Output:** `public/textures/concrete.webp`

### Papel (Nível 2 — WebP tile)

**Especificação:**
- Tile 256×256px, WebP, qualidade 60%.
- Fibras direcionais: linhas finas (1px) predominantemente horizontais,
  com variação angular de ±15°.
- Impurezas: 50–100 pontos escuros de 1px com opacidade 3–5%.
- Variação tonal sutil: centro `#F5F0E8`, bordas do tile levemente
  mais escuras (simula envelhecimento).
- Tamanho máximo: 6KB.

**Output:** `public/textures/paper.webp`

### Grain (Nível 1 — SVG filter, compartilhado)

Já especificado em `04-css-architecture.md`. O SVG é inline no HTML —
zero requisições extras.

### Carimbo (Nível 1 — SVG filter)

Já especificado em `04-css-architecture.md` (`#stamp-rough`).
Aplicado via `filter: url(#stamp-rough)`.

---

## Pipeline de imagens

### Processamento em build

As imagens originais (fotos, screenshots) são processadas via script
de build (`scripts/process-images.ts`) que gera as versões finais.

**Passos do pipeline:**

```
1. Ler imagem original de src/assets/images/
2. Redimensionar para tamanhos responsivos (proporção fixa)
3. Aplicar duotone (BluePrint ou Calor)
4. Adicionar margem interna (6px, cor creme-papel)
5. Adicionar marcas de corte nos cantos
6. Exportar em AVIF + WebP + PNG (fallback)
7. Gerar metadados (largura, altura, proporção) para o componente Image
```

### Tamanhos gerados

| Proporção | Larguras |
|---|---|
| 1:1 | 400px, 600px, 800px |
| 4:3 | 600px, 900px, 1200px |
| 3:2 | 600px, 900px, 1200px |

### Duotone Blueprint

**Mapeamento tonal:**
```
Original RGB → Blueprint colorspace

Luminância (0.299R + 0.587G + 0.114B) → mapeia para:

  0% (preto)     → #1A1817 (ink-black)
  25%             → #1D405E (cobalt-blue-muted)
  50%             → #2A5C8A (cobalt-blue)
  75%             → #4A7DB0 (cobalt-blue claro — fundo blueprint)
  100% (branco)   → #D4CFC8 (concrete-light — papel do blueprint)

Canal azul é preservado para dar a sensação de cianotipia.
Canais R e G são mixados para a tonalidade azul-cobalto.
```

**Implementação (sharp):**
```ts
// Pseudocódigo do pipeline — implementação real usa sharp
async function applyBlueprint(input: Sharp): Promise<Sharp> {
  return input
    .grayscale()
    .tint({
      r: 42,   // cobalt-blue R
      g: 92,   // cobalt-blue G
      b: 138,  // cobalt-blue B
    })
    .linear(1.2, -0.1);  // Aumenta contraste, escurece levemente
}
```

### Duotone Calor

**Mapeamento tonal:**
```
Luminância → mapeia para:

  0% (preto)     → #5C2A18 (rust-orange escuro)
  25%             → #8A4228 (rust-orange médio)
  50%             → #B85C38 (rust-orange)
  75%             → #C8B8A8 (concrete-light + rust)
  100% (branco)   → #D4CFC8 (concrete-light)
```

**Implementação (sharp):**
```ts
async function applyCalor(input: Sharp): Promise<Sharp> {
  return input
    .grayscale()
    .tint({
      r: 184,  // rust-orange R
      g: 92,   // rust-orange G
      b: 56,   // rust-orange B
    })
    .linear(1.1, 0);  // Contraste moderado (calor é suave)
}
```

---

## Margem interna e marcas de corte

Adicionadas programaticamente no pipeline como parte da imagem processada:

```
+-----------------------------+
| ┌                         ┐ |
| │                           │
| │     [IMAGEM DUOTONE]     │  ← 6px de margem creme-papel
| │                           │
| └                         ┘ |
+-----------------------------+
  ┌ ┐                     ┌ ┐   ← Crop marks nos 4 cantos
```

---

## Fontes

### Build de fontes

**Ferramenta:** Script `scripts/build-fonts.ts`.

**Passos:**
1. Baixar fontes do Google Fonts ou repositório oficial (todas SIL OFL).
2. Subsetting: apenas caracteres latinos (incluindo diacríticos portugueses:
   ç, ã, õ, ê, é, á, í, ó, ú, â, ô, à) + símbolos de engenharia e editoriais
   (¶, §, †, ‡, →, ·, ⌀, ∑, ∫, √).
3. Formato: woff2 (primário). Sem fallback woff (woff2 cobre 97%+ dos browsers).

### Arquivos gerados

```
public/fonts/
├── ibm-plex-mono-regular.woff2    (~35KB subsetted)
├── ibm-plex-mono-bold.woff2       (~35KB)
├── source-serif-4-regular.woff2   (~30KB)
├── source-serif-4-italic.woff2    (~35KB)
├── source-serif-4-bold.woff2      (~30KB)
├── space-grotesk-medium.woff2     (~25KB)
└── space-grotesk-bold.woff2       (~25KB)

Total: ~215KB (com subsetting, sem compressão adicional do servidor)
```

---

## Marcas técnicas (ícones)

### Construção

- Grid: 24×24px.
- Traço: 2px, `stroke-linejoin: miter`, `stroke-linecap: square`.
- Cor: `currentColor` (herda do contexto).
- Sem preenchimento (`fill: none`), exceto hachuras (padrões `<pattern>`).
- Arquivos individuais em `src/icons/`.

### Catálogo

| Arquivo | Símbolo | Origem no design |
|---|---|---|
| `dimension.svg` | Cota arquitetônica (linha + traços) | Desenho técnico |
| `level-mark.svg` | Triângulo + linha horizontal (nível) | Arquitetura |
| `north-arrow.svg` | Rosa dos ventos simplificada | Cartografia |
| `section-cut.svg` | Seta de corte (traço + seta) | Engenharia |
| `ground.svg` | Símbolo de terra (GND) | Elétrica |
| `signal.svg` | Onda senoidal | Elétrica |
| `coordinate.svg` | Latitude/longitude | Cartografia |
| `crop-mark.svg` | Marca de corte editorial | Editorial |
| `cross-reference.svg` | Seta de referência cruzada | Editorial |
| `diameter.svg` | ⌀ (diâmetro) | Engenharia |
| `summation.svg` | ∑ (somatório) | Matemática |

### Carregamento

Ícones são carregados como SVG inline via `import` no Astro:

```astro
---
import DimIcon from '../icons/dimension.svg?raw';
---

<TechnicalMark symbol="dimension" />
```

Dentro de `TechnicalMark.astro`:
```astro
---
const icons = {
  dimension: (await import('../icons/dimension.svg?raw')).default,
  // ...
};
---

<span class="technical-mark" set:html={icons[symbol]} />
```

Isso evita requisições HTTP extras e permite `currentColor`.

---

## Áudio

Não há áudio neste projeto. Nenhum som de clique, hover, transição
ou atmosfera.

---

## Estrutura de diretórios de assets

```
public/
├── fonts/                  # woff2 subsetted
│   ├── ibm-plex-mono-regular.woff2
│   ├── ibm-plex-mono-bold.woff2
│   ├── source-serif-4-regular.woff2
│   ├── source-serif-4-italic.woff2
│   ├── source-serif-4-bold.woff2
│   ├── space-grotesk-medium.woff2
│   └── space-grotesk-bold.woff2
│
├── textures/               # WebP tiles (nível 2)
│   ├── concrete.webp
│   └── paper.webp
│
└── images/                 # Imagens processadas (build output)
    ├── blueprint/          # Duotone Blueprint
    │   ├── projeto-01-400w.avif
    │   ├── projeto-01-400w.webp
    │   ├── projeto-01-600w.avif
    │   └── ...
    └── calor/              # Duotone Calor
        └── ...

src/
├── icons/                  # SVG inline (marcas técnicas)
│   ├── dimension.svg
│   ├── level-mark.svg
│   └── ...
│
├── assets/
│   └── images/             # Originais (não processadas) — fonte do pipeline
│       ├── projetos/
│       └── contexto/
│
├── scripts/
│   ├── generate-textures.ts  # Gera concrete.webp e paper.webp
│   ├── process-images.ts     # Pipeline de duotone + crop marks
│   └── build-fonts.ts        # Download + subset de fontes
│
└── styles/
    ├── noise.css             # Filtros SVG + texturas CSS
    ├── fonts.css             # @font-face
    └── tokens.css            # Custom properties
```
