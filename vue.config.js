// const path = require("path");

module.exports = {
	css: {
		loaderOptions: {
			// 给 sass-loader 传递选项
			sass: {
				// @/ 是 src/ 的别名
				// 所以这里假设你有 `src/assets/styles/global/_index.scss` 这个文件
				prependData: `@import "~@/assets/styles/global/_index.scss"`
			},
			scss: {
				prependData: `@import "~@/assets/styles/global/_index.scss";`
			}
		}
	},
	devServer: {
		hot: true, //热加载
		host: "0.0.0.0",
		port: "8080", //端口
		open: false, //自动打开浏览器
		proxy: {
			//可以配置多个
			"/": {
				target: "http://192.168.1.171:8081", // 域名自定义
				// 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
				changeOrigin: true,
				ws: false,
				https: false,
				pathRewrite: {
					// 替换target中的请求地址
					"^/": "/"
				}
			}
		}
	}
};
