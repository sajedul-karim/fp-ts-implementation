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
            // './jest.config.ts',
        ],  //required for "type-aware linting"
    },
    extends: [
        // 'eslint:recommended',
        // 'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
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
        ]
    },
    overrides: [
        {
            "files": ["*.test.ts", "tests.*.ts"],
            "rules": {
                "no-unused-expressions": "off",
                "max-lines": "off"
            }
        }
    ]
};
