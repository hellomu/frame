import Vue from "vue";
import axios from "axios";
import router from "../router";

const Axios = axios.create({
	timeout: 10000,
	responseType: "json",
	withCredentials: true
});

Axios.interceptors.request.use(
	config => {
		// 若是有做鉴权token , 就给头部带上token
		// 这里localStorage一般是请求成功后我们自行写入到本地的,因为放在vuex刷新就没了
		// 一些必要的数据写入本地,优先从本地读取
		if (localStorage.userInfo) {
			config.headers.Authorization = JSON.parse(
				localStorage.getItem("userInfo")
			).secretKey;
			// config.headers.Authorization = "ZJPJTFB4Y2TTAHA5";
		}
		return config;
	},
	error => {
		throw new Error(error);
		// error 的回调信息
		// return Promise.reject(error.data.error.message);
	}
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
	res => {
		//对响应数据做些事
		if (res.data && res.data.retCode && res.data.retMsg) {
			let data = res.data;
			let code = data.retCode;
			switch (code) {
			case "000000":
				Vue.prototype.$message.success(data.retMsg);
				break;
			case "888888":
				router.push("/login");
				break;
			default:
				Vue.prototype.$message.warning(data.retMsg);
			}
		}
		return res.data;
	},
	error => {
		// 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
		// 乖乖的返回去登录页重新登录
		if (error.response) {
			let status = error.response.status;
			if (status === 401) {
				router.push("/login");
			} else if (/^5/.test(status)) {
				Vue.prototype.$message.warning("网络波动，请稍后重试");
			}
		} else {
			Vue.prototype.$message.warning("网络波动，请稍后重试");
		}
		// 返回 response 里的错误信息
		let errorInfo = error.data.error
			? error.data.error.message
			: error.data;
		return Promise.reject(errorInfo);
	}
);

export default Axios;
