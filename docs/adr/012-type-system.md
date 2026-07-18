# ADR-012 · Sistema tipográfico

**Data:** 2026-07-12  
**Status:** Aceito

---

## Contexto

O design define três vozes tipográficas (`docs/design/06-typographic-character.md`):
monoespaçada técnica, serif editorial e grotesk industrial. Cada voz
possui uma origem simbólica, uma função comunicativa e restrições de
uso específicas.

A engenharia precisa traduzir essas vozes em famílias tipográficas
concretas, considerando: fidelidade estética ao design, licença de
uso, desempenho de carregamento, cobertura de caracteres para conteúdo
em português com termos técnicos em inglês, e viabilidade de
auto-hospedagem.

---

## Decisão

| Voz | Família | Fundição | Pesos | Licença |
|---|---|---|---|---|
| Monoespaçada | **IBM Plex Mono** | IBM | Regular (400), Bold (700) | SIL OFL 1.1 |
| Serif | **Source Serif 4** | Adobe Originals | Regular (400), Italic (400), Bold (700) | SIL OFL 1.1 |
| Grotesk | **Space Grotesk** | Florian Karsten | Medium (500), Bold (700) | SIL OFL 1.1 |

**Total: 7 arquivos woff2, ~215KB após subsetting.**

---

## Critérios de seleção

Cada família foi avaliada em 5 critérios, nesta ordem de prioridade:

1. **Fidelidade estética.** A fonte deve personificar a voz que o
   design define. Não basta ser "uma monoespaçada" — precisa ser
   a monoespaçada que respira engenharia.
2. **Licença.** Deve permitir auto-hospedagem, subsetting, modificação
   e distribuição. SIL OFL 1.1 é o padrão-ouro.
3. **Cobertura de caracteres.** Deve incluir latim estendido com
   todos os diacríticos portugueses (ç, ã, õ, ê, é, á, í, ó, ú, â,
   ô, à, ü) e símbolos técnicos/editoriais (¶, §, †, ‡, →, ·, ⌀, ∑,
   ∫, √).
4. **Desempenho.** Peso do arquivo woff2 após subsetting. Alvo: <50KB
   por peso, <250KB total.
5. **Disponibilidade para auto-hospedagem.** Deve ser obtida de fonte
   oficial (GitHub da fundição ou Google Fonts) sem depender de CDN.

---

## Categorias tipográficas e suas funções

### Voz monoespaçada · Técnica

**Origem simbólica:** terminal, máquina de escrever, blueprint.
**Função:** metadados, datas, legendas, contato, cabeçalhos técnicos.
**Peso visual:** estrutural — letras ocupam espaço igual, criando
um grid de caracteres que remete ao grid arquitetônico.

### Voz serif · Editorial

**Origem simbólica:** livro, revista, tratado filosófico.
**Função:** manifesto, about, corpo de texto, citações estoicas.
**Peso visual:** humano — a variação de espessura (contraste
moderado) e o itálico caligráfico transmitem a presença de uma
mão que escreveu.

### Voz grotesk · Industrial

**Origem simbólica:** sinalização de edifício, letreiro, fachada.
**Função:** headlines, navegação, títulos de seção.
**Peso visual:** arquitetônico — letras com tracking expandido
funcionam como inscrições em concreto.

---

## Justificativa por família

### IBM Plex Mono

IBM Plex Mono foi selecionada sobre JetBrains Mono, Fira Code e
Space Mono. É a única monoespaçada que respira engenharia sem
respirar IDE. Desenhada pela IBM como parte de um sistema de
identidade corporativa que abrange código, documentação e interfaces.
Seus traços são secos, precisos, sem ornamentação. Não possui
ligaduras decorativas (ao contrário de JetBrains Mono e Fira Code)
— essencial porque o design estabelece que "a máquina não tem
caligrafia". Possui exatamente os pesos necessários: Regular para
metadados, Bold para cabeçalhos de seção. Não possui itálico, o
que é correto (o design proíbe monoespaçada em itálico).

### Source Serif 4

Source Serif 4 foi selecionada sobre EB Garamond, Merriweather
e Literata. Ocupa o ponto exato entre clássico e contemporâneo.
EB Garamond é Didone (contraste extremo) — parece livro do século
XIX, não uma publicação técnica. Merriweather é onipresente na
web — parece template. Literata foi desenhada para e-readers com
proporções compactas. Source Serif 4, encomendada pela Adobe como
companion da Source Sans, tem proporções clássicas com contraste
moderado e — crucialmente — um itálico verdadeiro desenhado por
Frank Grießhammer, não uma inclinação mecânica. Citações de Sêneca
não podem usar faux italic.

### Space Grotesk

Space Grotesk foi selecionada sobre DM Sans, Work Sans e Sora.
Seus terminais angulares ecoam as arestas do concreto. Seu desenho
largo favorece tracking expandido naturalmente — essencial para
headlines monumentais que simulam inscrições em fachada. Foi usada
em publicações independentes e identidades com tom técnico. A
ausência de peso Black (900) é compensada por escala: headlines
monumentais usam Bold (700) em 6rem+, alcançando impacto visual
equivalente a pesos mais pesados em tamanhos menores.

---

## Alternativa rejeitada — DM Sans

DM Sans foi a principal alternativa para a voz grotesk. É
tecnicamente superior: possui Black 900, melhor cobertura de
caracteres e hinting mais refinado. Foi rejeitada por uma razão
semântica: seu caráter tipográfico é neutro — não evoca
sinalização de edifício, não evoca cartaz de rua, não evoca
letra de fôrma. A neutralidade a torna excelente para interfaces
de produto, mas o design rejeita a estética de produto. Brutalismo
exige presença, não invisibilidade.

| Critério | Space Grotesk | DM Sans | Veredito |
|---|---|---|---|
| Caráter tipográfico | Terminais angulares, desenho largo, remete a fachada | Neutra, genérica, remete a interface | Space Grotesk |
| Peso Black (900) | Não possui (máximo Bold 700) | Possui Black 900 | DM Sans |
| Mitigação da ausência de Black | Compensar com escala maior (6rem+ Bold ≈ impacto de Black menor) | — | Contornável |
| Afinidade com design editorial | Alta — usada em publicações independentes | Média — associada a produtos Google | Space Grotesk |
| Tracking expandido natural | Sim — desenho largo favorece | Não — desenho compacto, requer ajuste manual | Space Grotesk |

---

## Escala tipográfica

A escala possui 6 níveis, com progressão editorial (não modular
geométrica), definida em `docs/engineering/01-design-tokens.md`:

| Nível | Tamanho (base 18px) | Uso |
|---|---|---|
| Display | 6rem (~96px) | Nome do portfólio, Hero |
| Headline | 3rem (~48px) | Títulos de seção |
| Subhead | 1.5rem (~24px) | Subtítulos |
| Body | 1.125rem (~18px) | Corpo de texto |
| Small | 0.875rem (~14px) | Metadados |
| Micro | 0.75rem (~12px) | Legendas, carimbos |

---

## Fallback stack

Definida em `--foundation-font-*` tokens:

```
Mono:    IBM Plex Mono → Courier New → monospace
Serif:   Source Serif 4 → Georgia → serif
Grotesk: Space Grotesk → Helvetica Neue → sans-serif
```

Courier New é a monoespaçada de sistema com métricas mais próximas
da IBM Plex Mono. Georgia é a serif de sistema com itálico
verdadeiro. Helvetica Neue é a grotesk de sistema mais neutra.
Nenhum fallback usa Arial, Times New Roman ou Roboto.

---

## Consequências

**Positivas:**
- Três famílias, três vozes — sem ambiguidade.
- Todas SIL OFL — sem custos de licenciamento, sem restrições
  de distribuição.
- Auto-hospedagem — sem dependência de CDN, offline-capable.
- Subsetting reduz payload para ~215KB total.
- A ausência de Black na Space Grotesk é um trade-off documentado.

**Negativas:**
- Se a escala não for suficiente para o impacto desejado nas
  headlines monumentais, DM Sans pode ser reconsiderada como
  fallback (reabrir ADR).
- Subsetting limita caracteres a latim + português + símbolos
  específicos. Conteúdo futuro com outros alfabetos exigiria
  re-subsetting.

**Ações:**
- `@font-face` declarations em `src/styles/fonts.css`.
- `<link rel="preload">` para Space Grotesk Bold.
- Script de subsetting em `scripts/build-fonts.ts`.
- Fallback stack definida nos tokens Foundation.

---

## Referências

- `docs/design/06-typographic-character.md` — vozes, usos, restrições.
- `docs/engineering/01-design-tokens.md` — tokens de tipografia e escala.
- `docs/engineering/07-asset-pipeline.md` — build de fontes.
- ADR-004 (design tokens), ADR-011 (font loading).
