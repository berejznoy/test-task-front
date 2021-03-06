module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "plugin:nuxt/recommended"
  ],
  plugins: [
    "nuxt"
  ],
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-closing-bracket-newline': 'off',
    'indent': [2, 'tab'],
    'no-tabs': 'off',
    "quotes": ["warn", "double", { "allowTemplateLiterals": true }],
    "vue/require-prop-types": "off",
    "no-prototype-builtins": "off",
    "quote-props": ["warn", "consistent"],
    "import/namespace": "off",
    "vue/order-in-components": "off"
  }
};
