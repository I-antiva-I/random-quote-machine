module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      // List of most common ESLint rules
    'no-unused-vars': 'off', // Off because @typescript-eslint/no-unused-vars will cover this
    'vue/no-unused-components': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'], // Warn on unused variables
    '@typescript-eslint/no-explicit-any': 'warn', // Warn when 'any' type is used
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable the need to explicitly define return types
    '@typescript-eslint/no-inferrable-types': 'off', // Allow explicit types for variables and parameters even when they can be inferred
    '@typescript-eslint/no-non-null-assertion': 'warn', // Warn on usage of non-null assertions (e.g., `someVar!`)
    '@typescript-eslint/ban-ts-comment': 'off', // Allow @ts-ignore, @ts-nocheck, etc.
    '@typescript-eslint/consistent-type-imports': 'warn', // Prefer consistent usage of type imports
    '@typescript-eslint/explicit-function-return-type': 'off', // Turn off explicit return types on functions (could be 'warn' or 'error' depending on preference)
    '@typescript-eslint/no-empty-function': 'warn', // Warn when empty functions are defined
    '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }], // Prefer using `Type[]` or `Array<Type>`
    '@typescript-eslint/prefer-optional-chain': 'error', // Prefer using optional chaining (`?.`) over chaining `&&`
    '@typescript-eslint/no-extra-semi': 'error', // Disallow unnecessary semicolons
  }
}
