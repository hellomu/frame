const Utils = {
	getIndividuation(tableName) {
		let individuation = localStorage.getItem("individuation");
		if (individuation) {
			individuation = JSON.parse(individuation);
			if (individuation[tableName]) {
				return individuation[tableName];
			}
		}
	},
	columnDrop(Vue, tableName, dropCol) {
		const wrapperTr = document.querySelector(
			`.${tableName} .el-table__header-wrapper tr`
		);
		Vue.sortable = Vue.$sortable.create(wrapperTr, {
			animation: 180,
			delay: 0,
			onEnd: evt => {
				const oldItem = Vue[dropCol][evt.oldIndex];
				Vue[dropCol].splice(evt.oldIndex, 1);
				Vue[dropCol].splice(evt.newIndex, 0, oldItem);
				let individuation = localStorage.getItem("individuation");
				if (individuation) {
					individuation = JSON.parse(individuation);
				} else {
					individuation = {};
				}
				individuation[tableName] = Vue[dropCol];
				localStorage.setItem(
					"individuation",
					JSON.stringify(individuation)
				);
			}
		});
	},
	sys_formatDate(date, format) {
		if (!date) {
			return;
		}
		if (!format) {
			format = "yyyy-MM-dd";
		}
		switch (typeof date) {
		case "string":
			date = new Date(date);
			break;
		case "number":
			date = new Date(date);
			break;
		default:
			return;
		}
		if (!(date instanceof Date)) {
			return;
		}
		let dict = {
			yyyy: date.getFullYear(),
			M: date.getMonth() + 1,
			d: date.getDate(),
			H: date.getHours(),
			m: date.getMinutes(),
			s: date.getSeconds(),
			MM: ("" + (date.getMonth() + 101)).substr(1),
			dd: ("" + (date.getDate() + 100)).substr(1),
			HH: ("" + (date.getHours() + 100)).substr(1),
			mm: ("" + (date.getMinutes() + 100)).substr(1),
			ss: ("" + (date.getSeconds() + 100)).substr(1)
		};
		return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
			return dict[arguments[0]];
		});
	}
};

export default Utils;
