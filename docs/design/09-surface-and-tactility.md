# 09 · SUPERFÍCIE E TATILIDADE

---

## Princípio fundamental

O visitante não toca a interface. Mas ele deve sentir que poderia.

Toda superfície deste projeto comunica seu material de origem.
Concreto parece concreto. Papel parece papel. Aço parece aço.
Esta comunicação não depende de textura estática apenas — ela
depende de como a superfície reage à luz, ao movimento, à
interação.

---

## O que é tatilidade

Tatilidade é a qualidade de uma superfície que sugere como
seria tocá-la.

No mundo físico, a tatilidade é direta: você encosta e sente.
No mundo digital, a tatilidade é evocada: você olha e imagina.

Uma superfície digital tátil transmite:

- **Temperatura.** Concreto é frio de manhã, morno à tarde.
  Papel é seco, levemente áspero ao toque. Aço é frio e liso.
- **Rugosidade.** Concreto bruto é áspero. Concreto polido é
  liso mas não escorregadio. Papel envelhecido é poroso.
- **Peso.** Concreto é pesado. Papel é leve. A sensação de
  massa deve ser comunicada visualmente.
- **Profundidade.** Uma superfície de concreto não é plana —
  possui micro-relevo. Uma superfície digital tátil sugere
  essa tridimensionalidade.

---

## As superfícies do projeto

### Superfície 1 · Concreto bruto

**Onde aparece:** Espaço Monumental, Espaço Residual, fundos
de seção.

**Qualidade tátil:**
Frio pela manhã, morno à tarde. Áspero — passa-se a mão e
sente-se a granulometria da areia. Marcas de fôrma de madeira
criam um ritmo horizontal ou vertical — como veios. Pequenas
bolhas de ar aprisionadas. Microfissuras que não comprometem
a estrutura.

**Como evocar tatilidade:**
- Microtextura com variação direcional (as marcas da fôrma
  orientam o olhar e sugerem a direção do toque).
- Variação sutil de iluminação sobre a superfície — como luz
  natural entrando por uma janela e revelando o relevo.
- Nas bordas da superfície, o concreto encontra outra superfície
  (aço, outra laje, o vazio). Esta junta deve ser visível —
  como uma linha escura, uma sombra, um desnível.

---

### Superfície 2 · Concreto polido

**Onde aparece:** Espaço Técnico, Espaço Arquivístico.

**Qualidade tátil:**
Frio, liso, mas não escorregadio. A superfície foi desempenada —
a granulometria fina está exposta, mas não há aspereza. Reflete
luz difusa. Lembra o chão do MASP ou do SESC Pompeia.

**Como evocar tatilidade:**
- Textura muito mais sutil que o concreto bruto — quase lisa,
  mas com microvariações.
- Comportamento de luz mais uniforme (superfícies polidas
  distribuem a luz, não a quebram).
- Reflexo sutil de elementos próximos (não como espelho, mas
  como indicação de que a superfície é lisa o suficiente para
  refletir).

---

### Superfície 3 · Papel

**Onde aparece:** Espaço Editorial, áreas de texto.

**Qualidade tátil:**
Seco. Levemente áspero — sente-se a fibra. A borda do papel
não é perfeitamente reta — é levemente irregular, como papel
cortado à mão ou rasgado. Aquece ao toque prolongado.

**Como evocar tatilidade:**
- O papel é a única superfície quente do projeto. Sua cor
  (creme) comunica calor. Seu grain comunica fibra.
- A borda do papel — quando usado como superfície delimitada —
  deve ser irregular. Não é uma caixa com borda CSS. É um
  pedaço de papel sobre concreto.
- A sombra do papel sobre o concreto é mínima e dura (papel
  é fino, a sombra é rente).

---

### Superfície 4 · Aço

**Onde aparece:** Linhas de grid, regras horizontais, elementos
estruturais visíveis, navegação.

**Qualidade tátil:**
Frio. Liso. Duro. Pode estar pintado (metal pintado) ou nu
(aço escovado). Quando pintado, a tinta possui textura própria
(levemente rugosa, como tinta industrial).

**Como evocar tatilidade:**
- Linhas de aço são precisas — sem variação de espessura, sem
  borda irregular. A precisão do aço contrasta com a
  irregularidade do concreto.
- Aço pintado possui cor sólida e opaca — sem gradiente, sem
  transparência. Como uma viga pintada de preto ou azul cobalto.
- Aço nu possui um brilho metálico sutil — mas nunca cromado
  ou espelhado. Aço industrial, não aço decorativo.

---

### Superfície 5 · Vidro industrial

**Onde aparece:** Áreas de transparência funcional — camadas
de informação sobrepostas, tooltips, detalhes expansíveis.
Uso muito raro.

**Qualidade tátil:**
Frio. Liso. Levemente reflexivo. Vidro industrial não é
perfeitamente transparente — possui um leve tom esverdeado
(óxido de ferro no vidro) e pode ter pequenas bolhas ou
ondulações.

**Como evocar tatilidade:**
- O vidro nunca é 100% transparente. Sempre há um leve tom
  e uma sutil redução de contraste do que está atrás.
- Quando luz atravessa o vidro, projeta uma sombra com borda
  levemente esverdeada — como a luz que passa pelo vidro do
  MASP.
- Uso extremamente raro. O vidro é uma exceção — o projeto é
  opaco por natureza (concreto, papel, aço).

---

### Superfície 6 · Mármore (exceção conceitual)

**Onde aparece:** Citações filosóficas, fragmentos visuais de
escultura, momentos de contraste com concreto. Uso raríssimo.

**Qualidade tátil:**
Frio. Pesado. Perfeitamente liso onde polido, mas com veios
irregulares que são ligeiramente mais profundos que a superfície.
O mármore não aquece — permanece frio mesmo em ambiente quente.

**Como evocar tatilidade:**
- Veios sutis que percorrem a superfície — não como textura
  aplicada, mas como característica inerente ao material.
- A cor do mármore é branca, mas um branco com profundidade —
  não é papel, não é tinta, é pedra.
- Aparece como citação, nunca como superfície funcional.
  Um bloco de mármore atrás de uma citação de Sêneca. Uma
  fotografia de escultura tratada em alto contraste.

---

## Interação e tatilidade

A tatilidade não é estática — ela responde à interação:

**Hover sobre superfície de concreto:**
A textura permanece. Nenhuma "elevação". Concreto não flutua.
O que muda é a iluminação — como se uma luz de inspeção fosse
direcionada à área sob o cursor, revelando mais detalhes da
superfície. Uma ligeira mudança de brilho, não de posição.

**Hover sobre elemento de aço:**
A linha ou elemento metálico pode sofrer uma breve interferência
(glitch) — como se o sinal entre o cursor e o metal sofresse
uma perturbação eletromagnética. Duração mínima.

**Hover sobre papel:**
Nenhuma mudança drástica. O papel não é interativo — é suporte
de leitura. A interação com papel é mediada pela tinta
(anotações em azul cobalto, links tratados como marcações).

**Clique em superfície de concreto (transição):**
O concreto não reage ao clique. A transição acontece por
mecanismo externo (scanner, trilho) — não por transformação
da superfície.

---

## A luz como reveladora de tatilidade

A iluminação é o principal instrumento de tatilidade:

**Luz natural (modo diurno):**
Entra por janelas imaginárias. Revela o relevo do concreto.
Projeta sombras duras e definidas (sol tropical). A luz tem
direção — não é ambiente difuso. Vem de cima e da esquerda
(como em um edifício com janelas na face leste).

**Luz artificial (modo noturno):**
Fontes pontuais. Luminárias industriais. Terminal. A luz é
localizada — revela a superfície apenas onde incide. O resto
é escuridão de concreto.

**Luz de scanner:**
Uma banda horizontal de luz intensa que percorre a superfície
— como a lâmpada do scanner de mesa. Revela a textura
momentaneamente enquanto passa, depois a superfície retorna
ao seu estado normal.

---

## Tatilidade e performance

A evocação de tatilidade é conceitual. Sua implementação pode
usar shaders, texturas estáticas, variações de cor, ou qualquer
outra técnica — mas o princípio permanece:

A superfície deve parecer feita de algo.

Se a implementação disponível não permite shaders, use texturas
estáticas. Se texturas estáticas forem pesadas demais, use
variações tonais. Se nada for possível, mantenha a cor do
material — a cor do concreto ainda comunica concreto mesmo sem
relevo.

O importante é que a intenção de materialidade esteja presente
em cada decisão — mesmo quando o meio limita a execução.

---

## O que nunca fazer com superfície e tatilidade

- Nunca usar sombras projetadas (box-shadow) para simular
  profundidade. Sombra de CSS é a linguagem do Material Design
  — cartões flutuando sobre fundo. Neste projeto, nada flutua.
  Tudo está apoiado.

- Nunca usar gradientes para simular volume (esfera, cilindro,
  botão 3D). Volume neste projeto é comunicado por textura e
  luz — não por degradê.

- Nunca usar blur para simular profundidade de campo. Desfoque
  é atmosfera fotográfica — este projeto é arquitetônico.

- Nunca usar transparência como efeito decorativo. Se algo é
  transparente, é porque o material é vidro — e vidro tem tom,
  tem espessura, tem peso.

- Nunca fazer superfícies "responderem ao mouse" com elevação
  ou escala. Concreto não se move quando você aponta para ele.

- Nunca tratar todas as superfícies com a mesma textura.
  A diferenciação de materiais entre seções é estrutural,
  não opcional.
