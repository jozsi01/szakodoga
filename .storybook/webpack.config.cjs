const { resolve } = require('path');

// Storybook uses its own Webpack under the hood.
// Its config is extensible in any way needed.
module.exports = async ({ config }) => {
	config.resolve.alias = {
		...config.resolve.alias,
		// Add convenience for importing from /src, maybe even /test
		'src': resolve(__dirname, '../src'),
		'test': resolve(__dirname, '../test'),
	};

	// Find the first rule that deals with css
	const { use: cssLoaders } = findRuleMatching('any.css', config.module.rules);
	config.module.rules = [
		...config.module.rules,
		// Extend the config with another one dealing with sass / scss
		{ test: /\.(scss|sass)$/, use: [...cssLoaders, 'resolve-url-loader', 'sass-loader'] },
	];
	return config;
};

function findRuleMatching(name, rules) {
	return rules.find(({ test }) => test.test(name));
}
