import eslint from "@eslint/js"
import {
  config as tseslintConfig,
  parser as tseslintParser,
  plugin as tseslintPlugin,
} from "typescript-eslint"
import globals from "globals"
import pluginImport from "eslint-plugin-import"
import pluginVitest from "@vitest/eslint-plugin"
import { fixupPluginRules } from "@eslint/compat"

export default tseslintConfig(
  {
    files: ["**/*.js", "**/*.mjs", "**/*.ts"],
    name: "@vitest-axe/language-options/base",
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: true,
        ecmaVersion: "latest",
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
      },
    },
  },
  {
    "name": "@vitest-axe/eslint/base",
    rules: {
      ...eslint.configs.recommended.rules,
    }
  },
  {
    name: "@vitest-axe/typescript/base",
    files: ["**/*.js", "**/*.mjs", "**/*.ts"],

    plugins: {
      "@typescript-eslint": tseslintPlugin,
    },
    rules: {
      "no-dupe-class-members": "off",
      "no-undef": "off",

      "@typescript-eslint/consistent-type-assertions": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",

      "no-array-constructor": "off",
      "@typescript-eslint/no-array-constructor": "warn",

      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "error",

      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": [
        "warn",
        {
          functions: false,
          classes: false,
          variables: false,
          typedefs: false,
        },
      ],

      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "none",
          ignoreRestSiblings: true,
        },
      ],

      "no-useless-constructor": "off",
      "@typescript-eslint/no-useless-constructor": "warn",
    },
  },
  {
    name: "@vitest-axe/import/base",
    files: ["**/*.js", "**/*.mjs", "**/*.ts"],
    plugins: {
      import: fixupPluginRules(pluginImport),
    },
    settings: {
      "import/ignore": ["node_modules", "\\.(css|md|svg|json)$"],
      "import/parsers": {
        "@typescript-eslint/parser": [".js", ".ts", ".tsx", ".d.ts"],
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...pluginImport.configs.recommended.rules,
      "import/first": "error",
      "import/no-amd": "error",
      "import/no-webpack-loader-syntax": "error",
    },
  },
  {
    name: "@vitest-axe/vitest/base",
    files: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    plugins: {
      vitest: fixupPluginRules(pluginVitest),
    },
    languageOptions: {
      globals: {
        ...pluginVitest.environments.env.globals,
      }
    },
    rules: {
      ...pluginVitest.configs.recommended.rules,
      "vitest/consistent-test-it": [
        "error",
        {
          "fn": "test",
          "withinDescribe": "test",
        }
      ],
      "vitest/prefer-strict-equal": "error",
      "vitest/prefer-to-be-truthy": "error",
      "vitest/prefer-to-be-falsy": "error",
      "vitest/prefer-to-be-object": "error"
    },
    settings: {
      vitest: {
        typecheck: true
      }
    }
  },
  {
    name: "@vitest-axe/ignores/base",
    ignores: [
      "dist",
      "extend-expect.js",
      "extend-expect.d.ts",
      "matchers.js",
      "matchers.d.ts"
    ],
  },
)
