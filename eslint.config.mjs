import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  prettierConfig,
  {
    files: ['**/*.ts'],
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier: prettierPlugin,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
    },

    rules: {
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
      ],
    },
  },
]
