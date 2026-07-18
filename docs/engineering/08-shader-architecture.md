# 08 · ARQUITETURA DE SHADERS

> Origem: `docs/design/09-surface-and-tactility.md`
> Origem: `docs/design/07-temporal-behavior.md` (Scanner)
> Origem: `docs/design/05-chromatic-atmosphere.md`

---

## Status

**Fase atual (MVP):** Níveis 0–2 de textura (cores planas, SVG filters,
texturas WebP estáticas). Identidade visual completa sem shaders.

**Fase futura:** Nível 3 (WebGL2 shaders) como aprimoramento opcional.
Implementação planejada para sprints posteriores. Este documento
especifica a arquitetura completa para que a implementação futura
seja previsível e não exija reestruturação.

---

## Objetivos visuais

WebGL shaders têm três propósitos neste projeto. Nenhum deles é
decorativo. Cada um simula um comportamento material que texturas
estáticas não podem reproduzir:

### 1. Concreto com iluminação reativa (`concrete-light`)

**O que faz:** A posição do cursor age como fonte de luz pontual sobre
superfícies de concreto. O micro-relevo (normals simuladas via ruído
Perlin 3D) reflete a luz de forma variável, revelando a textura da
superfície em tempo real.

**Sensação:** Como passar a mão sobre uma parede de concreto e sentir
aspereza onde a luz revela relevo. Não é animação contínua — só reage
quando o cursor se move.

**Onde:** `HeroSection` e `ResidualSpace`.

### 2. Scanner de mesa (`scanner-overlay`)

**O que faz:** Uma banda horizontal de luz percorre uma imagem de cima
a baixo, revelando-a progressivamente. Substitui o overlay CSS do
nível 2 com um efeito mais realista: a luz do scanner tem intensidade
variável dentro da banda (não é uma faixa uniforme), com glow
assimétrico e leve distorção nas bordas.

**Sensação:** Como colocar uma foto no scanner e vê-la ser digitalizada
linha por linha.

**Onde:** `ProjectPreview` hover e carregamento inicial.

### 3. Papel com resposta à leitura (`paper-fiber`)

**O que faz:** Micro-deslocamento da textura de fibra do papel
conforme o scroll. Conforme o visitante lê e desce a página, a
luz sobre o papel muda sutilmente de ângulo — como se o papel
realmente estivesse sendo iluminado por uma janela, e o ângulo
de visão mudasse com o movimento.

**Sensação:** Como ler um livro físico onde a luz da janela
incide em ângulos ligeiramente diferentes conforme você vira
as páginas.

**Onde:** `ManifestoSection`, `AboutSection`.

---

## Interfaces de software

### Contrato de shader

```ts
// src/shaders/types.ts

export interface ShaderProgram {
  /** Nome único do shader */
  name: 'concrete-light' | 'scanner-overlay' | 'paper-fiber';

  /** Fonte GLSL do fragment shader */
  fragmentShader: string;

  /** Fragment shader mínimo para vertex (screen-space quad) */
  vertexShader: string;

  /** Uniformes iniciais */
  uniforms: Record<string, UniformValue>;

  /** Chamado quando o canvas é montado no DOM */
  onMount: (gl: WebGL2RenderingContext, program: WebGLProgram) => void;

  /**
   * Atualiza uniformes com a posição do cursor.
   * Coordenadas normalizadas [0, 1] relativas ao canvas.
   * Chamado a cada frame apenas se o cursor se moveu.
   */
  onPointerMove?: (
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    x: number,
    y: number
  ) => void;

  /**
   * Atualiza uniformes com o scroll da página.
   * Chamado a cada frame apenas se houve scroll.
   */
  onScroll?: (
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    scrollY: number
  ) => void;

  /** Chamado quando o canvas é removido do DOM */
  onDestroy: (gl: WebGL2RenderingContext, program: WebGLProgram) => void;
}

export type UniformValue =
  | { type: 'float'; value: number }
  | { type: 'vec2'; value: [number, number] }
  | { type: 'vec3'; value: [number, number, number] }
  | { type: 'vec4'; value: [number, number, number, number] }
  | { type: 'int'; value: number }
  | { type: 'sampler2D'; value: WebGLTexture };
```

### Registro de shaders

```ts
// src/shaders/registry.ts
import { concreteLight } from './concrete-light';
import { scannerOverlay } from './scanner-overlay';
import { paperFiber } from './paper-fiber';
import type { ShaderProgram } from './types';

export const shaders: Record<string, ShaderProgram> = {
  'concrete-light': concreteLight,
  'scanner-overlay': scannerOverlay,
  'paper-fiber': paperFiber,
};
```

### Montagem em Surface

```ts
// src/components/primitives/Surface.ts (ilha parcial, apenas para shader)

interface SurfaceShaderProps {
  material: 'concrete-raw' | 'paper';
  shader: ShaderProgram;
  enabled: boolean;
}

function mountShader(
  container: HTMLElement,
  { material, shader, enabled }: SurfaceShaderProps
): () => void {
  if (!enabled) return () => {};

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none';
  container.style.position = 'relative';
  container.appendChild(canvas);

  const gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
  });

  if (!gl) {
    canvas.remove();
    return () => {};
  }

  // Configuração do programa...
  const program = createProgram(gl, shader.vertexShader, shader.fragmentShader);
  shader.onMount(gl, program);

  let rafId: number;
  let needsRender = false;

  function render() {
    if (needsRender) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      needsRender = false;
    }
    rafId = requestAnimationFrame(render);
  }

  // ... event listeners para pointermove e scroll chamam needsRender = true

  return () => {
    cancelAnimationFrame(rafId);
    shader.onDestroy(gl, program);
    canvas.remove();
  };
}
```

---

## Critérios de ativação (Nível 3)

```ts
// src/utils/shader-detector.ts

export function canUseShaders(): boolean {
  if (typeof window === 'undefined') return false;

  // Canvas + WebGL2
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
  if (!gl) return false;

  // Sem redução de movimento
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  // Sem salvamento de dados
  if (window.matchMedia('(prefers-reduced-data: reduce)').matches) return false;

  // Hardware mínimo
  const cores = navigator.hardwareConcurrency || 0;
  const memory = (navigator as any).deviceMemory || 0;
  if (cores < 4 && memory < 4) return false;

  // Sem alto contraste
  if (window.matchMedia('(forced-colors: active)').matches) return false;

  // Conexão não lenta
  const connection = (navigator as any).connection;
  if (connection?.saveData === true) return false;
  if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return false;

  return true;
}
```

---

## Especificação dos shaders

### concrete-light

```glsl
// concrete-light.frag
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;       // posição do cursor [0,1]
uniform float u_time;       // tempo desde mount (para seed do ruído)
uniform float u_intensity;  // 0.0–1.0 (controlado por prefers-reduced-motion)

// Ruído Perlin 3D para simular relevo do concreto
// Adaptado de https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83

float hash(vec3 p) { /* ... */ }
float noise(vec3 p) { /* 3 oitavas de Perlin */ }

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  // Normal simulada a partir do ruído
  float n = noise(vec3(uv * 8.0, 1.0));
  vec3 normal = normalize(vec3(
    noise(vec3(uv * 8.0 + 0.01, 1.0)) - n,
    noise(vec3(uv * 8.0 + vec2(0.0, 0.01), 1.0)) - n,
    1.0
  ));

  // Luz pontual na posição do cursor
  vec3 lightPos = vec3(u_mouse, 0.5);
  vec3 lightDir = normalize(lightPos - vec3(uv, 0.0));
  float diffuse = max(dot(normal, lightDir), 0.0) * 0.15 * u_intensity;

  // Cor base do concreto
  vec3 concreteColor = vec3(0.831, 0.812, 0.784); // #D4CFC8

  // Revelar relevo: iluminar áreas voltadas para a luz
  vec3 color = concreteColor + diffuse * 0.3;

  // Micro-porosidade (escurece áreas com ruído negativo)
  color -= abs(n) * 0.03;

  gl_FragColor = vec4(color, 0.3); // alpha para blend com fundo CSS
}
```

### scanner-overlay

```glsl
// scanner-overlay.frag
precision highp float;

uniform vec2 u_resolution;
uniform float u_progress;    // 0.0–1.0 (posição da banda de scanner)
uniform sampler2D u_texture; // textura da imagem sendo escaneada
uniform float u_intensity;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  // Banda horizontal com glow assimétrico
  float bandPos = u_progress; // posição da banda [0,1]
  float dist = abs(uv.y - bandPos);
  float band = smoothstep(0.1, 0.0, dist)          // borda superior (sharp)
             * smoothstep(0.0, 0.025, bandPos - uv.y); // glow inferior

  // Cor da luz do scanner
  vec3 lightColor = vec3(0.165, 0.361, 0.541); // #2A5C8A (cobalt-blue)

  // Textura da imagem (visível apenas acima da banda)
  vec4 texColor = texture2D(u_texture, uv);
  float reveal = smoothstep(bandPos + 0.005, bandPos, uv.y);

  vec3 color = mix(texColor.rgb, lightColor, band * 0.4 * u_intensity);
  float alpha = reveal * (1.0 - band * 0.3 * u_intensity);

  // Scanlines sobre a área revelada
  float scanline = sin(uv.y * u_resolution.y * 3.14159) * 0.03 * reveal;

  gl_FragColor = vec4(color + scanline, alpha);
}
```

### paper-fiber

```glsl
// paper-fiber.frag
precision highp float;

uniform vec2 u_resolution;
uniform float u_scroll;      // scrollY normalizado
uniform float u_intensity;

// Ruído com directional bias para simular fibras
float fiberNoise(vec2 uv) { /* ruído com frequência maior em X que em Y */ }

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  // Micro-deslocamento baseado no scroll
  vec2 displacedUV = uv + vec2(
    fiberNoise(uv * 20.0 + u_scroll * 0.01) * 0.002,
    fiberNoise(uv * 20.0 + u_scroll * 0.02 + 5.0) * 0.002
  );

  float fiber = fiberNoise(displacedUV * 30.0) * u_intensity;

  // Cor base do papel
  vec3 paperColor = vec3(0.961, 0.941, 0.910); // #F5F0E8

  // Variação sutil de iluminação
  vec3 color = paperColor + fiber * 0.02;

  // Impurezas (pontos escuros)
  float impurity = step(0.98, fiberNoise(uv * 100.0));
  color -= impurity * 0.04;

  gl_FragColor = vec4(color, 0.15); // alpha para blend com fundo CSS
}
```

---

## Restrições de implementação

1. **Shaders nunca afetam texto.** O texto é renderizado pelo DOM sobre
   o `<canvas>`. O shader ocupa uma camada de fundo (`z-index: 0`), o
   conteúdo (Text, imagens) está em `z-index: 1+`.

2. **Shaders nunca animam continuamente.** O render loop só executa se
   `needsRender === true` (cursor moveu ou scroll mudou). Sempre que
   possível, entra em estado dormente (`requestAnimationFrame` retorna
   sem desenhar).

3. **Canvas é destruído quando a seção sai da viewport.** Via
   `IntersectionObserver` com `threshold: 0`.

4. **Nenhum polyfill.** Se WebGL2 não está disponível, permanece no
   nível 2 (texturas estáticas) — experiência idêntica conceitualmente.

5. **Fallback visual imediato.** Enquanto o shader carrega (WebGL
   inicialização), a textura CSS do nível 1 ou 2 é exibida. Não há
   "tela preta" ou "loading".

6. **Shaders respeitam `prefers-color-scheme`.** Uniformes de cor
   (concreteColor, paperColor) são injetados a partir dos tokens
   CSS — `var(--foundation-color-concrete-light)` lido via
   `getComputedStyle()` e convertido para `vec3`.

---

## Plano de fases

| Fase | Sprint | Escopo |
|---|---|---|
| **0** | Atual | Níveis 0–2. Identidade completa sem shaders. |
| **1** | Futuro | `concrete-light` no `HeroSection` e `ResidualSpace`. |
| **2** | Futuro | `scanner-overlay` nos `ProjectPreview`. Remove overlay CSS. |
| **3** | Futuro | `paper-fiber` no `ManifestoSection` e `AboutSection`. |
| **4** | Futuro | Otimização: VRAM budgeting, fallback para GPU integradas. |

Cada fase é independente — implementar a fase 2 não exige ter
implementado a fase 1.

---

## Testes de shader

```ts
// src/shaders/__tests__/compile.test.ts
// Testa que todos os fragment shaders compilam sem erros

import { shaders } from '../registry';

describe('Shader compilation', () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    it.skip('WebGL2 not available in test environment');
    return;
  }

  Object.entries(shaders).forEach(([name, shader]) => {
    it(`${name} compiles`, () => {
      const vs = compileShader(gl, gl.VERTEX_SHADER, shader.vertexShader);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, shader.fragmentShader);
      expect(vs).not.toBeNull();
      expect(fs).not.toBeNull();
      gl.deleteShader(vs!);
      gl.deleteShader(fs!);
    });
  });
});
```
