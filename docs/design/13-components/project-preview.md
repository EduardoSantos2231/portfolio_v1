# 13 · COMPONENTE: PROJECT PREVIEW

---

## Função narrativa

O Project Preview é a unidade atômica da seção de Projetos.
É a ficha catalográfica de um projeto — a representação
mínima que permite ao visitante identificar, avaliar e
decidir se quer explorar mais.

Cada Project Preview é uma célula do grid. Juntas, formam
o arquivo de projetos.

---

## Estrutura

Cada Project Preview é uma unidade retangular composta por:

```
+-----------------------------+
|                             |
|                             |
|      [IMAGEM 1:1]          |
|      Duotone Blueprint      |
|                             |
|                             |
+-----------------------------+
| NOME DO PROJETO             |
| grotesk medium · preto tinta|
+-----------------------------+
| 2024 · CATEGORIA            |
| monospace · azul cobalto    |
+-----------------------------+
| go · postgres · redis       |
| monospace · preto tinta     |
+-----------------------------+
```

**Imagem do projeto:**
- Proporção 1:1.
- Tratamento: duotone Blueprint (azul cobalto + preto tinta).
- Margem interna com marcas de corte editoriais nos cantos.
- Scanlines sutis sobre a imagem.
- Quando o projeto não possui imagem (código puro, biblioteca,
  CLI), usar uma representação abstrata: diagrama de arquitetura
  simplificado, output de terminal estilizado, ou textura de
  código como padrão visual.

**Título:**
Grotesk medium. Alinhado à esquerda. Uma linha, sem quebra.
Nome do projeto — não frase descritiva.

**Metadados primários:**
Data (ano ou período) e categoria. Monospace. Azul cobalto.
Separados por `·`. Ex: `2024 · BACKEND`

**Metadados secundários:**
Tecnologias principais. Monospace. Preto tinta. Tamanho
reduzido. Separadas por `·`. Ex: `go · postgres · redis`

---

## Sensação

Cada Project Preview deve parecer uma ficha de arquivo ou
uma entrada de catálogo de biblioteca.

Não é um "card". Não é um "thumbnail". Não é uma "vitrine".
É um registro. A beleza está na precisão da informação, não
na decoração do recipiente.

Quando o visitante olha para o grid, deve ver um arquivo
organizado. Como um bibliotecário vê uma estante — cada
lombada com sua referência, cada livro em seu lugar.

---

## Estados da ficha

**Estado padrão (repouso):**
Todos os elementos visíveis. Nenhuma supressão de informação.
A estrutura é exposta — princípio brutalista.

**Estado hover:**
- A linha de grid ao redor da célula sofre interferência
  (glitch) breve.
- A imagem recebe um overlay de scanner (banda horizontal
  que percorre a imagem de cima a baixo em velocidade
  constante, revelando-a como se estivesse sendo digitalizada
  naquele momento).
- O título e metadados permanecem inalterados (informação
  não pode ser degradada pela interação).

**Estado focado (navegação por teclado):**
- A linha de grid ao redor da célula muda para aço mais
  espesso e recebe uma marca de seleção (como um bracket
  ou colchete na lateral esquerda).
- A marca de foco é derivada de cotas arquitetônicas —
  uma linha vertical com pequenos traços nas extremidades,
  posicionada à esquerda da célula.

**Estado expandido (após clique/seleção):**
Não pertence ao Project Preview — a expansão é tratada na
página de detalhe do projeto (que pode ser uma view separada
ou uma expansão inline via trilho vertical).

---

## O que nunca fazer no Project Preview

- Nunca esconder metadados atrás de hover (viola Princípio 1).
- Nunca usar sombra projetada para destacar o hover (cartão
  flutuante).
- Nunca usar scale-up no hover (o projeto não "cresce" —
  ele é uma célula fixa no grid).
- Nunca usar gradientes sobre a imagem para melhorar
  legibilidade do título. O título está abaixo da imagem,
  sobre fundo sólido — não sobre a imagem.
- Nunca usar cantos arredondados na imagem ou na célula.
- Nunca usar badges, chips, pills ou tags coloridas para
  tecnologias ou categorias.
- Nunca omitir a imagem e deixar apenas texto (a imagem —
  ou representação abstrata — é parte estrutural da ficha).

---

## Comportamento responsivo

**Amplo (desktop):** a ficha mantém todos os elementos em
proporção confortável. Imagem 1:1 generosa. Metadados
completos.

**Médio (tablet):** a imagem reduz proporcionalmente.
Metadados secundários podem ser suprimidos se o espaço
for insuficiente.

**Estreito (mobile):** a ficha ocupa a largura total.
Layout pode mudar para horizontal (imagem à esquerda,
metadados à direita) se a largura permitir, ou manter-se
vertical com todos os metadados visíveis.
