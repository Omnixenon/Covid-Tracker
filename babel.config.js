const presets = [
	[
		'@babel/preset-env',
		{
			useBuiltIns: 'entry',
			targets: {
				node: '10',
				chrome: '75',
				opera: '61',
				edge: '17',
				firefox: '67',
				safari: '12.1',
				ie: '11',
				ios: '12.3',
				android: '74'
			}
		}
	],
	'@babel/preset-react'
]

const plugins = [
	'@babel/plugin-syntax-object-rest-spread',
	'@babel/plugin-proposal-export-default-from',
	'@babel/plugin-syntax-dynamic-import',
	[
		'@babel/plugin-proposal-decorators',
		{
			legacy: true
		}
	],
	'@babel/plugin-proposal-class-properties'
]

module.exports = (api) => {
	api.cache(true)

	return {
		presets,
		plugins
	}
}
