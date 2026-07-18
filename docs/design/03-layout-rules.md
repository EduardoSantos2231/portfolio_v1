# 03 · REGRAS DE LAYOUT

---

Este documento complementa `20-spatial-language.md`.

Enquanto aquele documento define os cinco tipos de espaço, este define
como eles se relacionam, se sequenciam e se transformam entre si.

---

## Hierarquia dos espaços

Os cinco espaços não possuem a mesma importância narrativa. Eles se
organizam em três níveis:

**Nível 1 · Estrutural (sempre presente)**
Espaço Monumental e Espaço Residual. São a fundação sobre a qual tudo
se apoia. O Monumental abre. O Residual respira entre as seções.

**Nível 2 · Conteúdo (seções principais)**
Espaço Editorial e Espaço Técnico. Onde a comunicação acontece.
O Editorial carrega pensamento. O Técnico carrega evidência.

**Nível 3 · Encerramento (seção final)**
Espaço Arquivístico. O último ato. Onde o visitante encontra
coordenadas e encerra a experiência.

---

## Sequenciamento

A ordem dos espaços segue a narrativa definida em `22-storytelling.md`:

```
MONUMENTAL
    ↓ (Residual)
EDITORIAL
    ↓ (Residual)
TÉCNICO
    ↓ (Residual)
ARQUIVÍSTICO
```

Esta ordem é fixa. Ela conta uma história: apresentação → argumento →
evidência → encerramento. Inverter a ordem quebraria a narrativa.

---

## Transições entre espaços

A transição entre dois espaços é sempre mediada pelo Espaço Residual.

O Espaço Residual não é uma faixa branca. É uma superfície de concreto
ou papel que:

- Possui textura (grain sutil, nunca liso).
- É mais estreita que as seções que separa.
- Não contém conteúdo — apenas atmosfera.
- Funciona como a página em branco entre capítulos de um livro.

A função do Espaço Residual é desacelerar o olhar. Após a densidade
de uma seção, o visitante precisa de um momento de silêncio antes
de absorver a próxima.

---

## O layout como construção

Cada seção é tratada como um bloco de concreto independente:

- As bordas entre seções são nítidas. Como uma junta de dilatação
  entre lajes.
- Não há transições suaves de cor entre seções. Cada seção possui
  sua própria materialidade declarada.
- O grid não se adapta fluidamente entre seções — ele se reconfigura,
  como uma planta baixa que muda de escala entre pavimentos.

---

## Densidade variável

A densidade visual não é constante. Ela aumenta e diminui seguindo
a narrativa:

**Monumental:** Densidade mínima. Poucos elementos. Muito vazio.
O vazio é ativo — ele pressiona os poucos elementos que existem.

**Editorial:** Densidade média. Texto longo. Margens generosas.
A densidade está na concentração da leitura, não na quantidade de
elementos.

**Técnico:** Densidade máxima. Grid populado. Múltiplas entradas.
Metadados. Imagens. É a seção mais carregada — como uma planta
baixa com muitas marcações.

**Arquivístico:** Densidade baixa. Poucos elementos. Funcional.
Encerramento. Como a última página de um livro: ficha catalográfica,
colofão, dados de impressão.

**Residual:** Densidade zero. Sem conteúdo. Apenas presença material.

---

## Regras de proximidade

Elementos que pertencem ao mesmo conceito devem estar visualmente
próximos. Elementos de conceitos diferentes devem estar visualmente
separados.

Isto é herança do design editorial suíço, mas aqui a separação não
é feita com linhas finas — é feita com juntas de concreto, com
espaços texturizados, com diferenças de material.

---

## Comportamento responsivo conceitual

Quando o espaço disponível muda (desktop → tablet → mobile), o layout
não se estica como borracha. Ele se reorganiza como um livro que muda
de formato:

- **Amplo (desktop):** Layout de página dupla. Margens generosas.
  Grid de 12 colunas com linhas visíveis. Comportamento de leitura
  horizontal — o olhar percorre a página como quem lê um jornal.

- **Médio (tablet):** Layout de página única. Margens reduzidas
  proporcionalmente. O grid se comprime, mas mantém sua lógica.
  Comportamento de leitura misto — ainda há varredura horizontal,
  mas o scroll vertical ganha presença.

- **Estreito (mobile):** Layout de coluna única. Margens mínimas
  mas nunca zero. O grid colapsa para uma única coluna, mas as
  linhas de referência permanecem visíveis. Comportamento de
  leitura vertical — como um pergaminho técnico.

Em nenhum breakpoint o layout deve parecer "um site mobile". Deve
parecer "uma publicação em formato reduzido".

---

## O que nunca fazer com layout

- Nunca centralizar conteúdo por padrão. Alinhamento à esquerda é
  a âncora da leitura editorial.
- Nunca usar larguras líquidas (100% da viewport). Margens são
  obrigatórias em todos os breakpoints.
- Nunca empilhar seções sem separação clara. A junta entre blocos deve
  ser visível como decisão, não como acidente.
- Nunca usar o mesmo fundo para duas seções consecutivas. A mudança
  de material entre seções reforça a ideia de construção por blocos.
- Nunca permitir que o conteúdo toque as bordas da viewport. Concreto
  precisa de fôrma. Conteúdo precisa de margem.
