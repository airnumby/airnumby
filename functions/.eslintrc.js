module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "google",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["tsconfig.json", "tsconfig.dev.json"],
        sourceType: "module",
    },
    ignorePatterns: [
        "/lib/**/*", // Ignore built files.
    ],
    plugins: [
        "@typescript-eslint",
        "import",
    ],
    rules: {
        "quotes": [0],
        "import/no-unresolved": 0,
        "object-curly-spacing": [1, 'always'],
        "indent": ["error", 4],
        "max-len": ['error', 150],
        "@typescript-eslint/no-extra-semi": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "require-jsdoc": 0,
        "valid-jsdoc": 0,
        "arrow-parens": ["error", "as-needed"],
    },
};
