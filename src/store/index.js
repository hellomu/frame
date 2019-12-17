import Vue from "vue";
import Vuex from "vuex";
import axios from "@/axios";
import permissons from "./modules/permissons";
import roles from "./modules/roles";
import menus from "./modules/menus";

Vue.use(Vuex);
// 存储业务状态
export default new Vuex.Store({
	state: { userInfo: null, menuList: [], permissions: [] },
	mutations: {
		// 设置用户信息
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		setMenuList(state, data) {
			state.menuList = data;
		},
		setPermissons(state, data) {
			state.permissions = data;
		}
	},
	actions: {
		// 登出
		async logOut({ commit }) {
			const res = await axios.post("/userlogout");
			if (res.retCode === "000000") {
				commit("setUserInfo", null);
				localStorage.removeItem("userInfo");
			}
		},
		async getMenuList({ commit }) {
			// const res = await axios.get("/npay/loadAuth");
			const res = await axios.get("/getMenuList");
			if (res.retCode === "000000") {
				commit("setMenuList", res.rows.menuList);
				commit("setPermissons", res.rows.permList);
			}
			return res;
		}
	},
	modules: {
		permissons, // 权限模块
		roles, // 角色模块
		menus // 菜单模块
	}
});
