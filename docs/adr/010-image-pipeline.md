# ADR-010 · Pipeline de imagens em build time

**Data:** 2026-07-12  
**Status:** Aceito

---

## Contexto

O design exige processamento obrigatório em todas as imagens:
duotone (Blueprint ou Calor), margem interna simulando papel
fotográfico, marcas de corte editoriais (crop marks) nos cantos
e legendas no formato `FIG. NN — descrição — data — contexto`.

Processar essas operações em runtime (canvas, CSS filters,
overlays) degradaria performance, consumiria recursos do
visitante e não alcançaria a fidelidade visual exigida pelo
design.

O portfólio é estático — as imagens não mudam após o build.

---

## Decisão

**Todo processamento de imagem ocorre em build time**, via scripts
Node.js usando a biblioteca `sharp`.

O pipeline:
1. Lê imagens originais de `src/assets/images/`.
2. Redimensiona para tamanhos responsivos (400w, 600w, 800w/1200w
   dependendo da proporção).
3. Aplica duotone (mapeamento tonal Blueprint ou Calor).
4. Adiciona margem interna de 6px na cor creme-papel.
5. Renderiza marcas de corte nos 4 cantos (SVG sobreposto via
   composição sharp).
6. Exporta em AVIF, WebP e PNG (fallback progressivo).
7. Escreve em `public/images/blueprint/` ou `public/images/calor/`.

Texturas de concreto e papel também são geradas em build time
(256×256px WebP tiles com ruído Perlin pré-renderizado).

---

## Justificativa

**Duotone de alta fidelidade:** O design especifica mapeamentos
tonais específicos para Blueprint (cobalto+preto) e Calor
(ferrugem+concreto). CSS filters (`hue-rotate`, `sepia`) não
conseguem replicar essas curvas com precisão. `sharp` oferece
controle exato sobre canais e curvas tonais.

**Crop marks vetoriais:** Marcas de corte precisam ser linhas
nítidas de 1px em qualquer resolução. Renderizá-las via CSS
(`::before`/`::after` com bordas) seria frágil e inconsistente
entre navegadores. `sharp` compõe SVG sobre a imagem — nítido
e idêntico em toda parte.

**Zero processamento em runtime:** O visitante recebe imagens
prontas. Sem JavaScript. Sem canvas. Sem CPU/GPU consumida.

**Cache eficiente:** Imagens processadas são versionadas e
imutáveis por build. O servidor pode usar `Cache-Control: max-age=31536000`.

---

## Alternativas rejeitadas

| Alternativa | Razão da rejeição |
|---|---|
| **Processamento em runtime (canvas JS)** | JavaScript obrigatório. Performance variável por dispositivo. Imagem original precisa ser carregada antes do processamento — visitante vê a imagem em cores naturais brevemente (flicker). |
| **CSS filters para duotone** | `filter: grayscale() sepia() hue-rotate()` não alcança as curvas tonais exatas do design. Resultado aproximado, não fiel. |
| **SVG filters para duotone** | `<feColorMatrix>` pode mapear cores, mas a sintaxe é complexa e frágil entre navegadores. Não funciona em imagens via `<img>` (precisa de `<foreignObject>` ou SVG inline). |
| **Serviço externo de processamento (Cloudinary, imgix)** | Dependência de serviço externo. Custo. Latência. O portfólio é estático — não justifica infraestrutura de processamento de imagem. |
| **Sem processamento — usar imagens em cores naturais** | Viola o design. `docs/design/11-photography.md` estabelece duotone como obrigatório. |

---

## Consequências

**Positivas:**
- Imagens perfeitas em todos os dispositivos — processadas uma vez,
  servidas estaticamente.
- Sem JavaScript para processamento de imagem.
- Cache agressivo possível (hash no nome do arquivo).
- Formatos modernos (AVIF) com fallback automático (WebP, PNG).

**Negativas:**
- Tempo de build aumenta proporcionalmente ao número de imagens.
  Mitigação: para <30 imagens (expectativa do portfólio), o
  impacto é <5 segundos. Texturas são geradas uma vez e versionadas.
- Dependência de build: `sharp` (~15MB, nativa).
  Mitigação: `sharp` é a biblioteca padrão para processamento de
  imagem em Node.js, mantida ativamente.

**Ações:**
- Script `scripts/process-images.ts` implementa o pipeline.
- Script `scripts/generate-textures.ts` gera concrete.webp e paper.webp.
- Scripts executados antes de `astro build` (`"build": "npm run build:images && astro build"`).
- Texturas versionadas no repositório (não regeneradas a cada build).

---

## Referências

- `docs/engineering/07-asset-pipeline.md` — especificação completa do pipeline.
- `docs/design/11-photography.md` — tratamento de imagem, duotone, crop marks.
- `docs/design/08-material-atmosphere.md` — texturas de concreto e papel.
- ADR-007 (SVG noise), ADR-008 (WebGL strategy).
