# TASK-002 · Design Tokens Verification

## Objetivo
Verificar e ajustar todos os design tokens para garantir consistência
cromática, contraste WCAG AA e fidelidade ao design.

## Contexto
Os tokens foram definidos em TASK-001 com valores iniciais. Esta task
é uma verificação sistemática: todo par texto/fundo deve passar WCAG AA,
todas as cores devem corresponder à atmosfera descrita no design, e o
modo noturno não pode ser uma simples inversão do diurno.

## Reading Order
1. `docs/design/05-chromatic-atmosphere.md`
2. `docs/design/06-typographic-character.md`
3. `docs/engineering/01-design-tokens.md`
4. `docs/engineering/09-accessibility-implementation.md` (tabela de contraste)
5. `docs/adr/004-design-tokens.md`

## Dependências
- [x] TASK-000 (project bootstrap)
- [x] TASK-001 (foundation)

## Critérios de aceite
- [x] Todos os pares texto/fundo passam WCAG AA (mínimo)
- [x] `cobalt-blue` sobre `cream-paper` tem contraste >= 4.5:1 ou é usado apenas em large text
- [x] `cobalt-blue-muted` sobre `concrete-dark` tem contraste >= 3:1 (large text) ou é ajustado
- [x] Modo noturno não é inversão simples (cores têm atmosfera própria)
- [x] Ferrugem é suprimida no modo noturno
- [x] Verde ácido ganha presença no modo noturno
- [x] Todas as cores têm seu material de origem documentado no comentário do token
- [x] Script `npm run check:contrast` passa sem erros

## Restrições
- Não alterar a estrutura de camadas dos tokens (Foundation → Semantic → Mode → State)
- Não adicionar novas cores sem justificativa no design
- Não usar branco puro (#FFFFFF) ou preto puro (#000000) em nenhum token

## Fora do escopo
- Componentes (TASK-003 em diante)
- Texturas (já definidas em TASK-001)
- Animações (TASK-006)

## Entregáveis
- [x] `src/styles/tokens.css` (ajustado)
- [x] Script `scripts/check-contrast.ts` implementado e funcional

## Checklist de implementação
- [x] 1. Rodar `check:contrast` inicial e documentar falhas
- [x] 2. Ajustar tokens que falham WCAG AA
- [x] 3. Verificar atmosfera do modo noturno (não é inversão)
- [x] 4. Verificar que ferrugem é suprimida no noturno
- [x] 5. Verificar que verde ácido é mais presente no noturno
- [x] 6. Documentar cada cor com seu material de origem
- [x] 7. Rodar `check:contrast` final — 100% de aprovação

## Checklist de revisão
- [x] `npm run check:contrast` passa
- [x] `npm run check:tokens` passa
- [x] `npm run lint` passa
- [x] Todos os pares de cor atendem WCAG AA
- [x] Modo noturno tem atmosfera distinta do diurno
- [x] Nenhuma cor sem material de origem documentado
