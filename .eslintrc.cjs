// https://typescript-eslint.io/docs/linting/
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    parserOptions: {
        project: [
            './tsconfig.json',
        ],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'airbnb-typescript/base',
    ],
    rules: {
        "import/no-extraneous-dependencies": [
            "error", {"devDependencies": ["**/*.test.ts"]}
        ],
        "max-len": [
            "error", {"code": 120}
        ],
        "no-console": ["error", { allow: ["warn", "error", "info"] }],
        "max-lines": [
            "error", {"max": 300, "skipBlankLines": true, "skipComments": true}
        ],
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
    },
    overrides: [
        {
            "files": ["*.test.ts", "tests.*.ts"],
            "rules": {
                "no-unused-expressions": "off",
                "max-lines": "off"
            }
        }
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    }
};
