# ADR-011 · Carregamento de fontes

**Data:** 2026-07-12  
**Status:** Aceito

---

## Contexto

O design define três famílias tipográficas (IBM Plex Mono,
Source Serif 4, Space Grotesk) totalizando 7 arquivos woff2
e ~215KB após subsetting. As fontes são parte fundamental da
identidade — sem elas, o portfolio perde as três vozes
(monoespaçada técnica, serif editorial, grotesk industrial).

Precisamos decidir:
- Auto-hospedar ou usar CDN (Google Fonts)?
- Estratégia de `font-display` para evitar FOIT/FOUT.
- Subsetting ou fontes completas?
- Preload para a fonte do Hero?
- Fallback stack para cada voz?

---

## Decisão

**Auto-hospedagem** das fontes em `public/fonts/`. Nenhuma
dependência de CDN externo.

**`font-display: swap`** para todas as fontes. O texto aparece
imediatamente na fonte de fallback e é substituído quando a
fonte web carrega (FOUT controlado, sem FOIT).

**Subsetting** para latim básico + diacríticos portugueses
(ç, ã, õ, ê, é, á, í, ó, ú, â, ô, à) + símbolos técnicos e
editoriais (¶, §, †, ‡, →, ·, ⌀, ∑, ∫, √).

**Preload** apenas da Space Grotesk Bold (usada no Hero, above
the fold, elemento mais crítico da página). Demais fontes
carregam via `@font-face` normais com `font-display: swap`.

**Fallback stack explícita** por voz, definida em
`--foundation-font-mono`, `--foundation-font-serif` e
`--foundation-font-grotesk`:

```css
--foundation-font-mono:    'IBM Plex Mono', 'Courier New', monospace;
--foundation-font-serif:   'Source Serif 4', 'Georgia', serif;
--foundation-font-grotesk: 'Space Grotesk', 'Helvetica Neue', sans-serif;
```

---

## Justificativa

**Auto-hospedagem sobre CDN:**
- Sem dependência externa. O site funciona offline (após primeiro
  carregamento).
- Sem latência de DNS para `fonts.googleapis.com`.
- Sem tracking (Google Fonts coleta dados de requisição).
- Controle total sobre subsetting e formato (apenas woff2 —
  Google Fonts serve woff2 + truetype, o dobro do tamanho).

**`font-display: swap` sobre `block`:**
- `block` causa FOIT (texto invisível por até 3s). Inaceitável
  para o Hero — o nome do portfólio é a primeira coisa que o
  visitante vê.
- `optional` pode nunca carregar a fonte em conexões lentas —
  perderia a identidade visual permanentemente naquela sessão.
- `swap` oferece o melhor compromisso: texto visível imediatamente
  na fallback, substituído quando a fonte carrega.

**Subsetting sobre fontes completas:**
- Fontes completas (todos os caracteres Unicode) somam >500KB.
  Subsetting para latim + português + símbolos reduz para ~215KB.
- O conteúdo do portfólio é em português com termos técnicos em
  inglês — não há necessidade de cirílico, grego, CJK, etc.
- Subsetting via script automatizado (`scripts/build-fonts.ts`)
  garante reprodutibilidade.

**Preload seletivo sobre preload total:**
- Preload de todas as 7 fontes congestionaria a largura de banda
  inicial e atrasaria o carregamento de conteúdo visível.
- Apenas o Hero (Space Grotesk Bold) é above the fold e compõe
  o primeiro impacto visual. As demais fontes carregam em paralelo
  enquanto o visitante lê o Hero e o Manifesto.

---

## Alternativas rejeitadas

| Alternativa | Razão da rejeição |
|---|---|
| **Google Fonts CDN** | Dependência externa. Latência de DNS. Tracking de usuários. Sem controle sobre formato (serve woff2 + truetype juntos). |
| **`font-display: block`** | FOIT — texto invisível. O Hero sem fonte é inaceitável. |
| **`font-display: optional`** | Fonte pode nunca carregar em conexões lentas. A identidade tipográfica é perdida permanentemente para aquela sessão. |
| **Fontes completas (sem subset)** | >500KB para 7 arquivos. Inaceitável para performance. |
| **Preload de todas as fontes** | 7 preloads congestionam a largura de banda inicial. Atrasam LCP (Largest Contentful Paint) do Hero. |
| **Fontes como dependência npm (`@fontsource/*`)** | Adiciona dependência desnecessária. Fontes não são código — são assets estáticos. |

---

## Consequências

**Positivas:**
- Sem dependência externa para fontes.
- Cache eficiente: fontes são imutáveis por versão (`Cache-Control: max-age=31536000`).
- FOUT controlado: fallback stack próxima da fonte final (métricas
  similares) minimiza deslocamento de layout.
- Preload do Hero garante que o nome nunca aparece em fallback.
- Script de subsetting automatizado — reprodutível, versionável.

**Negativas:**
- Subsetting requer manutenção: se novo conteúdo usar caracteres
  não incluídos, a fonte exibirá fallback para esses caracteres.
  Mitigação: cobrir todos os caracteres do conteúdo conhecido +
  folga para diacríticos portugueses.
- FOUT visual: o visitante vê a fonte de fallback por ~200–500ms
  até a fonte web carregar. Mitigação: fallback stack com métricas
  próximas (Courier New ≈ IBM Plex Mono, Georgia ≈ Source Serif 4).

**Ações:**
- Script `scripts/build-fonts.ts` baixa fontes oficiais e aplica subset.
- `<link rel="preload">` para Space Grotesk Bold no `<head>`.
- `src/styles/fonts.css` com `@font-face` declarations.
- `--foundation-font-*` tokens com fallback stack explícita.

---

## Referências

- `docs/engineering/07-asset-pipeline.md` — build de fontes e subsetting.
- `docs/engineering/04-css-architecture.md` — @font-face declarations.
- `docs/engineering/01-design-tokens.md` — tokens de família tipográfica.
- `docs/design/06-typographic-character.md` — vozes tipográficas.
- ADR-012 (sistema tipográfico).
