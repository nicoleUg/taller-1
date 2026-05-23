import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js', 'vite.config.ts', 'src/app/components/ui/**', 'src/app/components/figma/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/app/components/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      // 1. Long Method (max lines per function)
      'max-lines-per-function': ['warn', { max: 30, skipBlankLines: true, skipComments: true }],
      // 2. Magic Numbers
      'no-magic-numbers': ['warn', { ignore: [0, 1, -1, 2, 10, 100, 30, 40], enforceConst: true, ignoreArrayIndexes: true }],
      // 3. Complexity
      'complexity': ['warn', { max: 5 }],
      // 4. Poor Naming
      'id-length': ['warn', { min: 3, exceptions: ['id', 'e', 'ci', 'ui', 'x', 'y'] }],
      // 5. Unused Variables (Dead Code)
      '@typescript-eslint/no-unused-vars': ['warn'],
      // 6. Max Params (Long Parameter List)
      'max-params': ['warn', 3],
      // 7. Nested Ternary (Complex UI logic)
      'no-nested-ternary': 'warn',
      // 8. Excessive Logging
      'no-console': 'warn'
    },
  }
);
