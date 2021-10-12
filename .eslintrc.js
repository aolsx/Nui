module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-strongly-recommended",
    "eslint:recommended"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    // "parser": "babel-eslint",
    "sourceType": "module"
  },
  "rules": {
    "vue/html-closing-bracket-newline": [
      "warn",
      {"multiline": "never"}
    ],
    "vue/component-name-in-template-casing": [
      "warn",
      "kebab-case",
      {"registeredComponentsOnly": false}
    ],
    "no-console": "off",
    "no-unused-vars": "warn",
    "no-multi-spaces": "warn",
    "indent": [
      "warn",
      2
    ],
    "array-bracket-newline": [
      "warn",
      {
        "multiline": true
      }
    ],
    "array-bracket-spacing": ["warn"],
    "array-element-newline": [
      "warn",
      "consistent"
    ],
    "block-spacing": [
      "warn",
      "never"
    ],
    "comma-spacing": [
      "warn",
      {
        "before": false,
        "after": false
      }
    ],
    "computed-property-spacing": [
      "warn",
      "never",
      {
        "enforceForClassMembers": true
      }
    ],
    "func-call-spacing": [
      "warn",
      "never"
    ],
    "function-call-argument-newline": [
      "warn",
      "consistent"
    ],
    "function-paren-newline": [
      "warn",
      "never"
    ],
    "key-spacing": [
      "warn",
      {
        "beforeColon": false,
        "afterColon": true
      }
    ],
    "keyword-spacing": [
      "warn",
      {
        "before": true,
        "after": true
      }
    ],
    "newline-per-chained-call": [
      "warn",
      {
        "ignoreChainWithDepth": 2
      }
    ],
    "no-whitespace-before-property": "warn",
    "object-curly-newline": [
      "warn",
      {
        "consistent": true
      }
    ],
    "object-curly-spacing": [
      "warn",
      "never"
    ],
    "operator-assignment": [
      "warn",
      "always"
    ],
    "operator-linebreak": [
      "warn",
      "after"
    ],
    "semi": [
      "warn",
      "always",
      {
        "omitLastInOneLineBlock": true
      }
    ],
    "semi-spacing": [
      "warn",
      {
        "before": false,
        "after": true
      }
    ],
    "semi-style": [
      "warn",
      "last"
    ],
    "space-before-blocks": [
      "warn",
      "never"
    ],
    "space-before-function-paren": [
      "warn",
      "never"
    ],
    "space-in-parens": [
      "warn",
      "never"
    ],
    "spaced-comment": [
      "warn",
      "always"
    ],
    "arrow-body-style": [
      "warn",
      "as-needed"
    ],
    "arrow-spacing": [
      "warn",
      {
        "before": false,
        "after": false
      }
    ],
    "prefer-template": "warn",
    "template-curly-spacing": "warn",
    "space-infix-ops": "warn"
  },
  "globals": {
    "APP": true,
    "CloudAPI": true,
    "EleApi": true
  }
};