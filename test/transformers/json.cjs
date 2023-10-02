// A transformer acts for Jest like a loader does of Webpack:
// takes the string content of a file and returns something Jest understands.
module.exports = {
	// Jest normally loads JSON files differently than Webpack v5.
	// This implementation fixes that.
	process(src) {
		const data = JSON.parse(src);
		const code = `${JSON.stringify({
			...data,
			__esModule: true,
			default: data,
		})}`;
		return { code };
	},
};
