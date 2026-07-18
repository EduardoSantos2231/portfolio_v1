# 07 · COMPORTAMENTO TEMPORAL

---

## Princípio fundamental

Movimento não é animação. Movimento é comportamento.

Neste projeto, as coisas não "animam" — elas se movem como
objetos reais no mundo físico. Cada transição possui uma
metáfora mecânica clara. Cada mudança de estado revela o
mecanismo que a produziu.

---

## As cinco metáforas de movimento

### Metáfora 1 · Disjuntor (Snap)

**Referência mecânica:** interruptor industrial, disjuntor,
chave seccionadora, relé eletromecânico.

**Sensação:** imediato, seco, definitivo. A mudança de estado
acontece entre um frame e o próximo. Não há transição visível
— há substituição.

**Quando usar:**
- Alternância entre estados binários (ex: modo diurno/noturno).
- Seleção de item em lista de projetos.
- Ativação/desativação de filtros.
- Mudança de seção via navegação (se direta, sem scroll).

**Quando NUNCA usar:**
- Transições entre seções distantes (precisa de trilho ou scanner).
- Revelação de conteúdo (precisa de mecânica de gaveta).
- Aparição de texto (precisa de datilográfica).

**Caráter temporal:**
Instantâneo. O olhar não acompanha movimento — ele testemunha
uma mudança. Como acionar uma chave: entre o antes e o depois,
não há intervalo perceptível.

---

### Metáfora 2 · Trilho (Slide)

**Referência mecânica:** gaveta de arquivo, porta de elevador
industrial, trilho de máquina, portão de enrolar.

**Sensação:** deslizamento retilíneo com peso. O objeto se move
em um eixo único (horizontal ou vertical) como se estivesse
sobre rolamentos. Há atrito implícito — o movimento não é
totalmente livre.

**Quando usar:**
- Expansão de detalhes de projeto (a ficha se abre como gaveta).
- Navegação entre seções via scroll (a página desliza sobre
  trilhos).
- Aparição de navegação secundária.
- Revelação de conteúdo adicional dentro de uma seção.

**Quando NUNCA usar:**
- Transições que envolvem mudança completa de contexto.
- Aparição de elementos pequenos e pontuais.
- Efeitos de hover (glitch é mais adequado).

**Caráter temporal:**
Linear. Velocidade constante. Sem aceleração, sem desaceleração.
Movimento de máquina, não de organismo. Duração suficiente para
que o olhar perceba a direção e a natureza do deslocamento —
mas não tão longa a ponto de parecer拖延.

---

### Metáfora 3 · Datilográfica (Typewriter)

**Referência mecânica:** máquina de escrever, terminal de
computador, impressora matricial, teletipo.

**Sensação:** revelação incremental. Cada caractere aparece
individualmente, em sequência, como se estivesse sendo
digitado diante do visitante. O ritmo é constante — uma letra
por vez, sem variação de velocidade.

**Quando usar:**
- Aparição de headlines (o título se escreve sozinho, letra
  a letra).
- Estados de carregamento com personalidade.
- Labels e metadados que se revelam progressivamente.
- Simulação de terminal em seções específicas.

**Quando NUNCA usar:**
- Parágrafos longos (entediante e inacessível).
- Conteúdo que o visitante já viu antes (repetitivo).
- Elementos de navegação que precisam de resposta imediata.
- Texto que precisa ser lido rapidamente.

**Caráter temporal:**
Sequencial. O cursor pisca. Cada letra aparece com um pequeno
intervalo — como alguém pensando antes de digitar a próxima
tecla. O movimento é sonoro na imaginação: o visitante "ouve"
o teclado mesmo sem som.

**Restrição de acessibilidade:**
Este comportamento deve ser drasticamente reduzido ou eliminado
quando o visitante possui preferência de redução de movimento
ativada. O texto deve aparecer completo — a datilográfica é
atmosfera, não funcionalidade essencial.

---

### Metáfora 4 · Scanner (Blueprint)

**Referência mecânica:** scanner de mesa, fotocopiadora,
impressora de plantas, leitor de microfilme.

**Sensação:** revelação por varredura. Uma banda horizontal
percorre o elemento de cima a baixo (ou da esquerda para a
direita) revelando o conteúdo. Como a luz do scanner que
ilumina o documento linha por linha.

**Quando usar:**
- Carregamento de imagens (a foto aparece como se estivesse
  sendo escaneada).
- Transições entre seções principais (a nova seção é
  "escaneada" sobre a anterior).
- Aparição de diagramas e plantas baixas.

**Quando NUNCA usar:**
- Elementos pequenos (a metáfora do scanner perde sentido
  em escala reduzida).
- Texto (conflita com a metáfora datilográfica).
- Interações frequentes (o scanner é um evento, não uma
  resposta).

**Caráter temporal:**
Varredura linear. A linha de luz percorre o elemento em
velocidade constante. Pode ser acompanhada de uma textura
de scanline que persiste brevemente após a revelação —
como uma foto recém-escaneada que ainda carrega o rastro
do processo.

---

### Metáfora 5 · Interferência (Glitch)

**Referência mecânica:** interferência de sinal, faísca
elétrica, curto-circuito, fita magnética danificada, tubo
de raios catódicos com interferência.

**Sensação:** ruptura momentânea. A imagem ou elemento se
desloca, distorce, fragmenta por uma fração de segundo, depois
retorna ao estado original ou avança para o novo estado. É a
tensão entre controle humano e sistema mecânico.

**Quando usar:**
- Hover sobre elementos interativos (projetos, links,
  navegação).
- Estados de carregamento (enquanto o scanner não começa).
- Erros e estados vazios com personalidade.
- Transição de shaders e texturas.

**Quando NUNCA usar:**
- Como efeito decorativo gratuito.
- Em texto que precisa ser lido (a distorção quebra a
  legibilidade).
- Em elementos que já estão em foco.
- Repetidamente em sequência (perde o impacto).

**Caráter temporal:**
Ruptura breve. Duração mínima necessária para ser percebida
como evento, não como erro permanente. A interferência nunca
deve sugerir que o sistema quebrou — deve sugerir que o
sistema está vivo, que há atrito entre a interface e o meio.

---

## O que NÃO é movimento neste projeto

- **Nunca ease-in-out, ease, ou curvas de Bézier.** Movimento
  orgânico pertence à natureza — este projeto é construído,
  não cultivado.
- **Nunca fade-in suave como transição padrão.** Desvanecer
  é desaparecer. Este projeto revela, expõe, constrói.
- **Nunca scale-up ou zoom-in como efeito de entrada.**
  Elementos não "crescem" — eles são apresentados.
- **Nunca parallax decorativo.** O fundo não é cenário — é
  estrutura. Estrutura não desliza em velocidade diferente.
- **Nunca stagger animation em listas.** A dança sequencial
  de elementos pertence a portfólios de designers — não a
  documentos de engenharia.
- **Nunca scroll hijacking.** O visitante controla o scroll —
  o portfolio não confisca o controle.
- **Nunca animação infinita ou em loop.** Todo movimento
  tem início e fim definidos. Movimento perpétuo é distração,
  não comunicação.

---

## Movimento por tipo de espaço

**Monumental:** nenhum movimento além da aparição inicial.
O monumental é silêncio — o movimento quebraria a solenidade.

**Editorial:** datilográfica para headlines. Scanner para
imagens. Movimento sutil — a leitura é a experiência
principal, não a animação.

**Técnico:** trilho para expansão de projetos. Glitch para
hover. Disjuntor para seleção. Maior variedade de movimentos
— a seção técnica é a mais interativa.

**Arquivístico:** nenhum movimento. Encerramento seco.
A última página não dança.

**Residual:** scanner na transição entre seções.

---

## Movimento e acessibilidade

Se o visitante ativou `prefers-reduced-motion`:

- Todas as metáforas de movimento são substituídas por
  Disjuntor (mudança imediata de estado).
- Exceção: o movimento do scroll permanece, pois é
  controlado pelo visitante, não imposto pelo sistema.
- Texturas de scanline e grain permanecem — são estáticas
  e não causam desconforto vestibular.
- Glitch é completamente removido.

---

## O que nunca fazer com movimento

- Nunca usar movimento sem uma metáfora mecânica declarada.
- Nunca misturar duas metáforas no mesmo elemento simultaneamente.
- Nunca fazer o movimento durar mais que o necessário para
  comunicar a transição.
- Nunca usar movimento como surpresa — o visitante deve
  entender o que aconteceu e por quê.
- Nunca animar elementos que o visitante não interagiu.
- Nunca usar movimento para "dar vida" a uma página estática.
  Páginas estáticas são válidas. Nem tudo precisa se mexer.
