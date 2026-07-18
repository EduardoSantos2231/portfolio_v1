# 05 · ATMOSFERA CROMÁTICA

---

## Princípio fundamental

Neste projeto, cor não é decoração. Cor é material.

Cada cor pertence a uma substância do mundo físico: concreto, papel,
tinta, ferrugem, cobre oxidado, mármore, fósforo de terminal.

A cor não existe no vácuo digital. Ela é sempre a cor de algo.

---

## Estrutura da paleta: três camadas

### Camada 1 · Cores estruturais (fundos e superfícies)

São as cores que constroem o espaço. Aparecem em grandes áreas.
Definem o ambiente onde todo o resto acontece.

**Cinza concreto**
Origem material: concreto aparente, cimento, fôrma de madeira.
Variação tonal: do cinza-claro (concreto novo, luz direta) ao
cinza-escuro (concreto envelhecido, sombra).
Função atmosférica: solidez, permanência, engenharia. É a cor da
construção. Tudo se apoia sobre ela.
Jamais deve ser um cinza neutro e frio. Deve conter um leve calor
residual — como concreto que absorveu sol. O cinza deste projeto
tem temperatura, não é o cinza do Bootstrap.

**Creme papel**
Origem material: papel envelhecido, páginas de livro antigo,
papel jornal, cadernos de anotação.
Variação tonal: do creme-claro (página nova) ao creme-escuro
(página exposta ao tempo, luz e umidade tropicais).
Função atmosférica: conhecimento, leitura, permanência das ideias.
É a cor onde o pensamento habita. O branco puro não existe neste
projeto — branco é clínico, é hospital, é SaaS. Papel tem idade.

**Mármore branco**
Origem material: pedra, escultura clássica, inscrições lapidares.
Aparece exclusivamente como exceção conceitual (citações
filosóficas, fragmentos visuais, contraste com concreto).
Função atmosférica: tradição clássica, permanência, atemporalidade.
Jamais como fundo funcional. Sempre como citação visual.

---

### Camada 2 · Cores informacionais (texto e metadados)

São as cores que carregam significado. Aparecem em áreas médias
e pequenas. Definem hierarquia de leitura.

**Preto tinta**
Origem material: tinta de impressão tipográfica, nanquim,
impressão offset.
Função atmosférica: corpo do pensamento. É a cor do texto
principal, das regras horizontais, das linhas de grid, das
marcações estruturais.
Jamais usar preto puro de tela (#000000). A tinta sempre tem
um leve tom — quente quando sobre papel, neutro quando sobre
concreto. A tinta nunca é totalmente opaca: ela penetra o papel,
revela a fibra.

**Azul cobalto**
Origem material: tinta de caneta esferográfica, anotação
manuscrita, blueprint, caneta hidrográfica de revisor.
Função atmosférica: pensamento em processo. Metadados. Datas.
Nomes de arquivo. Legendas. Categorias. É a cor da anotação
que um engenheiro faz na margem da planta baixa.
Nunca usar como cor de link. Nunca usar como indicador de
interatividade. Nunca usar como "cor de sucesso". O azul
cobalto é a cor da mente trabalhando — não da interface
convidando ao clique.

**Verde ácido**
Origem material: fósforo de terminal CRT, LED monocromático,
display de equipamento industrial.
Função atmosférica: atividade, execução, sistema vivo.
Cursor piscando. Indicador de compilação. Linha de comando
em espera. Sinal de que algo está processando.
Esta é uma cor pontual. Jamais em grandes áreas. Sua função
é sinalizar — como uma luz de painel de controle. Pequena,
precisa, ativa. O verde ácido é o oposto do verde natureza:
é máquina, é elétrico, é artificial.

---

### Camada 3 · Cores atmosféricas (acentos e profundidade)

São as cores que criam a sensação de lugar. Aparecem em
pequenas áreas ou como sotaques sutis sobre as cores estruturais.

**Laranja ferrugem**
Origem material: oxidação de aço, metal exposto ao tempo,
tinta descascada revelando ferrugem, calor tropical sobre
superfície metálica.
Função atmosférica: Brasil. Calor. Tempo. Impermanência.
É a cor que diz "isto está em São Paulo, não em Zurique".
Aparece como acento em detalhes, como variação tonal no
concreto envelhecido, como tom de imagem tratada em duotone.
Nunca predominante. Sempre complementar ao concreto.
O laranja ferrugem não é vibrante — é queimado, oxidado, opaco.

**Verde oxidado**
Origem material: cobre exposto ao tempo, estátuas de bronze
com pátina, telhado de cobre envelhecido.
Função atmosférica: profundidade temporal, passado, persistência.
Uso extremamente raro e pontual. Aparece como sotaque mineral,
contraponto à ferrugem alaranjada.
Assim como o mármore, é uma cor de exceção conceitual — nunca
de uso corrente.

---

## Modos de luz

Este portfolio existe em dois momentos do dia. Não são "light mode"
e "dark mode" — são dois estados de luz do mesmo edifício.

### Modo diurno

Luz natural entrando pelas janelas industriais.
Fundo dominante: cinza concreto claro ou creme papel.
Texto: preto tinta.
Acentos: azul cobalto, verde ácido, laranja ferrugem.
Sensação: estar em um edifício de concreto às 14h de uma
terça-feira. Claridade. Trabalho. Silêncio.

### Modo noturno

Luz artificial de luminárias industriais. Terminal ligado.
Fundo dominante: cinza concreto escuro.
Texto: creme papel ou verde ácido (monospace).
Acentos: verde ácido (ativo), azul cobalto (esmaecido).
Sensação: estar no mesmo edifício às 23h. Apenas a luz de
trabalho acesa. Concentração. Recolhimento.

O modo noturno não é uma inversão do diurno. É uma segunda
personalidade do mesmo espaço. As cores estruturais escurecem.
As cores informacionais se adaptam. A ferrugem desaparece
(no escuro não se vê oxidação). O verde ácido ganha presença
(o terminal é a única fonte de luz).

---

## Relações cromáticas proibidas

- Concreto + azul cobalto + branco puro (vira Material Design
  sem querer).
- Preto tinta + branco puro + qualquer cor vibrante (vira
  site de startup).
- Verde ácido + preto puro + fundo escuro sem textura (vira
  Matrix / tema de terminal genérico).
- Laranja ferrugem + creme papel + marrom (vira estética
  vintage de cafeteria).
- Azul cobalto como cor dominante (vira "tema azul corporativo").

---

## Atmosfera cromática por seção

Cada tipo de espaço possui sua própria atmosfera de cor:

**Monumental:** cinza concreto + preto tinta. Máximo de duas
cores. O impacto vem da escala, não da variedade cromática.

**Editorial:** creme papel + preto tinta + azul cobalto
(anotações). Três cores. A terceira cor só aparece como
metadado ou citação.

**Técnico:** cinza concreto + preto tinta + azul cobalto +
laranja ferrugem (acentos). Quatro cores, mas com dominância
clara do cinza. A ferrugem aparece como detalhe em bordas,
separadores, hover states.

**Arquivístico:** cinza concreto + preto tinta + azul cobalto.
Três cores. Funcional, direto, sem atmosfera adicional.

**Residual:** apenas cinza concreto. Monocromático. Texturizado.
Respiração pura.

---

## O que nunca fazer com cor

- Nunca usar mais de quatro cores simultaneamente em uma seção.
- Nunca usar cor para diferenciar elementos que já são
  diferenciados por tipografia ou posição.
- Nunca usar azul cobalto como indicador de interatividade.
- Nunca usar verde ácido em grandes superfícies.
- Nunca usar branco puro como cor de fundo.
- Nunca usar preto puro de tela para texto.
- Nunca usar cores que não possuam um material de origem
  declarado.
