# 12 · COMPOSIÇÃO

---

## Princípio fundamental

Composição é a arte de posicionar elementos para guiar o olhar.

Neste projeto, a composição não busca harmonia — busca tensão
controlada. Não busca centralidade — busca assimetria com
propósito. Não busca preenchimento — busca peso distribuído
com intenção.

---

## Os três eixos da composição

### Eixo 1 · Tensão

Elementos não se acomodam — eles se tensionam.

A tensão é produzida por:
- Assimetria. Um bloco de texto à esquerda, um vazio à direita.
  O olhar sente o desequilíbrio e o investiga.
- Proximidade sem contato. Dois elementos próximos mas não
  alinhados criam um campo de força entre eles — o olhar oscila.
- Contraste de massa. Um elemento muito grande próximo a um
  elemento muito pequeno. O olhar é puxado pelo grande,
  depois investiga o pequeno.

A tensão nunca é caótica. É a tensão de uma estrutura bem
calculada — como uma viga que apoia em apenas um lado.
O engenheiro calculou. O olhar confia.

---

### Eixo 2 · Peso

Todo elemento visual possui peso. A composição distribui pesos.

Fatores que aumentam o peso:
- Tamanho (maior = mais pesado).
- Cor escura sobre fundo claro (preto tinta sobre creme
  papel pesa mais que azul cobalto sobre o mesmo fundo).
- Densidade (texto compacto pesa mais que texto arejado).
- Posição (um elemento no topo pesa menos que o mesmo
  elemento na base — a gravidade visual puxa para baixo).
- Isolamento (um elemento sozinho em espaço vazio pesa
  mais do que o mesmo elemento em grupo).

Fatores que reduzem o peso:
- Cor clara sobre fundo escuro (inversão).
- Textura (um elemento texturizado parece mais leve que um
  sólido — a textura quebra a massa).
- Fragmentação (vários elementos pequenos distribuem o peso).
- Proximidade à borda (elementos na borda parecem apoiados —
  o peso é transferido para a margem).

A composição usa peso para guiar o olhar em sequência:
elemento mais pesado primeiro, depois os mais leves em
ordem decrescente.

---

### Eixo 3 · Direção

O olhar se move pela página como quem lê: da esquerda para
a direita, de cima para baixo.

Mas a composição pode acelerar, desacelerar ou redirecionar
esse fluxo:

**Aceleração:** elementos alinhados horizontalmente conduzem
o olhar rapidamente. Setas, linhas, regras — tudo que é
horizontal convida à varredura rápida.

**Desaceleração:** elementos verticais ou em diagonal freiam
o olhar. Uma coluna de texto estreita desacelera a leitura
(mais quebras de linha). Um elemento isolado no centro da
página interrompe o fluxo — o olhar para.

**Redirecionamento:** uma linha diagonal ou uma quebra no
alinhamento muda a direção do olhar. Usado com moderação —
o redirecionamento constante causa fadiga.

**Âncora:** um elemento muito pesado no canto inferior
direito ancora o olhar no fim da página — funciona como
ponto final.

---

## Composição por tipo de espaço

### Composição Monumental

**Objetivo:** impacto silencioso.
**Estratégia:** assimetria extrema. Um elemento no terço
superior esquerdo. O resto é vazio. O vazio pressiona o
elemento — quanto mais vazio, mais peso o elemento adquire.
**Exemplo ASCII:**

```
+----------------------------------+
|                                  |
|  CONCRETO,                       |
|  MENTE E                         |
|  TRÓPICOS                        |
|                                  |
|  engenharia de software          |
|                                  |
|                                  |
|                                  |
|                                  |
|                                  |
|                                  |
|                                  |
+----------------------------------+
```

O nome ocupa o quadrante superior esquerdo. O resto é concreto.
Nenhum outro elemento compete. O olhar encontra o nome, depois
vagueia pelo vazio, depois retorna ao nome.

---

### Composição Editorial

**Objetivo:** leitura imersiva.
**Estratégia:** coluna única ou coluna principal com notas
marginais. Margens laterais amplas e assimétricas (margem
esquerda ≠ margem direita). A mancha de texto se posiciona
levemente à direita do centro — referência ao design editorial
suíço.
**Exemplo ASCII:**

```
+----------------------------------+
|          |                       |
|          |  O manifesto começa   |
|          |  aqui. O texto corre  |
|          |  em coluna deslocada  |
|          |  para a direita.      |
|          |                       |
|          |  A margem esquerda    |
|   NOTA   |  é maior — abriga     |
|   AZUL   |  anotações em azul    |
|          |  cobalto, como se     |
|          |  fossem comentários   |
|          |  manuscritos.         |
|          |                       |
+----------------------------------+
```

A margem esquerda é território do azul cobalto (pensamento
em processo). A margem direita é respiro. O texto ocupa
60–70% da largura total. A assimetria é deliberada e
consistente ao longo de toda a seção.

---

### Composição Técnica

**Objetivo:** exploração ativa.
**Estratégia:** grid de múltiplas colunas com densidade
alta. Cada projeto ocupa uma célula do grid. O olhar não
lê — escaneia.
**Exemplo ASCII:**

```
+----------------------------------+
| [PROJ A] [PROJ B] [PROJ C]      |
| [PROJ D] [PROJ E] [PROJ F]      |
| [PROJ G] [PROJ H] [PROJ I]      |
+----------------------------------+
```

O grid é regular — todos os projetos têm o mesmo tamanho
e peso. A diferenciação está no conteúdo de cada célula
(imagem, título, metadados). As linhas do grid são visíveis
(regras de aço separando as células). O olhar não tem um
ponto de entrada único — pode começar por qualquer projeto.

**Variação de destaque:**
O primeiro projeto ou o projeto selecionado pode ocupar
o dobro de largura — como uma ficha catalográfica em
destaque:

```
+----------------------------------+
| [PROJ A  ][PROJ B] [PROJ C]     |
| [DESTAQUE] [PROJ E] [PROJ F]    |
| [PROJ G] [PROJ H] [PROJ I]      |
+----------------------------------+
```

Esta quebra no grid é o único momento em que a regularidade
é rompida — e a quebra comunica hierarquia.

---

### Composição Arquivística

**Objetivo:** encerramento funcional.
**Estratégia:** elementos alinhados como ficha catalográfica.
Sem assimetria expressiva — a funcionalidade dita o layout.
**Exemplo ASCII:**

```
+----------------------------------+
|                                  |
|  CONTATO                         |
|                                  |
|  nome          coordenada 1      |
|  email         coordenada 2      |
|  localização   coordenada 3      |
|                                  |
|  [INFORMAÇÕES ADICIONAIS]        |
|                                  |
+----------------------------------+
```

Layout de duas colunas com pesos iguais — como uma tabela
de especificações. Não há surpresa composicional no
encerramento. A previsibilidade comunica confiabilidade.

---

### Composição Residual

**Objetivo:** respiro.
**Estratégia:** ausência de composição. Apenas a textura
do concreto ocupa o espaço. Nenhum elemento para compor.
O Espaço Residual é uma pausa na composição, não uma
composição de pausa.
**Exemplo ASCII:**

```
+----------------------------------+
| ·  ·  ·   ·    ·  ·   · ·   ·   |
|   ·  · ·    ·  ·   · ·   ·   · ·|
| ·   ·  ·   ··   ·  ·   ·   · ·  |
|  ·  ·   · ·   ·  ··   ·  ·   · ·|
+----------------------------------+
```

Apenas textura de concreto. Sem elementos. Sem hierarquia.
Sem direção.

---

## Assimetria como regra, simetria como exceção

**Regra geral:** a composição é assimétrica.
**Exceções permitidas:**

1. Grid de projetos na seção técnica — o grid é regular
   por função (catálogo), não por estética.
2. Tabelas de especificações na seção de contato.
3. Marcas de registro nos cantos da página (simétricas
   por definição editorial).

Fora desses casos, a simetria é proibida. Simetria não
intencional comunica template. Assimetria comunica
construção.

---

## O olhar do visitante: percurso esperado

Para cada seção, o olhar deve seguir um percurso específico:

**Monumental:**
1. Nome (impacto imediato — é o elemento mais pesado).
2. Subtítulo (próximo, menor, confirma o contexto).
3. Vazio (o olhar vagueia, sente o espaço, o concreto).
4. Retorno ao nome (o vazio empurra de volta).

**Editorial:**
1. Título da seção (grotesk, ancora o topo).
2. Lead ou primeiro parágrafo (entrada do texto).
3. Notas marginais (azul cobalto — o olhar alterna entre
   texto principal e anotações como em um livro comentado).
4. Citações destacadas (serif italic, quebram o ritmo de
   leitura com um momento de pausa reflexiva).

**Técnico:**
1. Varredura do grid (o olhar percorre as células buscando
   padrões — imagens, títulos, cores).
2. Foco em um projeto (o olhar pousa em um item específico).
3. Leitura de metadados (o olhar desce para as informações
   em monospace).
4. Retorno ao grid (o olhar volta a escanear).

**Arquivístico:**
1. Título da seção (indica o fim).
2. Informações de contato (leitura vertical, funcional).
3. Fim (o olhar não retorna — a página termina aqui).

---

## O que nunca fazer com composição

- Nunca centralizar elementos como padrão.
- Nunca distribuir elementos uniformemente "para equilibrar".
- Nunca usar simetria bilateral sem justificativa funcional.
- Nunca posicionar elementos sem considerar o percurso do olhar.
- Nunca deixar duas seções consecutivas com a mesma estratégia
  composicional.
- Nunca preencher o espaço disponível apenas porque ele existe.
- Nunca usar grids que não estejam visíveis (grid invisível é
  estrutura escondida — viola o Princípio 1).
- Nunca alinhar elementos verticalmente sem ancoragem
  horizontal. O alinhamento deve ser perceptível como decisão,
  não como padrão de software.
