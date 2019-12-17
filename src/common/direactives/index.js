import Vue from "vue";
import Store from "../../store";

Vue.directive("has", {
	inserted(el, bindings) {
		let value = bindings.value;
		// 在vuex中查看是否有按钮权限
		let flag = Store.state.permissions.includes(value);
		// 如果没有全选则将按钮删除即可
		!flag && el.parentNode.removeChild(el);
	}
});
