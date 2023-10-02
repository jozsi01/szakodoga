const { resolve } = require('node:path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');

const cssLoaders = [CssExtractPlugin.loader, 'css-loader', 'postcss-loader'];

// This config is concerned what's going on inside the /src and /test
module.exports = {
	resolve: {
		alias: {
			'src': resolve(__dirname, '../src'),
			'test': resolve(__dirname, '../test'),
			'vue-i18n$': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
		},
		extensions: ['*', '.ts', '.js', '.vue', '.json'],
		mainFiles: ['index', 'index.vue'],
	},
	module: {
		rules: [
			{ test: /\.vue$/, loader: 'vue-loader' },
			{ test: /\.js$/, include: projectPaths(['src', 'test']), use: ['babel-loader'] },
			{ test: /\.ts$/, include: projectPaths(['src', 'test']), use: ['babel-loader',
				{ loader: 'ts-loader', options: { appendTsSuffixTo: ['\\.vue$'], compilerOptions: { noEmit: false }, transpileOnly: true } },
			] },
			{ test: /\.css$/, use: cssLoaders },
			{
			test: /\.(png|jpe?g|gif)$/i,
			use: [
			  {
				loader: 'file-loader',
			  },
			]
			},
			{ test: /\.(scss|sass)$/, use: [...cssLoaders, 'resolve-url-loader', 'sass-loader'] },
			{ test: /\.(otf|ttf|woff|woff2)$/, type: 'asset/resource', generator: { filename: 'assets/[name]-[contenthash][ext]' } },
			// Transform JSON translations to i18n functions during bundling.
			// When using external translations they can also be wired in as
			// projectPaths(['node_modules/@translations/example-app'])
			{ test: /\.json$/, type: 'javascript/auto', use: ['@intlify/vue-i18n-loader'], include: projectPaths(['src/resources']) },
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new CssExtractPlugin({ filename: 'assets/[name]-[contenthash].css' }),
		new HtmlWebpackPlugin(),
	],
	devtool: 'source-map',
};

function projectPaths(rootPaths) {
	const toAbsolute = rootRelative => resolve(__dirname, '../', rootRelative);
	return rootPaths.map(toAbsolute);
}
