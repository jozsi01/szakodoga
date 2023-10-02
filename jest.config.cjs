// Currently, Jest assumes code in node_modules is available in CommonJS format
// This is generally not true for packages used by webcomponents, as they
// usually only support ES Module format.
// This is list is used to build a regex asking Jest to also transform code in
// mode_modules the best way it sees fit (with babel-jest targeting to CJS)
// Once Jest follows suit with the movement of the Node.js ecosystem being able
// to consumer ESM, this step becomes unnecessary.
// Read more about it here: https://github.com/facebook/jest/issues/9430
const esmOnlyDependencies = [
	'@lion/',
	'@lit/',
	'@open-wc/',
	'@bundled-es-modules/',
	'lit',
	'lit-element',
	'lit-html',
	'singleton-manager',
];

module.exports = {
	moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|js)$': '@swc/jest',
		'^.+\\.json$': '<rootDir>/test/transformers/json.cjs',
		'^.+\\.vue$': '@vue/vue3-jest',
	},
	moduleNameMapper: {
		// Remove workaround if https://github.com/vuejs/vue-test-utils/issues/1975 gets solved.
		'^@vue/test-utils$': require.resolve('@vue/test-utils'),
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/mocks/file-mock',
		'\\.(css|less|scss|sass)$': '<rootDir>/test/mocks/style-mock',
		'^src/(.*)$': '<rootDir>/src/$1',
		'^test/(.*)$': '<rootDir>/test/$1',
		'^konva': 'konva/konva',
	},
	transformIgnorePatterns: [`/node_modules/(?!${esmOnlyDependencies.join('|')})`],
};
