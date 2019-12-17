import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
import store from "@/store";
// import MenuView from "@/views/MenuView/MenuView";
import userMenuList from "./userMenu";

Vue.use(Router);
/**
 * 路由守卫验证token
 * 客户端 imClient 不拦截
 */

const router = new Router({
	// mode: 'history',
	routes
});

const flattening = function(routeList) {
	let arr = [];
	routeList.forEach(item => {
		arr.push(item);
		if (item.nodes && item.nodes.length) {
			arr = arr.concat(flattening(item.nodes));
		}
	});
	// return routeList;
	return arr;
};

const filterMenu = function(menus, menuList) {
	menus.forEach(menu => {
		menuList.forEach(list => {
			if (menu.name === list.menuName) {
				menu.invisible = true;
			}
			if (menu.children) {
				filterMenu(menu.children, menuList);
			}
		});
	});
};

let whiteList = ["/login"]; // 白名单：不需要鉴权

router.beforeEach(async (to, from, next) => {
	if (whiteList.includes(to.path)) {
		next();
	} else {
		let token = "",
			path = to.path;
		if (localStorage.getItem("userInfo")) {
			token = JSON.parse(localStorage.getItem("userInfo")).secretKey;
		}
		if (!token) {
			next("/login");
		} else {
			if (
				!store.state.menuList.length
				|| !store.state.permissions.length
			) {
				const res = await store.dispatch("getMenuList");
				if (res.retCode !== "000000") {
					return;
				}
			}
			if (router.options.routes.length <= 2) {
				let menuList = flattening(store.state.menuList);
				filterMenu(userMenuList[0].children, menuList);
				router.addRoutes(userMenuList);
				router.options.routes.push(...userMenuList);
				next(path);
			} else {
				next(); // 世界的尽头
			}
		}
	}
});

export default router;
