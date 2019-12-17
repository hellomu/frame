<template>
	<div>
		<el-date-picker
			v-if="primary"
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
		></el-date-picker>
		<elePicker
			v-else
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
</template>
<script>
export default {
	name: "datePicker",
	props: {
		defaultTime: {
			type: String
		},
		dataType: {
			type: String,
			default: "today"
		},
		entryTime: {
			type: Array,
			default: function() {
				return [];
			}
		},
		primary: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			pickerOptions: {},
			placeholderStart: "开始时间",
			placeholderEnd: "结束时间",
			days: 30,
			time: [
				new Date(new Date(new Date().toLocaleDateString()).getTime()),
				new Date(
					new Date(new Date().toLocaleDateString()).getTime()
						+ 24 * 60 * 60 * 1000
						- 1
				)
			]
		};
	},
	created() {
		this.time = this.entryTime ? this.entryTime : [];
		this.defaultTime = this.defaultTime ? this.defaultTime : "today";
		let today = new Date(),
			y = today.getFullYear(),
			m = today.getMonth();
		let date = this.$utils.sys_formatDate(today.getTime(), "yyyy-MM-dd");
		let monthFirstday = this.$utils.sys_formatDate(
			new Date(y, m, 1).getTime(),
			"yyyy-MM-dd"
		);
		let monthLastDay = this.$utils.sys_formatDate(
			new Date(y, m + 1, 0).getTime(),
			"yyyy-MM-dd"
		);
		today.setDate(today.getDate() - today.getDay() + 1);
		let weekFirstDay
			= today.getFullYear()
			+ "-"
			+ (today.getMonth() + 1)
			+ "-"
			+ today.getDate()
			+ " 00:00:00";
		today.setDate(today.getDate() + 6);
		let weekLastDay
			= today.getFullYear()
			+ "-"
			+ (today.getMonth() + 1)
			+ "-"
			+ today.getDate()
			+ " 23:59:59";
		if (this.defaultTime === "today") {
			this.placeholderStart = date + " 00:00:00";
			this.placeholderEnd = date + " 23:59:59";
		} else if (this.defaultTime === "months") {
			this.placeholderStart = monthFirstday + " 00:00:00";
			this.placeholderEnd = monthLastDay + " 23:59:59";
		} else if (this.defaultTime === "weeks") {
			this.placeholderStart = weekFirstDay;
			this.placeholderEnd = weekLastDay;
		}
		let year = today.getFullYear();
		let month = today.getMonth();
		this.days
			= (new Date(new Date(year, month + 1))
				- new Date(new Date(year, month)))
			/ (24 * 3600 * 1000);
		if (this.days !== 31) {
			this.days = 30;
		}
		const that = this;
		this.pickerOptions = {
			shortcuts: [
				{
					text: "今天",
					onClick(picker) {
						let start = new Date(date + " 00:00:00");
						let end = new Date(date + " 23:59:59");
						picker.$emit("pick", [start, end]);
					}
				},
				{
					text: "昨天",
					onClick(picker) {
						let yestoday = that.$utils.sys_formatDate(
							new Date(today.getTime() - 86400000),
							"yyyy-MM-dd"
						);
						let start = new Date(yestoday + " 00:00:00");
						let end = new Date(yestoday + " 23:59:59");
						picker.$emit("pick", [start, end]);
					}
				}
			]
		};
		if (that.dataType == "weeks" || that.dataType == "months") {
			let obj = {
				text: "最近一周",
				onClick(picker) {
					let end = new Date();
					let start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit("pick", [start, end]);
				}
			};
			that.pickerOptions.shortcuts.push(obj);
		}
		if (that.dataType == "months") {
			let obj = {
				text: "最近一月",
				onClick(picker) {
					let end = new Date();
					let start = new Date();
					start.setTime(
						start.getTime() - 3600 * 1000 * 24 * that.days
					);
					picker.$emit("pick", [start, end]);
				}
			};
			that.pickerOptions.shortcuts.push(obj);
		}
	},
	watch: {
		entryTime() {
			this.time = this.entryTime ? this.entryTime : [];
		}
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

				if (this.dataType == "days") {
					if (start.substring(0, 10) !== end.substring(0, 10)) {
						this.$alert("只能选择同一天", "温馨提示", {
							confirmButtonText: "确定",
							type: "warning",
							callback: () => {
								this.time = [];
							}
						});
					}
				} else if (this.dataType == "weeks") {
					if (endTime - startTime > 1000 * 60 * 60 * 24 * 7) {
						this.$alert("选择范围不能超过7天", "温馨提示", {
							confirmButtonText: "确定",
							type: "warning",
							callback: () => {
								this.time = [];
							}
						});
					}
				} else if (this.dataType == "months") {
					if (endTime - startTime > 1000 * 60 * 60 * 24 * this.days) {
						this.$alert("选择范围不能超过一个月", "温馨提示", {
							confirmButtonText: "确定",
							type: "warning",
							callback: () => {
								this.time = [];
							}
						});
					}
				} else if (this.dataType == "currentMonth") {
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
		}
	}
};
</script>
<style lang="scss">
</style>