# 15 · ACESSIBILIDADE

---

## Princípio fundamental

Acessibilidade não é uma camada adicional de requisitos técnicos.
É a consequência natural de um design estruturalmente claro.

Neste projeto, a acessibilidade não é obtida por ARIA labels
e atributos alt — embora estes sejam necessários na implementação.
Ela é obtida por decisões de design que tornam a interface
legível, navegável e compreensível antes de qualquer markup.

---

## Clareza estrutural como acessibilidade

O brutalismo, por definição, expõe estrutura. Esta é a maior
contribuição do projeto para a acessibilidade:

- **Navegação visível e persistente:** o visitante sempre sabe
  onde está. Não há menus escondidos, não há estados
  misteriosos. A estrutura é evidente — inclusive para
  tecnologias assistivas que leem a mesma estrutura.

- **Hierarquia tipográfica clara:** as três vozes (grotesk,
  serif, monospace) são tão distintas entre si que a função
  de cada texto é identificável mesmo sem cor, sem posição,
  sem contexto.

- **Metadados expostos:** datas, categorias, tecnologias —
  tudo visível sem interação. Nada está escondido atrás de
  hover. Leitores de tela e navegação por teclado não perdem
  informação.

- **Grid visível:** as linhas de grid são parte do design —
  não um overlay invisível. Quem navega por teclado ou leitor
  de tela se beneficia da mesma organização espacial que o
  visitante visual.

---

## Contraste como princípio estético e funcional

O projeto não busca contraste mínimo para compliance. Busca
contraste máximo como linguagem visual — e isso beneficia
a acessibilidade automaticamente.

**Relações de contraste naturais do projeto:**
- Preto tinta sobre creme papel (texto principal) — altíssimo
  contraste, adequado para leitura prolongada.
- Preto tinta sobre cinza concreto (headlines) — alto contraste.
- Azul cobalto sobre cinza concreto (metadados) — requer
  verificação de contraste na implementação; se insuficiente,
  escurecer o azul ou clarear o concreto.
- Verde ácido sobre cinza concreto escuro (modo noturno) —
  contraste naturalmente alto (fósforo sobre fundo escuro).

**ATENÇÃO — riscos de contraste:**
- Azul cobalto sobre creme papel pode ter contraste insuficiente.
  Na implementação, verificar e ajustar o tom do azul.
- Texto sobre áreas com textura de concreto intensa pode perder
  legibilidade. A textura deve ser sutil o suficiente nas áreas
  de conteúdo.
- Modo noturno: verificar todos os pares de cor. O que funciona
  no diurno pode não funcionar no noturno.

---

## Navegação por teclado

A estrutura exposta da navegação beneficia a navegação por
teclado:

- **Ordem de tabulação:** segue a ordem visual (esquerda para
  direita, cima para baixo). Coerente com o fluxo de leitura
  editorial.
- **Indicador de foco visível:** o foco do teclado é indicado
  por uma marca de seleção mecânica (bracket ou linha de cota),
  não por um outline azul padrão do navegador. A marca de foco
  pertence ao sistema visual do projeto.
- **Skip link:** um link "Pular para o conteúdo" está disponível
  no início da página — mas é tratado como marca de engenharia,
  não como link genérico.
- **Atalhos:** não há atalhos de teclado personalizados. Eles
  conflitam com tecnologias assistivas e introduzem complexidade
  desnecessária.

---

## Redução de movimento

O projeto respeita `prefers-reduced-motion`:

- **Todas as metáforas de movimento** (datilográfica, trilho,
  scanner, glitch) são substituídas por Disjuntor (mudança
  imediata de estado).
- **Grain e texturas estáticas** permanecem — não causam
  desconforto vestibular.
- **Scanlines** permanecem — são estáticas.
- **Glitch** é completamente removido — é o comportamento
  com maior potencial de desconforto.
- **Scroll** permanece controlado pelo visitante (nunca
  confiscado pelo portfolio — Princípio: não usar scroll
  hijacking).

A experiência sem movimento não é uma versão "degradada".
É simplesmente uma versão mais direta — e o brutalismo
lida bem com o direto.

---

## Conteúdo textual acessível

**Textos alternativos em imagens:**
Toda imagem possui descrição textual. A descrição segue o
padrão arquivístico:

- Formato: `FIG. NN — DESCRIÇÃO CONCISA DO CONTEÚDO — DATA`
- A descrição é factual, não poética.
- Exemplo bom: "Diagrama de arquitetura mostrando três serviços
  conectados por um message broker."
- Exemplo ruim: "Uma bela ilustração do sistema funcionando
  em harmonia."

**Hierarquia de headings:**
- Um único h1 (o nome do portfolio no Hero).
- h2 para títulos de seção (Manifesto, Projetos, Contato).
- h3 para subtítulos dentro de seções.
- Nenhum heading skipping (pular de h1 para h3).

**Landmarks:**
A estrutura de landmarks (header, main, nav, footer) reflete
a estrutura visual do edifício: navegação = viga, main =
pavimento, footer = placa de obra.

---

## Acessibilidade e atmosfera material

Texturas, ruídos e imperfeições NÃO devem reduzir a
acessibilidade:

- **Texto nunca é texturizado.** A textura está no fundo,
  não na frente. O texto é sempre nítido — preto tinta
  sólido, sem grain, sem scanlines.
- **Áreas interativas nunca são obscurecidas por textura.**
  Links, navegação, elementos clicáveis são sempre
  visualmente distintos.
- **Modo de alto contraste:** se o sistema operacional ou
  navegador ativar modo de alto contraste, todas as texturas
  são removidas. Restam apenas cores estruturais (preto,
  cinza, azul) como superfícies planas. O projeto não luta
  contra o modo de alto contraste — ele se rende a ele.

---

## Idioma e localização

O conteúdo principal é escrito em português (Brasil).
A marcação de idioma (`lang="pt-BR"`) é obrigatória.

Termos técnicos em inglês (nomes de tecnologias, linguagens,
conceitos de engenharia) permanecem em inglês — são
estrangeirismos funcionais, não erros de tradução.

O leitor de tela deve ser informado corretamente do idioma
da página e de eventuais trechos em inglês.

---

## O que nunca fazer em acessibilidade

- Nunca depender exclusivamente de cor para transmitir
  informação (o azul cobalto indica metadados, mas a
  posição e a fonte monospace também o fazem).
- Nunca esconder conteúdo atrás de interação (hover, clique)
  sem equivalente estático.
- Nunca usar animação contínua ou em loop (viola WCAG
  2.2.2 Pause, Stop, Hide).
- Nunca usar foco customizado que seja menos visível que
  o padrão do navegador.
- Nunca remover o outline de foco sem substituí-lo por
  indicador igualmente visível.
- Nunca usar target size menor que o recomendado para
  áreas interativas — mesmo que "fique mais bonito".
- Nunca esquecer que acessibilidade é parte do design,
  não uma camada adicional de conformidade.
