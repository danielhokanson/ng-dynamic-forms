// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
    {
        ignores: ['**/*.js', '**/dist/**', '**/node_modules/**', 'schematics/**']
    },
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...angular.configs.tsRecommended
        ],
        processor: angular.processInlineTemplates,
        rules: {
            // form value controls intentionally run with ChangeDetectionStrategy.Eager;
            // the library drives change detection manually via markForCheck()
            '@angular-eslint/prefer-on-push-component-change-detection': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-inferrable-types': ['error', {ignoreParameters: true}],
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
            'curly': 'error',
            'no-console': ['error', {allow: ['debug', 'info', 'time', 'timeEnd', 'trace']}],
            'no-empty': 'off',
            'no-var': 'error',
            'prefer-const': 'error',
            'quotes': ['error', 'single', {avoidEscape: true, allowTemplateLiterals: true}],
            'semi': ['error', 'always'],
            '@angular-eslint/no-empty-lifecycle-method': 'error',
            '@angular-eslint/no-output-native': 'off',
            '@angular-eslint/use-lifecycle-interface': 'error',
            '@angular-eslint/use-pipe-transform-interface': 'error',
            '@angular-eslint/component-class-suffix': 'error',
            '@angular-eslint/directive-class-suffix': 'error'
        }
    },
    {
        files: ['**/*.html'],
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility
        ],
        rules: {}
    },
    {
        files: ['src/**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': ['error', {type: 'attribute', prefix: 'dynamic', style: 'camelCase'}],
            '@angular-eslint/component-selector': ['error', {type: 'element', prefix: 'dynamic', style: 'kebab-case'}]
        }
    },
    {
        files: ['src/app/app.component.ts'],
        rules: {
            '@angular-eslint/component-selector': 'off'
        }
    }
);
