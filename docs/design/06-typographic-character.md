# 06 · CARÁTER TIPOGRÁFICO

---

## Princípio fundamental

Tipografia não é fonte. Tipografia é voz.

Cada classe tipográfica deste projeto possui uma origem simbólica,
uma função comunicativa e uma personalidade distinta. A escolha da
fonte específica (nome, fundição, arquivo) é decisão de implementação
e pertence à fase de especificação técnica. Este documento define o
caráter — a voz — de cada classe.

---

## As três vozes

### Voz 1 · Monoespaçada Técnica

**Origem simbólica:** terminal de computador, máquina de escrever,
blueprint, diagrama técnico, perfuradora de cartão, display de
equipamento industrial.

**Personalidade:** precisa, seca, funcional, sem ambiguidade.
É a voz dos dados — não persuade, informa. Não decora, registra.

**Onde aparece:**
- Metadados de projetos (datas, categorias, tecnologias, versões).
- Legendas de imagens e diagramas.
- Coordenadas de contato.
- Cabeçalhos de seção (como carimbo técnico).
- Numeração de página.
- Código fonte exibido como parte do portfolio.
- Navegação (como sinalização industrial).

**Onde nunca aparece:**
- Corpo de texto longo (cansa a leitura, perde a hierarquia).
- Manifesto ou about (precisa da voz humana da serif).
- Citações filosóficas (precisa de gravidade, não de precisão).

**Caráter visual esperado:**
Largura fixa. Cada caractere ocupa o mesmo espaço horizontal.
A regularidade do ritmo é sua beleza — como o compasso de uma
máquina. Peso regular para metadados. Peso bold para títulos de
seção. Nunca itálico (monospace itálico é uma contradição: a
máquina não tem caligrafia).

**Tratamento cromático:**
Preto tinta sobre creme papel (modo editorial).
Azul cobalto sobre cinza concreto (modo técnico, metadados).
Verde ácido sobre cinza concreto escuro (modo noturno, terminal).

**Espaçamento:**
Generoso. A monoespaçada precisa de espaço entre caracteres
maior que a serif — sua beleza está no ritmo visível da grade
de caracteres. Se comprimida, perde a legibilidade e a
personalidade.

---

### Voz 2 · Serif Editorial

**Origem simbólica:** livro impresso, revista, jornal, publicação
acadêmica, tratado filosófico, carta, diário.

**Personalidade:** humana, erudita, quente, reflexiva.
É a voz do pensamento. Convida à leitura lenta.

**Onde aparece:**
- Manifesto.
- Texto do About.
- Citações de Sêneca, Marco Aurélio e outros filósofos.
- Descrições longas de projetos.
- Leads e textos introdutórios.

**Onde nunca aparece:**
- Navegação e interface (perde a precisão).
- Metadados (mistura vozes).
- Títulos de seção (a serif é para leitura, não para sinalização).
- Dados tabulares (monospace resolve melhor).

**Caráter visual esperado:**
Proporções clássicas. Contraste moderado entre hastes grossas e
finas (nem Didone extrema, nem slab serif industrial). Serifas
com terminais definidos mas não pontiagudos. A fonte deve
transmitir que pertence a um livro, não a um website.

**Pesos:**
- Regular: corpo de texto.
- Italic: citações, ênfase, títulos de obras, palavras em latim.
  O itálico da serif é caligráfico — deve ser uma versão
  verdadeiramente desenhada, não uma inclinação mecânica.
- Bold: subtítulos dentro do texto, termos-chave. Uso raro.

**Tratamento cromático:**
Preto tinta sobre creme papel. Sempre.
Nunca azul cobalto. Nunca verde ácido. A serif é a voz do
pensamento consolidado, não do pensamento em processo.

**Espaçamento:**
Entrelinha generosa. O texto filosófico precisa de espaço para
respirar entre as linhas — como um livro bem diagramado, não
como uma página web comprimida. Margens amplas. Largura de linha
confortável para leitura contínua (nem tão curta que o olhar
salte demais, nem tão longa que se perca na volta).

**Tratamento especial — citações estoicas:**
Citações de filósofos recebem tratamento diferenciado:
- Alinhamento à direita.
- Regra horizontal acima da citação (linha fina, preto tinta).
- Texto em serif italic.
- Atribuição em monospace, azul cobalto, tamanho reduzido.
- Margem direita maior que a esquerda (assimetria deliberada).

---

### Voz 3 · Grotesk Industrial

**Origem simbólica:** sinalização de edifícios, placas de concreto,
letreiros industriais, cartazes de rua, tipografia de fachada,
estêncil, letra de forma.

**Personalidade:** firme, direta, arquitetônica, presente.
É a voz da construção. Anuncia, não argumenta.

**Onde aparece:**
- Headlines (títulos de seção, nome do portfolio).
- Navegação principal.
- Labels e categorias quando precisam de destaque.
- Chamadas e subtítulos de seção (em contraste com a serif do corpo).

**Onde nunca aparece:**
- Corpo de texto (é cansativa em longa leitura, falta ritmo
  interno).
- Citações (não possui a gravidade da serif).
- Metadados (não possui a precisão funcional da monospace).

**Caráter visual esperado:**
Geométrica ou neo-grotesk com personalidade. Nada de Helvetica
genérica — mas também nada de display excêntrica. A fonte deve
parecer que pertence à fachada de um edifício ou à capa de uma
publicação técnica. Peso bold ou black para headlines. Peso
medium para navegação.

**Pesos:**
- Bold ou Black: headlines monumentais, nome do portfolio no hero.
- Medium: navegação, subtítulos de seção.
- Regular: uso muito raro (apenas quando a grotesk precisar
  descer na hierarquia sem perder a voz).

**Tratamento cromático:**
Preto tinta sobre cinza concreto (headlines).
Preto tinta sobre creme papel (subtítulos em seção editorial).
Nunca azul cobalto. Nunca verde ácido. A grotesk é estrutural —
não é anotação, não é sistema ativo.

**Espaçamento:**
Tracking generoso em headlines (letras respiram, como inscrições
em fachada). Tracking normal em navegação e subtítulos. O
tracking expandido da headline é uma referência direta à
sinalização arquitetônica e aos letreiros industriais brasileiros.

---

## Hierarquia entre as vozes

As três vozes não competem. Cada uma ocupa um nível hierárquico
específico:

**Nível 1 · Sinalização**
Grotesk bold/black. Headlines e nome do portfolio.
Função: anunciar onde você está.

**Nível 2 · Argumentação**
Serif regular/italic. Manifesto, about, corpo de texto.
Função: comunicar o que você pensa.

**Nível 3 · Registro**
Monospace regular/bold. Metadados, datas, legendas, coordenadas.
Função: documentar os fatos.

Um elemento nunca deve usar a voz errada para seu nível. Se
um metadado aparecer em serif, soará como opinião. Se um
parágrafo filosófico aparecer em monospace, soará como
output de programa. A voz correta é tão importante quanto
a informação correta.

---

## Combinações e coexistência

**Sobre a mesma página:**
As três vozes podem coexistir — é assim que funcionam as
páginas de uma revista técnica. Mas cada uma permanece em
seu domínio:
- Grotesk no topo (título da seção).
- Serif no centro (corpo do texto).
- Monospace nas bordas (metadados, legendas, numeração).

**Transições de voz:**
Quando o texto muda de voz (ex: de um parágrafo em serif para
um metadado em monospace), a transição deve ser marcada por
uma quebra visual — mudança de linha, espaço adicional, regra
horizontal. A mudança de voz é um evento tipográfico, não um
acidente de formatação.

**Conflitos de voz:**
Nunca usar grotesk e monospace em sequência imediata sem
separação clara (ambas têm ritmo regular e podem se confundir).
Nunca usar serif e monospace na mesma linha (quebra a textura
da leitura). Quando precisar misturar vozes na mesma frase
(ex: "Projeto X (2024)"), use grotesk + monospace entre
parênteses — a mudança de peso e largura cria distinção
suficiente.

---

## Atmosfera tipográfica

A tipografia deste projeto deve transmitir três sensações
simultâneas:

**Precisão de engenharia.**
Cada caractere no lugar certo. Alinhamento impecável.
Grid respeitado.

**Gravidade editorial.**
O texto tem peso. Não é "conteúdo". É pensamento.

**Humanidade tropical.**
Apesar da precisão e da gravidade, a tipografia não é
asséptica. O contexto cromático (creme papel, preto tinta
levemente quente) e o contexto material (grain, textura)
impedem que a tipografia pareça saída de uma impressora
laser. Ela parece saída de uma gráfica de bairro.

---

## O que nunca fazer com tipografia

- Nunca usar fontes de sistema (Arial, Times New Roman,
  Courier New). A tipografia é parte da identidade — usar
  fontes padrão é abrir mão da direção de arte.

- Nunca usar mais de três famílias tipográficas no total.
  Três vozes, três famílias.

- Nunca usar fontes display decorativas. A expressividade
  vem da composição, não do desenho do tipo.

- Nunca usar itálico mecânico (faux italic). Se a fonte não
  possui itálico verdadeiro, não use itálico.

- Nunca justificar texto (alinhamento forçado cria rios
  no texto e trai a diagramação editorial de qualidade).

- Nunca usar texto centralizado como padrão. Alinhamento
  à esquerda é a âncora.

- Nunca comprimir ou expandir artificialmente a largura
  dos caracteres. A proporção da fonte é parte de seu
  desenho.
