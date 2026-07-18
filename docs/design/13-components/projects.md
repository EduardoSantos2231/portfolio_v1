# 13 · COMPONENTE: PROJETOS

---

## Função narrativa

O Projetos é o Capítulo IV. Após ler o Manifesto e o About,
o visitante conhece o pensamento — agora encontra a evidência
material desse pensamento.

Esta seção responde à pergunta: "o que este engenheiro
realmente constrói?"

---

## Estrutura

O Projetos ocupa o Espaço Técnico: grid denso, múltiplas
entradas, metadados visíveis.

**Cabeçalho da seção:**
`[PROJETOS]` ou `§ PROJETOS` em grotesk bold. Abaixo, uma
linha de metadados em monospace azul cobalto:
`N PROJETOS REGISTRADOS · 2020–2026 · ATUALIZADO EM MM/AAAA`

**Grid de projetos:**
Linhas e colunas regulares. Cada célula é um Project Preview
(detalhado em `project-preview.md`). As células são separadas
por linhas de grid visíveis (regras de aço finas, como a
grade de uma planta baixa).

Os projetos são ordenados por relevância ou cronologia
inversa — nunca por aleatoriedade ou "destaque algorítmico".

**Filtros (opcional):**
Se houver muitos projetos, filtros por categoria no topo
da seção. Não são "pills" coloridas — são rótulos em
monospace azul cobalto. Ex:
`TODOS · BACKEND · SISTEMAS · FERRAMENTAS · PESQUISA`
O filtro ativo recebe sublinhado ou marca de seleção
(derivada de cota arquitetônica — um traço abaixo do texto).

---

## Sensação

O visitante deve sentir que está folheando um catálogo
técnico ou um índice de arquivo.

A densidade de informação é alta — mas a organização é
clara. O grid acolhe a complexidade sem se tornar caótico.
É como olhar uma planta baixa: muitos símbolos, muitas
linhas, mas cada elemento pertence a um sistema de
representação que o visitante aprende a ler em segundos.

---

## Comportamento de interação

**Hover sobre um projeto:**
- A linha de grid ao redor da célula sofre interferência
  (glitch) por uma fração de segundo.
- A imagem do projeto recebe um overlay sutil — como se
  uma luz de scanner passasse sobre ela.
- O título permanece estável. A informação não se degrada.

**Seleção de um projeto (clique):**
- O projeto se expande como gaveta de arquivo (trilho
  vertical) para revelar detalhes completos.
- Os projetos vizinhos se mantêm no lugar — a expansão é
  local, não global.
- Uma seta de cota ou linha de referência conecta o projeto
  expandido ao seu lugar original no grid — para que o
  visitante não perca a orientação.

**Filtro ativo:**
- Disjuntor (snap) — a mudança é imediata. Projetos que não
  pertencem à categoria desaparecem. Projetos que pertencem
  permanecem.
- Sem animação de saída dos projetos filtrados — eles
  simplesmente não estão mais lá.

---

## Metadados de cada projeto

Cada projeto no grid exibe obrigatoriamente:

- Título do projeto (grotesk medium, tamanho moderado).
- Período ou data (monospace, azul cobalto).
- Categoria (monospace, azul cobalto ou preto tinta).
- Tecnologias principais (monospace, tamanho reduzido,
  preto tinta, separadas por `·`).
- Imagem principal (duotone Blueprint, 1:1).

Opcionalmente:
- Breve descritivo (uma linha, serif italic, preto tinta).
- Indicador de destaque (marca de cota ou símbolo de
  importância — não um emoji de estrela).

---

## O que nunca fazer em Projetos

- Nunca usar carrossel de projetos (slider, swiper).
- Nunca organizar projetos em lista vertical simples (a
  força do Espaço Técnico está no grid).
- Nunca usar thumbnails com cantos arredondados.
- Nunca esconder metadados atrás de hover (metadados são
  estrutura exposta — Princípio 1).
- Nunca usar animação de entrada stagger para os projetos.
- Nunca usar "cards" com sombra projetada. Projetos são
  células de grid, não cartões flutuantes.
- Nunca usar tags coloridas para tecnologias (React azul,
  Python amarelo, etc.). Tecnologias são texto, não marca.

---

## Comportamento responsivo

**Amplo (desktop):** 3 colunas. Grid amplo. Metadados
completos em cada célula.

**Médio (tablet):** 2 colunas. Grid confortável. Metadados
ligeiramente reduzidos (menos tecnologias visíveis).

**Estreito (mobile):** 1 coluna. Cada projeto ocupa a largura
total. O grid se torna uma sequência vertical de blocos —
mas mantém as linhas de separação visíveis, como páginas de
um catálogo empilhadas.
