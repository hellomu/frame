// export default {
// 	data() {
// 		return {
// 			scrollTop: ""
// 		};
// 	},
// 	mounted() {
// 		// 获取组件根元素Dom
// 		const page = this.$el;
// 		console.log("page", page);
// 		// 绑定事件,滚动时,储存位置到this.scrollTop
// 		page.addEventListener(
// 			"scroll",
// 			() => {
// 				this.scrollTop = page.scrollTop;
// 				console.log(page.scrollTop, this.scrollTop);
// 			},
// 			true
// 		);
// 	},
// 	// activated生命钩子在keep-alive被激活时调用
// 	activated() {
// 		// 如果曾滚动过,则还原位置
// 		if (this.scrollTop) {
// 			const page = this.$el;
// 			page.scrollTop = this.scrollTop;
// 		}
// 	}
// 	// deactivated生命钩子在keep-alive被停用时调用
// 	// 如果onScroll绑定在window之类的元素上,记得用removeEventListener删除事件
// 	// deactivated() {}
// };
