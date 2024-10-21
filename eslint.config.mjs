import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        module: 'readonly',
        define: 'readonly',
        exports: 'readonly',
        require: 'readonly',
        importScripts: 'readonly',
      },
    },
    ignores: ['dist/'], // Ignore the 'dist' folder
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
];
