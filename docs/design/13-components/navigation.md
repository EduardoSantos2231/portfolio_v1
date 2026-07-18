# 13 · COMPONENTE: NAVEGAÇÃO

---

## Função narrativa

A Navegação é a estrutura exposta do edifício.

No brutalismo, as vigas, pilares e passarelas são visíveis.
Na web convencional, a navegação é escondida atrás de menus
hambúrguer, enterrada em gavetas, dissolvida em transparências.

Neste projeto, a navegação é uma viga. Ela está lá. Você a vê.
Você sabe onde está e para onde pode ir.

---

## Estrutura

A Navegação é uma barra horizontal no topo da página ou uma
coluna vertical fixa à esquerda (dependendo do espaço
disponível e da decisão de implementação). Em ambos os casos,
é estruturalmente visível e tipograficamente discreta.

**Formato horizontal (padrão para desktop amplo):**

```
[MONUMENTAL]  [MANIFESTO]  [SOBRE]  [PROJETOS]  [CONTATO]
```

**Formato vertical (alternativa para desktop ou tablet):**

```
[MONUMENTAL]
[MANIFESTO]
[SOBRE]
[PROJETOS]
[CONTATO]
```

Os colchetes não são literais — são uma representação de
como os itens são emoldurados. Cada item pode ser delimitado
por marcas de cota (traços horizontais nas laterais) ou
brackets sutis, como coordenadas em uma planta baixa.

---

## Tipografia da navegação

Monospace. Tamanho pequeno. Tracking expandido como
sinalização industrial. Cor: preto tinta (diurno), creme
papel (noturno).

Cada item é um rótulo de seção — não um "link" no sentido
tradicional. A diferença é sutil mas importante: um link
convida ao clique. Um rótulo informa a posição.

---

## Estado ativo

O item correspondente à seção atual recebe uma marca de
seleção:

- Uma linha horizontal abaixo do texto (como cota de nível).
- Ou um bracket à esquerda do texto.
- Ou ambos.

A marca de seleção é estática — não "acende", não "pulsa".
Ela informa, não convida.

A cor da marca de seleção é azul cobalto (notação) ou
verde ácido (modo noturno, como indicador de painel).

---

## Estado hover

O item sob o cursor sofre interferência breve (glitch):
um deslocamento horizontal de fração de caractere, uma
distorção momentânea, retorno ao estado normal. Como se
o sinal entre o dedo e a estrutura sofresse uma perturbação.

---

## Navegação em mobile

Em espaço restrito, a navegação não desaparece — ela se
adapta. Mas nunca se torna um menu hambúrguer.

**Alternativa 1:** os itens permanecem visíveis em linha
horizontal com scroll horizontal (como uma régua de
navegação).

**Alternativa 2:** a navegação migra para o Footer como
legenda de seção — o visitante vê onde está no final da
página, não no topo.

**Alternativa 3:** a navegação se torna uma coluna vertical
estreita fixa à esquerda, com ícones reduzidos a marcas
mínimas (o primeiro caractere de cada seção em monospace).

O que nunca acontece: a navegação se esconder atrás de um
botão. Estrutura exposta não se esconde.

---

## Relação com o scroll

A navegação idealmente é fixa (sticky) — acompanha o scroll
como uma viga que percorre todo o edifício. O visitante
sempre sabe onde está e para onde pode ir.

Se fixa, a navegação projeta uma sombra? Não. Nada neste
projeto projeta sombra (viola o princípio de materialidade:
concreto e aço não flutuam, não projetam sombra sobre o
conteúdo — eles SÃO o conteúdo). A separação entre navegação
e conteúdo é feita por uma linha de aço ou uma mudança de
material (concreto mais escuro na barra de navegação vs.
concreto mais claro no conteúdo).

---

## O que nunca fazer na Navegação

- Nunca usar menu hambúrguer (qualquer ícone de três linhas).
- Nunca esconder itens de navegação em submenus ou dropdowns.
- Nunca usar animação de expansão (o menu não "abre" — ele
  está sempre aberto).
- Nunca usar highlight colorido no item ativo.
- Nunca usar underline animado que "desliza" entre itens
  (movimento orgânico, não mecânico).
- Nunca centralizar os itens de navegação. Alinhamento à
  esquerda — como leitura.
- Nunca usar logotipo ou marca como item de navegação (o
  nome do portfolio está no Hero — não precisa se repetir
  em todas as páginas).
