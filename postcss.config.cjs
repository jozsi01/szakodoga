const presetEnv = require('postcss-preset-env');

module.exports = {
	plugins: [
		presetEnv({
			// See features in https://preset-env.cssdb.org/features
			stage: 3,
		}),
	],
};
