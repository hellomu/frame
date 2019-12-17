function validatorUsername(rule, value, callback) {
	if (value === "") {
		callback(new Error("请输入用户名"));
	} else {
		let reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,25}$/;
		if (!reg.test(value)) {
			callback(new Error("只能输入1-25位数字、字母或者中文"));
		}
		callback();
	}
}
function validatorPassword(rule, value, callback) {
	if (value === "") {
		callback(new Error("请输入密码"));
	} else {
		let reg = /^[A-Za-z0-9`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]{6,12}$/;
		if (!reg.test(value)) {
			callback(new Error("只能输入6-12位数字、字母或者符号"));
		}
		callback();
	}
}

export default {
	validatorUsername,
	validatorPassword
};
