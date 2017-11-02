/** ====================================================================
 * stylelint.config.js
 * -------------------
 * @description Configuration for stylelint csslinter.
 * @todo:
 * 	- Add sass lint with https://github.com/kristerkari/stylelint-scss.
 * 	- Add stylelint-validator to validate css declarations.
 * 	- Check css images with https://github.com/ramasilveyra/stylelint-images.
 * 	- Enforce variables for certain property values with https://github.com/simonsmith/stylelint-selector-bem-pattern.
 * 	- Add BEM linter (https://github.com/simonsmith/stylelint-selector-bem-pattern).
 * 	- Disallow features not supported by target browsers (https://github.com/ismay/stylelint-no-unsupported-browser-features).
 * 	- Add html/md/vue processing with https://github.com/gucong3000/postcss-html.
 * 	- Add precommit hook? (https://github.com/awebdeveloper/pre-commit-stylelint)
===================================================================== */


/* eslint-env node */
var isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';
module.exports = {
	extends: [
		// `stylelint-config-recommended` turns on all rules that can cause errors in CSS.
		'stylelint-config-recommended'
	],
	plugins: [
		// 'stylelint-order'
		'stylelint-scss',
	],
	formatter: 'stylelint-formatter-pretty',
	processors: [],
	ignoreFiles: [],
	defaultSeverity: isProd ? 'error' : 'warning',
	rules: {
		/** POTENTIAL ERRORS (these will override stylelint-config-recommended). */
			// Declaration blocks.
				'declaration-block-no-duplicate-properties': [true,
					{
						// ignoreProperties: [],
						severity: 'error',
						ignore: ['consecutive-duplicates-with-different-values'],
					}
				],
			// Selectors.
				'selector-type-no-unknown': [true,
					{
						ignore: 'custom-elements',
						// ignoreNamespaces: [],
						// ignoreTypes: []
					}
				],
			// At rules.
				// 'at-rule-no-unknown': [true, {ignoreAtRules: ['include', 'mixin', 'if', 'else', 'function', 'return']}],
				'at-rule-no-unknown': null,


		/** DISCRETIONARY RULES / LANGUAGE FEATURES. */
			// Colors.
				'color-named': ['never',
					{ignore: 'inside-function'}
				],
				'color-no-hex': true,
			// Functions.
				// 'function-blacklist': [], // Disallowed functions.
				// 'function-whitelist': [], // Allowed functions.
			// Numbers / units.
				'unit-blacklist': ['px'], // Disallowed units.
				// 'unit-whitelist': ['rem', 'em', '%', 'deg', 'vh', 'vw', 's', 'ms'], // Allowed units.
				'number-max-precision': 5,
			// Values.
				'value-no-vendor-prefix': true,
			// Properties.
				// 'property-blacklist': [], // Disallowed properties.
				// 'property-whitelist': [], // Allowed properties.
				'property-no-vendor-prefix': true,
			// Declaration blocks.
				// 'declaration-property-unit-blacklist': {
				// 	'font-size': ['px']
				// }, // Disallowed propert/unit pairs.
				'declaration-property-unit-whitelist': {
					'font-size': ['em', 'rem'],
					'height': ['em', 'rem', '%'],
					'width': ['em', 'rem', '%'],
					'margin': ['em', 'rem'],
					'padding': ['em', 'rem'],
				}, // Allowed property/unit pairs.
				// 'declaration-property-value-blacklist': {
				// 	'position': ['fixed']
				// }, // Disallowed property/value pairs.
				// 'declaration-property-value-whitelist': {
				// 	'position': ['fixed']
				// }, // Allowed property/value pairs.
				'declaration-no-important': true,
				'max-nesting-depth': [3,
					{
						ignore: ['blockless-at-rules'],
						// ignoreAtRules: []
					}
				],
			// Selectors.
				// 'selector-pseudo-class-blacklist': [],
				// 'selector-pseudo-class-whitelist': [],
				// 'selector-attribute-operator-blacklist': [],
				// 'selector-attribute-operator-whitelist': [],
				// 'selector-class-pattern': [],
				// 'selector-id-pattern': [],
				'selector-max-attribute': 1,
				// 'selector-max-class': 1,
				// 'selector-max-combinators': 1,
				'selector-max-compound-selectors': 3,
				'selector-max-empty-lines': 0,
				'selector-max-id': 0,
				// 'selector-max-specificity': '',
				'selector-max-type': 0,
				'selector-max-universal': 0,
				'selector-no-qualifying-type': true,
				'selector-no-vendor-prefix': true,
			// Media.
				// 'media-feature-name-blacklist': [], // Disallowed media feature names.
				// 'media-feature-name-whitelist': [], // Allowed media feature names.
				// 'custom-media-pattern': '', // Pattern for custom media query names.
				'media-feature-name-no-vendor-prefix': true,
			// At rules.
				// 'at-rule-blacklist': [], // Disallowed at-rules.
				// 'at-rule-whitelist': [], // Allowed at-rules.
			// Comments.
				// 'comment-word-blacklist': [], // Disallowed words in comments.


		/** STYLISTIC RULES. */
			// Colors.
				'color-hex-case': 'lower',
				'color-hex-length': 'short',
			// Fonts.
				'font-family-name-quotes': 'always-unless-keyword',
				'font-weight-notation': 'named-where-possible',
			// Functions.
				'function-comma-newline-after': 'never-multi-line',
				// 'function-comma-newline-before': false,
				'function-comma-space-after': 'always',
				'function-comma-space-before': 'never',
				'function-max-empty-lines': 0,
				// 'function-name-case': ['lower', {ignoreFunctions: ["/^(get|\#\{get).*$/"]}],
				'function-name-case': ['lower', {ignoreFunctions: ["/^\#\{.*$/"]}],
				'function-parentheses-newline-inside': 'never-multi-line',
				'function-parentheses-space-inside': 'never',
				'function-url-quotes': 'always',
				'function-whitespace-after': 'always',
			// Numbers / units.
				'number-leading-zero': 'always',
				'number-no-trailing-zeros': true,
				'length-zero-no-unit': true,
				'unit-case': 'lower',
			// Strings.
				'string-quotes': 'double',
			// Values.
				'value-keyword-case': 'lower',
				// 'value-list-comma-newline-after': false,
				// 'value-list-comma-newline-before': false,
				// 'value-list-comma-space-after': false,
				// 'value-list-comma-space-before': false,
				'value-list-max-empty-lines': 0,
			// Custom properties.
				// 'custom-property-empty-line-before': false,
			// Properties.
				'property-case': 'lower',
			// Declaration blocks.
				'declaration-block-single-line-max-declarations': 1,
				'declaration-bang-space-after': 'never',
				'declaration-bang-space-before': 'always',
				// 'declaration-colon-newline-after': false,
				'declaration-colon-space-after': 'always',
				'declaration-colon-space-before': 'never',
				// 'declaration-empty-line-before': false,
				'declaration-block-semicolon-newline-after': 'always-multi-line',
				'declaration-block-semicolon-newline-before': 'never-multi-line',
				'declaration-block-semicolon-space-after': 'always-single-line',
				'declaration-block-semicolon-space-before': 'never',
				'declaration-block-trailing-semicolon': 'always',
				'block-closing-brace-empty-line-before': 'never',
				'block-closing-brace-newline-after': ['always',
					{
						ignoreAtRules: ['if', 'else']
					}
				],
				'block-closing-brace-newline-before': 'always-multi-line',
				// 'block-closing-brace-space-after': 'always',
				'block-closing-brace-space-before': 'always-single-line',
				'block-opening-brace-newline-after': 'always-multi-line',
				// 'block-opening-brace-newline-before': false,
				'block-opening-brace-space-after': 'always-single-line',
				'block-opening-brace-space-before': 'always',
				'rule-empty-line-before': ['always-multi-line', {except: ['first-nested'], ignore: ['after-comment']}],
			// Selectors.
				'selector-attribute-brackets-space-inside': 'never',
				'selector-attribute-operator-space-after': 'never',
				'selector-attribute-operator-space-before': 'never',
				'selector-attribute-quotes': 'always',
				'selector-combinator-space-after': 'always',
				'selector-combinator-space-before': 'always',
				'selector-descendant-combinator-no-non-space': true,
				'selector-pseudo-class-case': 'lower',
				'selector-pseudo-class-parentheses-space-inside': 'never',
				'selector-pseudo-element-case': 'lower',
				'selector-pseudo-element-colon-notation': 'single',
				'selector-type-case': 'lower',
				'selector-list-comma-newline-after': 'always',
				'selector-list-comma-newline-before': 'never-multi-line',
				// 'selector-list-comma-space-after': false,
				'selector-list-comma-space-before': 'never',
			// Media queries.
				'media-feature-colon-space-after': 'always',
				'media-feature-colon-space-before': 'never',
				'media-feature-name-case': 'lower',
				'media-feature-parentheses-space-inside': 'never',
				'media-feature-range-operator-space-after': 'always',
				'media-feature-range-operator-space-before': 'always',
				'media-query-list-comma-newline-after': 'always-multi-line',
				// 'media-query-list-comma-newline-before': false,
				'media-query-list-comma-space-after': 'always-single-line',
				// 'media-query-list-comma-space-before': false,
			// At rules.
				// 'at-rule-empty-line-before': ['always', {except: ['blockless-after-blockless', 'inside-block', 'first-nested']}],
				'at-rule-name-case': 'lower',
				// 'at-rule-name-newline-after': false,
				'at-rule-name-space-after': 'always',
				'at-rule-semicolon-newline-after': 'always',
				'at-rule-semicolon-space-before': 'never',
			// Comments.
				// 'comment-empty-line-before': false,
				'comment-whitespace-inside': 'always',

			// Stylesheets / errors.
				'indentation': ['tab',
					{
						indentInsideParens: 'once-at-root-twice-in-block'
					}
				],
				'max-empty-lines': 2,
				// 'max-line-length': false,
				'no-eol-whitespace': true,
				'no-missing-end-of-source-newline': true,


			// 'properties-alphabetical-order': true,


		/** SASS RULES (stylelint-scss). */
			'scss/at-else-if-parentheses-space-before': 'always',
			'scss/at-function-parentheses-space-before': 'never',
			'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
			'scss/at-import-partial-extension-blacklist': ['css', 'scss', 'sass', 'less', 'styl', 'stylus'],
			'scss/at-mixin-parentheses-space-before': 'never',
			// 'scss/at-mixin-pattern': '/foo-.+/',
			// 'scss/at-function-pattern': '/foo-.+/',
			'scss/at-rule-no-unknown': true,
			'scss/dollar-variable-colon-space-after': 'always',
			'scss/dollar-variable-colon-space-before': 'never',
			'scss/dollar-variable-empty-line-before': ['always', {except: ['first-nested', 'after-dollar-variable'], ignore: ['after-comment']}],
			'scss/dollar-variable-no-missing-interpolation': true,
			// 'scss/dollar-variable-pattern': '/foo-.+/',
			// 'scss/percent-placeholder-pattern': '/foo-.+/',
			// 'scss/percent-placeholder-pattern': '/foo-.+/',
			'scss/media-feature-value-dollar-variable': 'always',
			'scss/operator-no-newline-after': true,
			'scss/operator-no-newline-before': true,
			'scss/operator-no-unspaced': true,
			'scss/selector-no-redundant-nesting-selector': true,
	}
};
