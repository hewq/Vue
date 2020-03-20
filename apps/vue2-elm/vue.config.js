module.exports = {
	runtimeCompiler: true,
	publicPath: process.env.NODE_ENV === 'production' ? '/vue2-elm/dist/' : '/',
	productionSourceMap: false,
	devServer: {
		port: 8080,
		proxy: {
			'/api': {
				target: 'http://cangdu.org:8001', //对应自己的接口
				changeOrigin: true,
				ws: true,
				pathRewrite: {
				'^/api': ''
				}
			}
		}
	}, 
}