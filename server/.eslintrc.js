module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "env": {
    "es6": true,
    "es2017": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parserOptions": {
    "project": './tsconfig.json',
    "tsconfigRootDir": __dirname
  },
  "rules": {
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-var-requires": "off",
    '@typescript-eslint/no-unnecessary-type-assertion': 2,
    "one-var": [2, {
      "var": "never",
      "let": "never",
      "const": "never"
    }]
  }
}
