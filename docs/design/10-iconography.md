# 10 · ICONOGRAFIA

---

## Princípio fundamental

Este projeto não usa ícones. Usa marcas técnicas.

Um ícone é um pictograma que representa uma ação ou conceito
através de simplificação visual. Pertence ao vocabulário de
interfaces digitais.

Uma marca técnica é um símbolo emprestado de disciplinas de
precisão — engenharia, arquitetura, matemática, cartografia —
que carrega significado funcional em seu contexto original e
que aqui é ressignificado como elemento de interface.

A diferença é a origem: ícones vêm do design de software.
Marcas técnicas vêm do desenho técnico.

---

## Domínios de origem

As marcas técnicas deste projeto são extraídas de cinco
domínios:

### Domínio 1 · Desenho de engenharia

Símbolos de solda. Marcas de tolerância. Representações de
rosca. Símbolos de diâmetro (⌀). Indicações de superfície.
Setas de corte (indicação de onde uma peça é seccionada para
visualização interna).

**Ressignificação no portfolio:**
- Seta de corte → indicador de expansão de detalhes.
- Símbolo de diâmetro → marcador de categoria.
- Marca de tolerância → indicador de precisão em metadados.

---

### Domínio 2 · Arquitetura e desenho técnico

Marcas de nível (um triângulo com linha horizontal). Cotas
(linhas com setas ou traços nas extremidades indicando
distância). Hachuras (padrões de preenchimento representando
materiais em corte). Norte em plantas baixas (rosa dos ventos
simplificada). Escala gráfica.

**Ressignificação no portfolio:**
- Cota → separador entre seções ou indicador de progresso.
- Marca de nível → indicador de seção atual na navegação.
- Norte → orientação de layout (assimetria deliberada).
- Escala gráfica → indicador de proporção em imagens técnicas.

---

### Domínio 3 · Matemática e lógica

Operadores (∑ ∏ ∫ √). Símbolos de conjuntos (∈ ⊂ ∪ ∩).
Quantificadores (∀ ∃). Símbolos de relação (≈ ≠ ≤ ≥).
Operadores lógicos (∧ ∨ ¬ →).

**Ressignificação no portfolio:**
- Somatório (∑) → agregação, total, índice de projetos.
- Integral (∫) → profundidade, continuidade, sobre.
- Pertence (∈) → tag, categoria, afiliação.
- Aproximadamente (≈) → estimativa, cerca de, versão.

---

### Domínio 4 · Elétrica e eletrônica

Símbolo de terra (GND). Símbolo de resistor (zigzag ou
retângulo). Símbolo de capacitor. Representações de sinal
(onda senoidal, quadrada, pulso). Símbolo de antena.

**Ressignificação no portfolio:**
- Terra (GND) → referência, ponto base, contato.
- Sinal → transmissão, comunicação, rede.
- Pulso → atividade, latência, heartbeat.

---

### Domínio 5 · Cartografia e editorial

Coordenadas (latitude/longitude). Marcas de registro (registering
marks — cruzes usadas para alinhamento de cores em impressão).
Marcas de corte (crop marks nos cantos da página). Sinais de
revisão editorial (deleatur, inserir, transpor).

**Ressignificação no portfolio:**
- Coordenadas → localização, contato, presença.
- Marcas de registro → grid visível, alinhamento.
- Marcas de corte → bordas de imagem, limites de seção.
- Sinais de revisão → edição, processo, rascunho.

---

## Regras de construção

Toda marca técnica deste projeto obedece a regras de construção
consistentes:

**Peso de traço:** equivalente ao peso bold da fonte monoespaçada.
Um traço único, sem variação de espessura dentro do mesmo símbolo.

**Construção:** apenas linhas e curvas básicas. Sem preenchimento
sólido (outline only). Exceção: hachuras podem ter preenchimento
de padrão — nunca cor sólida.

**Geometria:** construída sobre grid ortogonal. Mesmo curvas devem
ter ancoragem clara nos eixos do grid. Nada de curvas livres ou
orgânicas. O compasso e o esquadro são as ferramentas.

**Cantos:** vivos. Sem arredondamento (border-radius zero). A
precisão do traço está nos ângulos retos e nas interseções
limpas. Se um canto precisa de alívio visual, use chanfro —
nunca raio.

**Escala:** as marcas técnicas são pequenas. Tamanho equivalente
ao corpo de texto monoespaçado. Nunca são protagonistas — são
notação. Se uma marca técnica está maior que o texto ao lado,
está errada.

**Cor:** azul cobalto (notação, metadados, anotação) ou preto
tinta (estrutural, gridlines, marcas permanentes). Nunca verde
ácido. Nunca laranja ferrugem. Marcas técnicas não são acentos
decorativos — são notação.

---

## Onde as marcas técnicas aparecem

**Navegação:**
Setas de direção (derivadas de cotas arquitetônicas).
Indicadores de seção ativa (derivados de marcas de nível).
Separadores entre itens (derivados de traços de cota).

**Metadados de projeto:**
Categorias marcadas com ∈ (pertence).
Datas marcadas com símbolos de calendário técnico (não
ícones de calendário — uma representação abstrata derivada
de diagrama de Gantt ou timeline de engenharia).
Tecnologias marcadas com símbolos de especificação técnica.

**Seções:**
Títulos de seção acompanhados de numeração técnica
(ex: `§ 03` ou `[03]` — como capítulos de manual).
Separadores de seção como linhas de cota.

**Contato:**
Coordenadas marcadas com notação de latitude/longitude.
Email como símbolo de transmissão (derivado de antena ou
sinal).
Links como símbolos de referência cruzada editorial.

**Imagens e figuras:**
Legendas acompanhadas de marcas de registro nos cantos.
Numeração de figura no formato `FIG. 01`.
Marcas de corte nos cantos de imagens.

---

## O que NÃO é marca técnica

- **Nunca ícones de interface tradicionais.** Nada de
  hambúrguer (☰), lupa (🔍), engrenagem (⚙), envelope (✉),
  telefone (📞), usuário (👤). Esses ícones pertencem ao
  vocabulário de software — não ao vocabulário de engenharia.

- **Nunca ícones de redes sociais.** GitHub, LinkedIn,
  Twitter — aparecem como texto monoespaçado, não como
  logomarcas coloridas.

- **Nunca emojis.** Emoji é a antítese da marca técnica:
  decorativo, colorido, informal, culturalmente ambíguo.

- **Nunca ícones preenchidos.** O traço é a linguagem do
  desenho técnico. O preenchimento apaga o desenho.

- **Nunca ícones com cantos arredondados.** A geometria
  é reta. A precisão está nos ângulos.

---

## Densidade iconográfica

As marcas técnicas não devem ser onipresentes. Sua densidade
varia por seção:

**Monumental:** zero marcas técnicas. O monumental é sobre
tipografia e espaço — não sobre notação.

**Editorial:** marcas mínimas. Numeração de seção. Marcas de
registro sutis nos cantos da página. O editorial é sobre
texto.

**Técnico:** densidade máxima. Cada projeto recebe múltiplas
marcas (categoria, data, tecnologia). Grid visível com
marcações. A seção técnica parece uma planta baixa anotada.

**Arquivístico:** densidade moderada. Marcas de coordenada
no contato. Marcas de referência nos links. Notação funcional.

---

## Atmosfera das marcas técnicas

Marcas técnicas não são neutras — elas carregam a atmosfera
do projeto:

- Devem parecer desenhadas à mão com instrumentos (régua,
  compasso, normógrafo) — não geradas por software de desenho
  vetorial. Pequenas irregularidades no traço são bem-vindas:
  uma linha que começa com leve excesso de tinta, um círculo
  que não fecha perfeitamente.
- Em modo noturno, podem ganhar um leve brilho (verde ácido)
  quando ativas — como indicadores em painel de controle.
- Marcas que indicam interatividade (hover, clique) sofrem
  interferência (glitch) ao serem acionadas — a precisão
  do desenho encontra a imperfeição do meio digital.

---

## O que nunca fazer com iconografia

- Nunca usar uma biblioteca de ícones pronta.
- Nunca desenhar uma marca técnica que não tenha origem em
  um dos cinco domínios declarados.
- Nunca usar cor para diferenciar marcas técnicas entre si.
- Nunca fazer uma marca técnica maior que o texto ao lado.
- Nunca usar preenchimento em marca técnica (exceto hachuras).
- Nunca combinar marcas de domínios diferentes em um mesmo
  símbolo (ex: operador matemático + símbolo elétrico).
- Nunca criar uma marca técnica nova sem documentar seu
  domínio de origem e sua ressignificação.
