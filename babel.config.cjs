module.exports = {
	presets: [
		// The preset will transpile and polyfill the app based on the .browserlistrc file.
		['@babel/preset-env', {
			// Don't convert ES modules to old-school syntax, let Webpack handle it instead.
			// This is also a requirement to do tree-shaking.
			modules: false,
			// Use the v3 of core-js when polyfilling. Use a concrete version instead of 3 and
			// don't forget to update this version when updating core-js
			corejs: 3.25,
			// Only polyfill what is used. This usually leaves out js from the node_modules.
			// This is a size-optimization tradeoff. If a package from node_modules needs a
			// polyfill the app doesn't use, then Babel will ignore it. In this case use / import
			// the missing polyfill explicitly.
			useBuiltIns: 'usage',
		}],
	],
	env: {
		test: {
			presets: [
				// Since we use Jest which runs in Node.js environment, let's target that for tests.
				['@babel/preset-env', { targets: { node: 'current' } }],
			],
		},
	},
};
