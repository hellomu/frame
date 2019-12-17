<template>
	<div class="global-layout-main-header-layout">
		<div class="header-row">
			<div>
				<i
					@click="$emit('update:isCollapse', !isCollapse)"
					class="menu-collapse"
					:class="[isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold']"
				></i>
			</div>
			<!-- 页头右部需要加功能都加到这个div里 -->
			<div class="header-row-conf">
				<slot></slot>
			</div>
		</div>
		<div class="tab-bar">
			<div class="tabs">
				<el-tabs
					v-model="tabIndex"
					type="card"
					@tab-click="handleClick"
					@tab-remove="handleRemove"
				>
					<el-tab-pane
						v-for="item in editableTabs"
						:key="item.name"
						:label="item.name"
						:name="item.name"
						:closable="editableTabs.length > 1 || item.name !== '首页'"
					></el-tab-pane>
				</el-tabs>
			</div>
			<div class="bar">
				<el-dropdown
					@command="handleCommand"
					trigger="click"
				>
					<span class="el-dropdown-link">
						<i class="ri-close-line"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="0">关闭全部选项卡</el-dropdown-item>
						<el-dropdown-item :command="1">关闭其他选项卡</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<!-- <el-row class="tab-bar">
			<el-col :span="22">
				<el-tabs
					v-model="tabIndex"
					type="card"
					@tab-click="handleClick"
					@tab-remove="handleRemove"
				>
					<el-tab-pane
						v-for="item in editableTabs"
						:key="item.name"
						:label="item.name"
						:name="item.name"
						:closable="editableTabs.length > 1 || item.name !== '首页'"
					></el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col
				:span="2"
				class="header-col-text"
			>
				<el-dropdown
					split-button
					@command="handleCommand"
				>
					关闭操作
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="0">关闭全部选项卡</el-dropdown-item>
						<el-dropdown-item :command="1">关闭其他选项卡</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>-->
	</div>
</template>
<script>
let breadcrumb = [];
export default {
	props: {
		isCollapse: {
			type: Boolean,
			default: false
		},
		editableTabs: {
			type: Array
		},
		activeTabName: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			tabIndex: "1",
			breadcrumb: breadcrumb
		};
	},
	watch: {
		// $route(newRoute) {
		// 	this.breadcrumb = newRoute.matched;
		// },
		activeTabName(val) {
			this.tabIndex = val;
		}
		// tabIndex(val) {
		// 	this.$emit("changeVal", val);
		// }
	},
	created() {
		this.tabIndex = this.$route.name;
	},
	beforeCreate() {
		breadcrumb = this.$route.matched;
	},
	methods: {
		handleClick(tab, event) {
			let tabData;
			this.editableTabs.forEach(editableTab => {
				if (editableTab.name === tab.name) {
					if (editableTab.path !== this.$route.path) {
						this.$router.replace(editableTab.path);
					}
					tabData = editableTab;
					this.$emit("tabClick", tab, tabData, event, this.tabIndex);
				}
			});
		},
		handleRemove(name) {
			this.$emit("tabRemove", name);
		},
		handleCommand(commond) {
			this.$emit("closeTabs", commond);
		}
	}
};
</script>
<style lang="scss" scoped>
.global-layout-main-header-layout {
	$height: 40px;
	color: #fff;
	.header-col-text {
		text-align: $text-align-right;
	}
	.header-col-inline {
		display: inline;
		margin-right: 1px;
	}
	.header-row {
		width: 100%;
		background: $color-background-title;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		padding: 0;
		> div:not(.header-row-conf) {
			height: $height;
			line-height: $height;
			.menu-collapse {
				color: $color-primary;
				font-size: 20px;
				line-height: $height;
				cursor: pointer;
			}
		}
		.header-row-conf {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-end;
			align-items: center;
			> * {
				margin-right: 10px;
			}
		}
	}
	.tab-bar {
		> div {
			display: inline-block;
			vertical-align: middle;
		}
		> .tabs {
			width: calc(100% - 40px);
		}
		> .bar {
			width: 40px;
			text-align: center;
			.el-dropdown-link {
				cursor: pointer;
				font-size: 22px;
			}
			&:hover {
				.el-dropdown-link {
					color: $color-primary;
				}
			}
		}
	}
}
</style>

<style lang="scss">
.tab-bar {
	.el-tabs {
		.el-tabs__nav {
			background: #ffffff;
		}
		.el-tabs__item {
			height: 29px;
			line-height: 29px;
			padding: 0 10px;
		}
	}
	.el-tabs__header {
		margin: 0;
	}
	.el-tabs--card > .el-tabs__header .el-tabs__item {
		border-bottom: 1px solid #e4e7ed;
	}
}
</style>