<script>
export default {
	data() {
		return {
			defaultActive: ""
		};
	},
	props: {
		projectTitle: {
			type: String,
			default: ""
		},
		isCollapse: {
			type: Boolean,
			default: false
		},
		menuList: {
			type: Array,
			required: true,
			default: function() {
				return [];
			}
		}
	},
	methods: {
		handleSelect(index, indexPath) {
			this.$emit("menuSelect", index, indexPath);
		},
		open(activeIndex) {
			if (activeIndex) {
				this.$refs.elMenu.updateActiveIndex(activeIndex);
			}
		}
	},
	render() {
		const { defaultActive, isCollapse, projectTitle, menuList } = this;
		const header = !isCollapse ? (
			<h1 class="projectTitle">{projectTitle}</h1>
		) : (
			""
		);
		const createItemFunc = function(menu, index) {
			let menuDom = (
				<el-submenu key={index} index={menu.meta._menuIndex}>
					<template slot="title">
						<i class={["submenu-icon", menu.icon]}></i>
						<span>{menu.name}</span>
					</template>
					{menu.children.map(subMenu => {
						let itemDom;
						if (subMenu.children) {
							itemDom = createItemFunc(subMenu);
						} else {
							itemDom = (
								<el-menu-item
									key={subMenu.meta._menuIndex}
									index={subMenu.meta._menuIndex}
								>
									<i
										class={["submenu-icon", subMenu.icon]}
									></i>
									<span>{subMenu.name}</span>
								</el-menu-item>
							);
						}
						return itemDom;
					})}
				</el-submenu>
			);
			return menuDom;
		};

		return (
			<div>
				<el-menu
					ref="elMenu"
					default-active={defaultActive}
					collapse={isCollapse}
					projectTitle={projectTitle}
					unique-opened={true}
					background-color="#2f4a5b"
					text-color="#fff"
					active-text-color="#3caaff"
					class="global-layout-aside-layout"
					on-select={this.handleSelect}
				>
					{header}
					{menuList.map((menu, index) => createItemFunc(menu, index))}
				</el-menu>
			</div>
		);
	}
};
</script>
<style lang="scss" scoped>
.global-layout-aside-layout {
	height: 100%;
	// 左侧菜单的行高
	border-right: 0;
	&:not(.el-menu--collapse) {
		width: 220px;
		font-size: 12px;
		.projectTitle {
			width: 100%;
			height: 70px;
			background-color: $color-background-title;
			color: $color-primary;
			line-height: 70px;
			text-align: center;
			font-size: $font-size-title;
		}
	}
}

.submenu-icon {
	margin-right: $margin-base;
}
</style>

<style lang="scss">
$submenu-height: 30px;
.el-menu {
	.el-menu-item {
		height: $submenu-height;
		line-height: $submenu-height;
	}
	.el-submenu {
		> .el-submenu__title {
			height: $submenu-height;
			line-height: $submenu-height;
		}
		.el-menu-item {
			height: $submenu-height;
			line-height: $submenu-height;
		}
	}
}
</style>