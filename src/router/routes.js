export default [
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/Login/Login.vue")
	},
	{
		path: "*", // 页面不存在的情况下会跳到404页面
		// redirect: "/404",
		name: "notFound",
		component: () => import("@/views/Error/404.vue")
	}
];
