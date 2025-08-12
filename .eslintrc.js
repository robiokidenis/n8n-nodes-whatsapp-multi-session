module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: ['eslint:recommended'],
	plugins: ['n8n-nodes-base'],
	rules: {
		// Only include essential n8n rules
		'n8n-nodes-base/node-filename-against-convention': 'off',
		'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',
		'n8n-nodes-base/node-class-description-outputs-wrong': 'off',
		// Disable problematic rules
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
	},
	env: {
		node: true,
		es6: true,
	},
};