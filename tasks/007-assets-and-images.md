# TASK-007 · Assets and Images

## Objetivo
Implementar o pipeline de assets: fontes, texturas WebP, imagens
com duotone + crop marks, e conteúdo real do portfólio.

## Contexto
Até agora, fontes são placeholders, imagens são mock e conteúdo
é estático. Esta task implementa os scripts de build que geram
assets processados e popula o portfólio com conteúdo real.

## Reading Order
1. `docs/design/11-photography.md`
2. `docs/design/08-material-atmosphere.md`
3. `docs/engineering/07-asset-pipeline.md`
4. `docs/engineering/10-integration-contracts.md` (schemas e dados)
5. `docs/adr/005-content-collections.md`
6. `docs/adr/010-image-pipeline.md`
7. `docs/adr/011-font-loading.md`

## Dependências
- [x] TASK-000 (project bootstrap)

## Dependências de dados (usuário)

Esta task depende de informações que só o autor do portfolio pode fornecer.
Antes de implementar conteúdo, solicite ao usuário:

### Informações pessoais
- [ ] Nome completo
- [ ] Formação (curso, instituição, ano)
- [ ] Área de atuação
- [ ] Localização (cidade, país)
- [ ] Linguagens e tecnologias principais
- [ ] Email de contato
- [ ] URL do GitHub
- [ ] URL do LinkedIn (opcional)

### Conteúdo textual
- [ ] Texto do manifesto (150–300 palavras, seguindo `docs/design/14-copywriting.md`)
- [ ] Nome e descrição de cada projeto (1–2 frases cada)
- [ ] Categoria de cada projeto (`BACKEND`, `SISTEMAS`, `FERRAMENTAS`, etc.)
- [ ] Tecnologias usadas em cada projeto
- [ ] Data/período de cada projeto

### Imagens
- [ ] Screenshots de 3+ projetos (terminal, diagramas, interfaces)
      Colocar em `src/assets/images/projetos/`
      Proporção permitida: 1:1 ou 4:3. NUNCA 16:9.
- [ ] Foto do espaço de trabalho (opcional). Proporção 3:2.
      Colocar em `src/assets/images/contexto/`

### Procedimento

Se o usuário NÃO forneceu dados:
1. Liste explicitamente o que está faltando.
2. Pergunte: "Deseja fornecer os dados agora ou prosseguir com placeholders?"
3. Se placeholders: use os mesmos definidos em TASK-005 e documente
   no `planning/CURRENT.md` (Session Context) o que ficou pendente.
4. NUNCA invente dados pessoais, biografia ou projetos reais.
   Placeholders de conteúdo devem ser genéricos e marcados como `[aguardando]`.

## Critérios de aceite
- [ ] `scripts/build-fonts.ts` faz download e subsetting das 3 famílias (PENDENTE — sem arquivos reais)
- [ ] `scripts/generate-textures.ts` gera texturas (PENDENTE)
- [ ] `scripts/process-images.ts` aplica duotone + crop marks (PENDENTE)
- [ ] Imagens processadas exportadas em AVIF, WebP, PNG (PENDENTE)
- [x] Fontes carregam de `public/fonts/` (não de CDN externo) — @font-face declarado
- [x] `font-display: swap` em todas as @font-face
- [x] `<link rel="preload">` para Bebas Neue no `<head>`
- [x] `src/content/projects/` contém 3 projetos placeholder
- [x] `src/content/manifesto.md` contém texto placeholder
- [x] `src/data/about.ts` contém dados placeholder

## Restrições
- NUNCA usar Google Fonts CDN ou qualquer CDN externo para fontes
- NUNCA usar imagens em cores naturais — duotone é obrigatório
- NUNCA usar proporção 16:9 em imagens
- NUNCA usar imagens de banco (Unsplash, Pexels)
- NUNCA usar mockups de dispositivos (iPhone, laptop flutuando)
- NUNCA usar logotipos de empresas como imagem de projeto
- NUNCA usar `font-display: block` (FOIT) ou `optional` (fonte pode não carregar)
- Conteúdo textual segue `docs/design/14-copywriting.md`

## Fora do escopo
- Shaders WebGL (fase futura)
- Otimização avançada de AVIF (qualidade máxima aceitável é suficiente)
- Conteúdo em inglês (internacionalização futura)

## Entregáveis
- [x] `src/styles/fonts.css` (@font-face Bebas Neue, EB Garamond, JetBrains Mono)
- [ ] `public/fonts/*.woff2` (PENDENTE — arquivos reais nao baixados)
- [ ] `public/textures/*.webp` (PENDENTE)
- [ ] `public/images/` (PENDENTE — sem pipeline de processamento)
- [x] `src/content/projects/*.md` (3 projetos placeholder)
- [x] `src/content/manifesto.md`
- [x] `src/data/about.ts`

## Checklist de implementação
- [ ] 1. Solicitar ao usuário dados faltantes (ver Dependências de dados acima).
      Se dados disponíveis, prosseguir. Se não, documentar pendências e usar placeholders.
- [ ] 2. Implementar `scripts/build-fonts.ts` (download + subsetting)
- [ ] 3. Implementar `scripts/generate-textures.ts` (concrete.webp, paper.webp)
- [ ] 4. Implementar `scripts/process-images.ts` (duotone + crop marks)
- [ ] 5. Rodar scripts e verificar assets gerados
- [ ] 6. Verificar que fontes carregam via @font-face com swap
- [ ] 7. Adicionar `<link rel="preload">` para Space Grotesk Bold
- [ ] 8. Criar `src/content/config.ts` com schema Zod
- [ ] 9. Criar projetos em `src/content/projects/` (mínimo 3)
- [ ] 10. Criar `src/content/manifesto.md`
- [ ] 11. Criar `src/data/about.ts`
- [ ] 12. Atualizar `index.astro` para usar dados das Content Collections
- [ ] 13. Verificar que `astro build` processa conteúdo sem erros

## Checklist de revisão
- [ ] `npm run lint` passa
- [ ] `npx astro check` passa
- [ ] `npm run check:images` passa
- [ ] `npm run build` completa
- [ ] Fontes carregam em `< 500ms` com `font-display: swap`
- [ ] Sem FOIT (texto invisível) durante carregamento
- [ ] Texturas de concreto e papel visíveis
- [ ] Imagens em duotone Blueprint nos projetos
- [ ] Crop marks visíveis nos cantos das imagens
- [ ] Legendas no formato `FIG. NN — descrição — data — contexto`
- [ ] Conteúdo do manifesto segue `docs/design/14-copywriting.md`
- [ ] Sem "Olá", sem "apaixonado", sem "transformar o mundo"
- [ ] Sem imagens em cores naturais
- [ ] Sem fontes de CDN externo
