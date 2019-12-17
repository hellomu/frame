<template>
	<div>
		<h1>我是菜单一</h1>
		<div class="layout block-scroll-top">
			<p>吸顶</p>
			<p>吸顶</p>
			<p>吸顶</p>
			<p>吸顶</p>
			<p>吸顶</p>
		</div>
		<div class="layout">
			<div style="width: 600px;">
				<h1
					style="lineHeight: 30px;"
				>GRID组件，支持自定义label的宽度，字体颜色、位置、背景色，以及内容的字体颜色、位置、背景色，如果都不设置，则为默认样式，同时还支持header/footer两个slot，具体看实例</h1>
				<si-grid :tempData="tempData">
					<si-grid-row>
						<si-grid-col
							prop="id"
							label="账号"
						></si-grid-col>
						<si-grid-col
							prop="name"
							label="姓名"
						></si-grid-col>
					</si-grid-row>
					<si-grid-row>
						<si-grid-col
							prop="date"
							label="生日"
						></si-grid-col>
						<si-grid-col
							prop="old"
							label="年龄"
						></si-grid-col>
					</si-grid-row>
					<si-grid-row>
						<si-grid-col
							prop="address"
							label="地址"
						></si-grid-col>
					</si-grid-row>
					<si-grid-row>
						<si-grid-col
							prop="email"
							label="邮箱"
						></si-grid-col>
						<si-grid-col
							prop="id"
							label="账号"
						></si-grid-col>
					</si-grid-row>
				</si-grid>
			</div>
		</div>
		<div class="layout">
			<h1 style="lineHeight: 30px;">AppGrid组件的api</h1>
			<el-table
				:data="gridapi"
				style="width: 100%"
			>
				<el-table-column
					prop="api"
					label="属性"
					width="180"
				></el-table-column>
				<el-table-column
					prop="introduce"
					label="用法"
					width="180"
				></el-table-column>
				<el-table-column
					prop="type"
					width="180"
					label="参数类型"
				></el-table-column>
				<el-table-column
					prop="optionnal"
					label="用法"
					width="180"
				>
					<template slot-scope="scope">
						<span
							style="margin-left: 10px"
						>{{ scope.row.optionnal&& scope.row.optionnal }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="default"
					width="180"
					label="默认值"
				></el-table-column>
			</el-table>
		</div>
		<div class="layout">
			<h1 style="lineHeight: 30px;">subItem组件的api</h1>
			<el-table
				:data="subItemApi"
				style="width: 100%"
			>
				<el-table-column
					prop="api"
					label="属性"
					width="180"
				></el-table-column>
				<el-table-column
					prop="introduce"
					label="用法"
					width="180"
				></el-table-column>
				<el-table-column
					prop="type"
					width="180"
					label="参数类型"
				></el-table-column>
				<el-table-column
					prop="optionnal"
					label="用法"
					width="180"
				>
					<template slot-scope="scope">
						<span
							style="margin-left: 10px"
						>{{ scope.row.optionnal && scope.row.optionnal }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="default"
					width="180"
					label="默认值"
				></el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
export default {
	name: "one",
	data() {
		return {
			tempData: {
				id: "1",
				date: "2016-05-02",
				name: "王小虎1",
				address: "上海市普陀区金沙江路 100 弄",
				old: "26",
				phone: "111111111222",
				email: "789546463@qq.com"
			},
			gridapi: [
				{
					api: "tempData",
					introduce: "绑定的数据",
					type: ["Object"],
					default: "{}"
				},
				{
					api: "labelWidth",
					introduce: "label的宽度",
					type: ["String"],
					default: "auto"
				},
				{
					api: "labelBackground",
					introduce: "label的背景颜色",
					type: ["String"],
					default: "#eee"
				},
				{
					api: "labelPosition",
					introduce: "label文字的位置",
					type: ["String"],
					optionnal: ["left", "center", "right"],
					default: "right"
				},
				{
					api: "labelColor",
					introduce: "label文字的颜色",
					type: ["String"],
					default: ""
				},
				{
					api: "contentBackground",
					introduce: "内容背景色",
					type: ["String"],
					default: "#fff"
				},
				{
					api: "contentPosition",
					introduce: "内容文字的位置",
					type: ["String"],
					optionnal: ["left", "center", "right"],
					default: "left"
				},
				{
					api: "contentColor",
					introduce: "内容文字的颜色",
					type: ["String"],
					default: ""
				}
			],
			subItemApi: [
				{
					api: "label",
					introduce: "对应的字段id",
					type: ["String"],
					default: ""
				},
				{
					api: "title",
					introduce: "label的标题",
					type: ["String"],
					default: ""
				}
			]
		};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		}
	}
};
</script>