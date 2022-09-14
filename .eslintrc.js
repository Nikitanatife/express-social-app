module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: ['google', 'prettier', 'plugin:jsdoc/recommended'],
    plugins: ['prettier', 'jsdoc'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'prettier/prettier': ['error'],
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
        'jsdoc/require-jsdoc': [
            1,
            {
                require: {
                    FunctionExpression: true,
                    ClassDeclaration: true,
                },
            },
        ],
        'new-cap': ['error', { capIsNewExceptions: ['Router'] }],
    },
};
