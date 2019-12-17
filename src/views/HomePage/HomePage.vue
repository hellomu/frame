<template>
	<div class="home-page">
		<!--吸顶元素必须在最上方，且class必须为layout/block-scroll-top-->
		<div class="layout block-scroll-top">
			<p>icon使用的是remixicon，如何使用?</p>
			<i class="ri-home-line"></i>
			<i class="ri-home-fill"></i>
			<p>
				更多请前往
				<a href="https://remixicon.com/">https://remixicon.com/</a>
			</p>
		</div>
		<div class="layout">
			<p>根据项目需求基于elementUI时间选择组件进行更改的时间组件</p>
			<el-radio-group v-model="type">
				<el-radio
					label="days"
					v-has="'npay:user:delete'"
				>只能选择同一天</el-radio>
				<el-radio
					label="weeks"
					v-has="'npay:user:delete'"
				>选择范围不能超过7天</el-radio>
				<el-radio
					label="months"
					v-has="'npay:user:delete'"
				>选择范围不能超过一个月</el-radio>
				<el-radio
					label="currentMonth"
					v-has="'npay:user:none'"
				>只能选择同一个月</el-radio>
			</el-radio-group>
			<br />
			<elePicker
				clearable
				v-model="time"
				type="datetimerange"
				range-separator="至"
				:start-placeholder="placeholderStart"
				:end-placeholder="placeholderEnd"
				:default-time="['00:00:00', '23:59:59']"
				:editable="false"
				:picker-options="pickerOptions"
				@change="change"
			></elePicker>
		</div>
		<div class="layout">
			<p>支持列拖拽的表格例子，基于sortablejs（非srotable.js）和elementUI表格组件。</p>
			<el-table
				class="homePageTable"
				ref="homePageTable"
				:data="tableData"
				border
				row-key="id"
				align="left"
			>
				<el-table-column
					v-for="(item, index) in col"
					:key="`col_${index}`"
					:prop="dropCol[index].prop"
					:label="item.label"
					:align="dropCol[index].align"
					:header-align="item.align"
				>
					<template slot-scope="scope">
						<el-popover
							trigger="hover"
							placement="top"
							v-if="dropCol[index].prop === 'name'"
						>
							<p>姓名: {{ scope.row.name }}</p>
							<p>住址: {{ scope.row.address }}</p>
							<div
								slot="reference"
								style="display: inline-block;"
							>
								<el-tag size="medium">{{ scope.row.name }}</el-tag>
							</div>
						</el-popover>
						<span v-else>{{scope.row[dropCol[index].prop]}}</span>
					</template>
				</el-table-column>
			</el-table>
			<pre style="text-align: left">
      {{dropCol}}
    </pre>
			<hr />
			<pre style="text-align: left">
      {{tableData}}
    </pre>
		</div>
	</div>
</template>
<script>
let columnData = [
	{
		label: "日期",
		prop: "date",
		align: "right"
	},
	{
		label: "姓名",
		prop: "name",
		align: "center"
	},
	{
		label: "地址",
		prop: "address",
		align: "center"
	}
];
export default {
	data() {
		return {
			type: "currentMonth",
			time: [],
			placeholderStart: "开始时间",
			placeholderEnd: "结束时间",
			days: 30,
			pickerOptions: {},
			choiceDate: "",
			col: columnData, // 表头数据
			dropCol: [].concat(columnData), // 表头数据
			tableData: [
				{
					id: "1",
					date: "2016-05-02",
					name: "王小虎1",
					address: "上海市普陀区金沙江路 100 弄"
				},
				{
					id: "2",
					date: "2016-05-04",
					name: "王小虎2",
					address: "上海市普陀区金沙江路 200 弄"
				},
				{
					id: "3",
					date: "2016-05-01",
					name: "王小虎3",
					address: "上海市普陀区金沙江路 300 弄"
				},
				{
					id: "4",
					date: "2016-05-03",
					name: "王小虎4",
					address: "上海市普陀区金沙江路 400 弄"
				}
			]
		};
	},
	mounted() {
		this.columnDrop();
	},
	methods: {
		change() {
			if (this.time != null) {
				let start = this.$utils.sys_formatDate(
					this.time[0],
					"yyyy-MM-dd HH:mm:ss"
				);
				let end = this.$utils.sys_formatDate(
					this.time[1],
					"yyyy-MM-dd HH:mm:ss"
				);
				let startTime = new Date(start).getTime();
				let endTime = new Date(end).getTime();

				if (this.type == "days") {
					if (start.substring(0, 10) !== end.substring(0, 10)) {
						this.$alert("只能选择同一天", "温馨提示", {
							confirmButtonText: "确定",
							type: "warning",
							callback: () => {
								this.time = [];
							}
						});
					}
				} else if (this.type == "weeks") {
					if (endTime - startTime > 1000 * 60 * 60 * 24 * 7) {
						this.$alert("选择范围不能超过7天", "温馨提示", {
							confirmButtonText: "确定",
							type: "warning",
							callback: () => {
								this.time = [];
							}
						});
					}
				} else if (this.type == "months") {
					if (endTime - startTime > 1000 * 60 * 60 * 24 * this.days) {
						this.$alert("选择范围不能超过一个月", "温馨提示", {
							confirmButtonText: "确定",
							type: "warning",
							callback: () => {
								this.time = [];
							}
						});
					}
				} else if (this.type == "currentMonth") {
					if (
						new Date(start).getMonth() != new Date(end).getMonth()
					) {
						this.$alert("只能选择同一个月", "温馨提示", {
							confirmButtonText: "确定",
							type: "warning",
							callback: () => {
								this.time = [];
							}
						});
					}
				}
				this.$emit("func", this.time);
			} else {
				this.time = [];
				this.$emit("func", this.time);
			}
		},
		//列拖拽
		columnDrop() {
			// 参数为表格的refs名,必须为唯一值
			this.$utils.columnDrop(this, "homePageTable", "dropCol");
		}
	},
	beforeCreate() {
		// 参数为表格的refs名,必须为唯一值(表格名重复导致的bug是很麻烦的。))
		let data = this.$utils.getIndividuation("homePageTable");
		data && (columnData = data);
	}
};
</script>
<style lang="scss" scoped>
// .home-page {
// 	line-height: 20px;
// }
</style>