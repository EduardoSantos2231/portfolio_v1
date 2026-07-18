# 11 · FOTOGRAFIA

---

## Princípio fundamental

Neste projeto, fotografia não é ilustração. Fotografia é documento.

Toda imagem é tratada como se tivesse sido encontrada em um arquivo
técnico — escaneada, catalogada, legendada. A fotografia não
decora a página. Ela evidencia o que o texto afirma.

---

## O papel da imagem

Imagens existem para:

- Mostrar projetos em funcionamento (screenshots, diagramas de
  arquitetura, interface de terminal).
- Revelar o processo de construção (rascunhos, anotações,
  fotografias de caderno, protótipos).
- Situar o portfolio em um contexto físico (o espaço de trabalho,
  a mesa, os livros, o concreto ao redor — nunca selfies).
- Apresentar texturas e materiais como elementos visuais
  autônomos (close de concreto, close de papel, close de tinta).

Imagens NÃO existem para:

- Preencher espaço vazio.
- Decorar seções com pouco texto.
- Criar "impacto visual" genérico.
- Mostrar o rosto do autor como elemento principal (o portfolio
  é sobre o pensamento, não sobre a aparência).

---

## Tratamento obrigatório

Toda imagem que entra no portfolio passa por um dos dois
tratamentos cromáticos. Nenhuma imagem aparece em cor natural.

### Tratamento 1 · Modo Blueprint (Azul e Preto)

**Referência:** plantas de engenharia, cianotipia, blueprint,
cópia heliográfica.

**Aplicação:** duotone. Tons de azul cobalto + preto tinta.
O fundo da imagem assume o azul (como o papel do blueprint).
Os elementos principais assumem o preto ou azul escuro (como
as linhas do desenho técnico).

**Quando usar:**
- Screenshots de código e terminal.
- Diagramas de arquitetura de software.
- Capturas de tela de projetos.
- Qualquer imagem que represente o produto do trabalho de
  engenharia.

**Atmosfera:**
A imagem parece um documento técnico. Não parece uma
fotografia — parece uma planta. O blueprint comunica
precisão, projeto, construção.

---

### Tratamento 2 · Modo Calor (Ferrugem e Concreto)

**Referência:** fotografia analógica envelhecida, papel
fotográfico exposto ao calor tropical, diapositivos
desbotados.

**Aplicação:** duotone. Tons de laranja ferrugem + cinza
concreto. Os brancos viram cinza claro (concreto). Os pretos
viram laranja queimado (ferrugem). Imagens com essa paleta
parecem ter sido deixadas ao sol por décadas.

**Quando usar:**
- Fotografias do espaço de trabalho.
- Imagens de livros, cadernos, anotações.
- Texturas e materiais (concreto, papel, metal).
- Qualquer imagem que represente o contexto humano do
  trabalho de engenharia.

**Atmosfera:**
A imagem parece uma memória. Não parece uma fotografia
contemporânea — parece um arquivo recuperado. O calor
comunica Brasil, tempo, presença humana.

---

### Regras de aplicação do tratamento

- O tratamento é obrigatório. Nenhuma imagem escapa do duotone.
  A cor natural quebra a atmosfera material do projeto.
- Uma página nunca mistura os dois tratamentos lado a lado.
  Cada seção ou grupo de imagens usa um tratamento uniforme.
- O tratamento não é um filtro Instagram. É uma decisão
  conceitual: cada imagem se torna documento ao ser tratada.
- Imagens com pessoas (raras e apenas se essenciais) recebem
  o tratamento Calor — nunca Blueprint (pessoas não são
  diagramas).

---

## Bordas e margens da imagem

A imagem não é um retângulo flutuante. Ela é um objeto físico
digitalizado:

**Bordas:**
- Levemente irregulares — como papel fotográfico cortado à mão
  ou como borda de scanner que capturou além da área da foto.
- Marcas de corte nos cantos (crop marks editoriais) — quatro
  pequenos traços em L que indicam onde a imagem foi
  "recortada" do papel original.
- Nunca border-radius. Nunca borda arredondada. Nunca sombra
  projetada simulando profundidade.

**Margem interna:**
A imagem possui uma margem branca/creme ao redor — como uma
fotografia revelada em papel. Esta margem é irregular
(levemente amarelada nas bordas) e contém as marcas de corte.
A largura da margem é pequena mas presente — suficiente para
separar a imagem do fundo da página.

**Legenda:**
Toda imagem possui legenda. Formato fixo:
`FIG. 01 — DESCRIÇÃO CONCISA — DATA — CONTEXTO`
Monospace. Azul cobalto. Tamanho reduzido. Alinhada à
esquerda, abaixo da margem da imagem. A legenda faz parte
do objeto-imagem — não é um elemento separado flutuando
próximo à foto.

---

## Proporções de imagem

As imagens deste projeto respeitam proporções de documento,
não de tela:

- **Proporções permitidas:** 4:3, 3:2, 1:1.
- **Proporção proibida:** 16:9 (proporção de apresentação, de
  slide, de vídeo — pertence ao mundo corporativo, não ao
  mundo editorial).

A proporção 4:3 é a padrão. Remete à fotografia analógica
(35mm é 3:2, mas 4:3 é mais próxima do médio formato e dos
monitores CRT — o terminal, o scanner). A proporção 3:2 é
usada para fotografias com contexto humano (espaço de trabalho,
livros). A proporção 1:1 é usada para detalhes (close de
textura, detalhe de código, símbolo isolado) e para o grid
de projetos na seção técnica.

---

## Textura e ruído sobre imagens

Toda imagem recebe camadas de atmosfera material:

**Grain:**
Monocromático, sutil, como grain de filme fotográfico. Mais
intenso nas áreas escuras da imagem. Dá à imagem a qualidade
tátil do papel fotográfico.

**Scanlines:**
Linhas horizontais muito sutis, como as de um scanner de mesa
ou de um monitor CRT. Mais visíveis no tratamento Blueprint
(o blueprint já é um documento escaneado). Quase imperceptíveis
no tratamento Calor.

**Poeira e riscos:**
Partículas escuras ou claras ocasionais — como negativos mal
conservados. Uso muito comedido. A poeira deve parecer
acidental, não aplicada. Se o visitador perceber que é um
overlay, a intensidade está errada.

**Vinheta:**
Leve escurecimento nas bordas — como lente fotográfica antiga
ou como revelação irregular de papel fotográfico. A vinheta
nunca é simétrica — é mais intensa em um lado, como se a luz
de revelação não fosse uniforme.

---

## Imagens na seção técnica (projetos)

Cada projeto possui uma imagem principal que funciona como
cartão de visita visual:

- Tratamento Blueprint (a maioria dos projetos é software).
- Proporção 1:1 no grid de projetos, expandindo para 4:3
  na visualização individual.
- A imagem nunca é um screenshot convencional — é um screenshot
  tratado como blueprint, com margem, legenda, marcas de corte.
- Ao expandir o projeto, imagens adicionais podem aparecer
  com o mesmo tratamento.

---

## Imagens na seção editorial (manifesto, about)

Imagens são ausentes ou mínimas. O editorial é território da
tipografia. Se houver imagem, será:

- Um close de textura (concreto, papel) como fundo ou detalhe
  atmosférico — nunca como ilustração do texto.
- Um fragmento de escultura clássica em tratamento Calor
  (mármore como exceção conceitual) acompanhando citação
  estoica.
- Uma fotografia do espaço de trabalho em tratamento Calor —
  discreta, pequena, quase uma nota de rodapé visual.

---

## O que nunca fazer com fotografia

- Nunca usar imagens em cores naturais. O duotone é obrigatório.
- Nunca usar bancos de imagens (Unsplash, Pexels, etc.). Toda
  imagem é original ou de domínio público com tratamento
  conceitual justificado.
- Nunca usar mockups de dispositivos (iPhone, laptop, tablet
  flutuando). O projeto não é um produto para ser consumido
  em dispositivos — é um documento para ser lido.
- Nunca usar ícones ou logotipos de empresas como imagem de
  projeto (ex: "usei React, aqui está o logo do React").
  Tecnologias são mencionadas em texto monoespaçado — nunca
  em logomarcas.
- Nunca usar fotografias de perfil ou retratos frontais como
  elemento principal. Se houver retrato, será tratado como
  documento (duotone, margem, legenda), não como apresentação
  pessoal.
- Nunca agrupar imagens em carrossel ou slider. Imagens não
  são slides — cada uma merece seu espaço e seu tempo de
  observação.
- Nunca usar lazy loading com fade-in. Imagens carregam com
  scanner (blueprint) ou aparecem imediatamente (disjuntor).
