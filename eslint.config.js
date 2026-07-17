import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/', '.astro/'],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      'no-restricted-properties': [
        'error',
        {
          object: 'Math',
          property: 'random',
          message: 'Glitch usa keyframes fixas, não Math.random() no runtime.',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                'framer-motion',
                'gsap',
                'animejs',
                '@react-spring/*',
              ],
              message:
                'Bibliotecas de animação proibidas. Usar o sistema de motion (05-motion-system.md).',
            },
            {
              group: [
                '@radix-ui/*',
                '@headlessui/*',
                'shadcn*',
                'lucide-*',
                '@phosphor-icons/*',
              ],
              message:
                'Bibliotecas de componentes e ícones proibidas. Ver ADR-003.',
            },
          ],
        },
      ],
    },
  },
);
