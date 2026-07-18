# ADR-008 · Shaders WebGL como aprimoramento futuro

**Data:** 2026-07-12  
**Status:** Aceito

---

## Contexto

O design menciona shaders como camada opcional de atmosfera material
(`docs/design/09-surface-and-tactility.md`): concreto com iluminação
reativa ao cursor, scanner com luz realista, papel com resposta ao
scroll. Estes efeitos simulam comportamento material que texturas
estáticas não conseguem reproduzir.

A questão é: implementar shaders na primeira versão ou postergar?

---

## Decisão

A primeira versão (MVP) atinge a identidade visual completa usando
HTML, CSS, SVG e texturas estáticas (níveis 0–2 do pipeline de
texturas). **Shaders WebGL (nível 3) são documentados como
arquitetura de longo prazo, com implementação em fases posteriores.**

Cada fase é independente — implementar uma fase não exige ter
implementado as anteriores.

---

## Justificativa

1. **A identidade não depende de WebGL.** Texturas estáticas +
   filtros SVG comunicam materialidade com fidelidade suficiente
   para todos os princípios do design. O concreto ainda parece
   concreto. O papel ainda parece papel.

2. **Shaders introduzem complexidade de compatibilidade.**
   WebGL2 não está disponível universalmente. GPUs integradas,
   navegadores com blacklist, dispositivos móveis antigos —
   todos exigiriam fallback para o nível 2. O MVP não deve
   depender de uma tecnologia que não é ubíqua.

3. **O design define shaders como camada opcional.**
   `docs/design/09-surface-and-tactility.md` diz: "A implementação
   pode usar shaders, texturas estáticas, variações tonais — o
   princípio permanece." Shaders nunca são descritos como requisito.

4. **Custo de desenvolvimento.** Implementar 3 shaders com
   detecção de capacidade, fallback, critérios de ativação e
   testes adicionaria complexidade desproporcional ao MVP.

---

## Plano de fases

| Fase | Sprint | Escopo |
|---|---|---|
| **0** | Atual | Níveis 0–2. Identidade completa sem shaders. |
| **1** | Futuro | `concrete-light`: superfície do Hero e ResidualSpace reativas ao cursor. |
| **2** | Futuro | `scanner-overlay`: substitui overlay CSS nos ProjectPreview. |
| **3** | Futuro | `paper-fiber`: textura de papel com micro-deslocamento no scroll. |
| **4** | Futuro | Otimização: VRAM budgeting, fallback para GPU integradas. |

---

## Alternativas rejeitadas

| Alternativa | Razão da rejeição |
|---|---|
| **Implementar shaders no MVP** | Aumenta complexidade, adiciona superfície de bugs, cria dependência de hardware. O MVP deve ser o menor sistema que atinge a identidade completa. |
| **Não documentar shaders** | Perde-se a arquitetura. A implementação futura seria ad-hoc, potencialmente conflitante com o design. Documentar agora garante coerência. |
| **Usar bibliotecas (Three.js, p5.js)** | Overhead massivo (~500KB+) para 3 shaders. Shaders vanilla WebGL2 são <5KB cada. |

---

## Consequências

**Positivas:**
- MVP roda em qualquer navegador, qualquer dispositivo.
- Arquitetura de shaders documentada — implementação futura segue
  contrato definido.
- Cada fase é um upgrade de `Surface` — sem reestruturação.

**Negativas:**
- MVP não tem iluminação reativa no concreto (apenas textura estática).
  Mitigação: a textura estática é suficiente para comunicar materialidade.
  A diferença é tátil, não conceitual.

**Ações:**
- Especificação completa em `docs/engineering/08-shader-architecture.md`.
- Componente `Surface` já possui prop `textureLevel` — nível 3 ativa
  WebGL quando disponível (implementação futura).
- Detector de capacidade documentado (`src/utils/shader-detector.ts`).

---

## Referências

- `docs/engineering/08-shader-architecture.md` — especificação completa (interfaces, GLSL, ativação).
- `docs/engineering/07-asset-pipeline.md` — níveis progressivos de textura.
- `docs/design/09-surface-and-tactility.md` — tatilidade e superfícies.
- `docs/design/07-temporal-behavior.md` — metáfora Scanner.
- ADR-007 (SVG noise), ADR-010 (image pipeline).
