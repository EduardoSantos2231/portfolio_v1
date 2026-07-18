# 08 · ATMOSFERA MATERIAL

---

## Princípio fundamental

Superfícies reais possuem textura. Superfícies digitais não.

A atmosfera material deste projeto existe para corrigir essa
ausência — para lembrar ao visitante que aquilo que ele vê,
embora renderizado em pixels, representa algo que possui matéria.

---

## O que é atmosfera material

Atmosfera material é a camada de imperfeição sobre as superfícies
do projeto. Não é decoração. É presença física simulada.

Ela comunica três coisas:

1. **Isto não é um template.** Superfícies polidas e perfeitas
   são a linguagem visual de produtos SaaS. A imperfeição é a
   assinatura do artesanal, do editorial, do concreto.

2. **Isto envelhece.** A textura sugere passagem do tempo.
   Concreto manchado. Papel amarelado. Metal oxidado. O portfolio
   não parece ter sido criado ontem — parece existir há décadas.

3. **Isto tem origem.** Cada textura remete a um material
   específico (concreto, papel, tinta, ferrugem). A textura é
   a impressão digital do material.

---

## Os tipos de atmosfera

### Concreto

A superfície mais abundante. Aparece nos fundos de seções,
nos espaços residuais, nas áreas de respiro.

**Textura esperada:**
Porosidade irregular. Pequenas cavidades. Variações tonais
sutis (nem todo cinza é igual). Marcas de fôrma de madeira
(linhas horizontais ou verticais muito sutis, como se o
concreto tivesse sido moldado in loco). Microfissuras.

**Intensidade:**
Sutil. A textura do concreto não deve competir com o conteúdo.
Ela é o fundo — deve ser percebida perifericamente, não
conscientemente. Se o visitante parar para reparar na textura
do concreto em vez de ler o texto, a intensidade está errada.

**Variação:**
O concreto não é uniforme. Algumas áreas são mais lisas (concreto
polido, áreas de alto tráfego visual). Outras são mais rugosas
(concreto bruto, juntas de dilatação, bordas de seção).

---

### Papel

Aparece nas superfícies editoriais — manifesto, about, áreas
de texto longo.

**Textura esperada:**
Fibra vegetal visível em close-up. Pequenas impurezas (pontos
escuros, variações de tom). Bordas irregulares quando o papel
é usado como superfície delimitada. Amarelamento irregular
(mais intenso nas bordas, mais claro no centro — como papel
que envelheceu exposto à luz).

**Intensidade:**
Muito sutil. O papel é o suporte da leitura — a textura deve
ser quase subliminar. Se o grain do papel reduzir o contraste
do texto, a intensidade está errada.

**Variação:**
Papel mais novo (creme claro, textura mínima) para seções
de manifesto — o pensamento é atemporal. Papel mais envelhecido
(creme escuro, textura mais presente) para citações e referências
— o conhecimento tem idade.

---

### Ruído de impressão

Aparece sobre imagens, em áreas de transição, em elementos
gráficos. Simula os artefatos de processos de reprodução
analógica.

**Textura esperada:**
Grain fotográfico (aleatório, monocromático). Scanlines
(linhas horizontais regulares, como as de um monitor CRT
ou de um scanner de mesa). Artefatos de compressão (banding
sutil, como JPEG de baixa qualidade — mas controlado, nunca
acidental). Poeira e riscos (partículas escuras ou claras
sobre imagens, como negativos fotográficos mal conservados).

**Intensidade:**
Variável por contexto. Sobre imagens: perceptível mas não
obstrutivo. Sobre superfícies: muito sutil. O ruído de
impressão é mais intenso no modo noturno (a baixa luminosidade
revela mais imperfeições).

---

### Tinta

Aparece em bordas de elementos tipográficos, em carimbos,
em marcações manuais.

**Textura esperada:**
Bordas de tinta levemente irregulares — como se aplicada
por carimbo de borracha ou escrita com caneta esferográfica.
Pequenas falhas de preenchimento (a tinta não cobre
uniformemente). Acúmulo de tinta nas bordas (como impressão
offset com leve excesso de tinta).

**Intensidade:**
Mínima e pontual. A textura da tinta aparece apenas em
elementos específicos (carimbos, selos, marcações manuais) —
nunca no texto principal. O texto principal deve ser legível
sem distração.

---

## Onde a atmosfera NÃO aparece

- **Texto principal.** O corpo de texto em serif é sempre
  nítido. A atmosfera está no fundo (papel), não na frente
  (tinta).
- **Elementos interativos em estado ativo.** Um link ou botão
  em hover pode ter textura sutil, mas nunca a ponto de
  sugerir que está quebrado ou ilegível.
- **Metadados críticos.** Coordenadas de contato, datas,
  informações de projeto — sempre legíveis com clareza máxima.
- **Modo de alto contraste.** Se o visitante ativar preferências
  de acessibilidade que exijam superfícies planas, a atmosfera
  material é removida completamente.

---

## Atmosfera e performance

A atmosfera material é conceitual, não decorativa — mas sua
implementação deve respeitar o meio digital:

- A textura nunca deve aumentar o tempo de carregamento de
  forma perceptível.
- A textura nunca deve causar repaint excessivo ou jank de
  scroll.
- A textura nunca deve aumentar o consumo de memória de
  forma significativa.

Estas são decisões de implementação, mas o princípio é
conceitual: a atmosfera serve à experiência, não a degrada.
Se a textura de concreto travar o scroll, remova a textura
antes de remover o princípio — mas entenda que a implementação
falhou, não o conceito.

---

## A atmosfera como diferenciação entre seções

Cada tipo de espaço possui sua própria atmosfera material:

**Monumental:** concreto bruto. Textura mais intensa do que
em outras seções — o monumental é sobre presença material antes
de ser sobre conteúdo. A textura aqui é protagonista.

**Editorial:** papel + tinta. A textura do papel é o fundo.
A textura da tinta aparece apenas nos elementos de anotação
(azul cobalto). A textura do concreto desaparece — o editorial
é um respiro de papel dentro do edifício de concreto.

**Técnico:** concreto polido + ruído de impressão. A textura
do concreto é mais lisa (o técnico exige clareza). O ruído
aparece nos elementos gráficos e imagens. Scanlines sobre
thumbnails de projeto.

**Arquivístico:** concreto polido + carimbo. Textura de tinta
de carimbo nos elementos de contato. Superfície limpa.

**Residual:** concreto bruto. Apenas textura. Sem conteúdo.
A textura mais intensa de todo o projeto — o residual é uma
pausa para sentir o edifício.

---

## O que nunca fazer com atmosfera material

- Nunca usar textura como overlay uniforme sobre toda a página.
  A atmosfera respira — varia entre seções, entre materiais,
  entre intensidades.

- Nunca usar texturas que não correspondam a um material da
  lista declarada em `21-materials.md`.

- Nunca permitir que a textura reduza o contraste do texto
  abaixo do necessário para legibilidade.

- Nunca usar textura como substituto de conteúdo. Textura
  é atmosfera — não preenche espaço vazio, ela o qualifica.

- Nunca animar a textura continuamente. Grain animado causa
  fadiga visual e distração. A textura é estática — como
  uma parede de concreto.

- Nunca usar ruído colorido (chroma noise). Todo o ruído
  deste projeto é monocromático — como grain de filme
  preto e branco ou de scanner.
