'use strict';


module.exports = {
	presets: [
		['@babel/env', {
			targets: { node: '10' },
			shippedProposals: true
		}]
	],

	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		'dynamic-import-node',
	],
};
