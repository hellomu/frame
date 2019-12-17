<template>
	<div
		class="login-layout"
		@keydown.enter="login"
	>
		<div class="form-layout">
			<div>
				<img
					class="logo-main"
					src="@/assets/images/now-logo.png"
				/>
			</div>
			<el-form
				ref="loginForm"
				:model="loginForm"
				:rules="rules"
			>
				<el-form-item prop="username">
					<el-input
						v-model.trim="loginForm.username"
						placeholder="用户名"
						prefix-icon="ri-user-line"
					></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						type="password"
						v-model.trim="loginForm.password"
						placeholder="密码"
						prefix-icon="ri-lock-line"
						show-password
					></el-input>
				</el-form-item>
				<!-- 公司大多数系统有验证码，但是运营3.0目前没有，已得知要添加验证码系统 -->
				<!-- <el-form-item prop="captcha">
					<el-input
						v-model.trim="loginForm.captcha"
						:maxlength="4"
						placeholder="验证码"
						prefix-icon="ri-key-line"
						style="width: 50%;"
					></el-input>
					<img
						class="randomCode-main"
						:src="randomCode"
						@click="getRandomCode"
					/>
				</el-form-item>-->
				<el-form-item class="login-form-item">
					<el-checkbox v-model="checked">记住用户名</el-checkbox>
				</el-form-item>
				<el-form-item class="login-form-item">
					<el-button
						type="primary"
						style="width: 100%;"
						@click="login"
					>登录</el-button>
				</el-form-item>
				<el-form-item class="login-form-item">
					<p class="form-bottom-tips">
						<span>
							<i class="el-icon-star-on"></i> 推荐使用谷歌浏览器,享受更优质的体验
						</span>
					</p>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { getRandomCode, login } from "@/axios/api";
// import MD5 from "js-md5";

export default {
	name: "login",
	components: {},
	data() {
		return {
			checked: false,
			randomCode: "",
			showPasswrod: false,
			loginForm: {
				username: "",
				password: "",
				captcha: ""
			},
			rules: {
				username: [
					{
						trigger: ["change", "blur"],
						validator: this.$validator.validatorUsername
					}
				],
				password: [
					{
						trigger: ["change", "blur"],
						validator: this.$validator.validatorPassword
					}
				],
				captcha: [
					{
						required: true,
						message: "请输入验证码",
						trigger: "change"
					}
				]
			}
		};
	},
	methods: {
		// 获取验证码
		getRandomCode() {
			let timestamp = new Date().valueOf();
			getRandomCode(timestamp).then(res => {
				this.randomCode = window.URL.createObjectURL(res);
			});
		},
		// 登录
		login() {
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					let data = {
						username: this.loginForm.username,
						password: this.loginForm.password // 其实应该用MD5加密，但是后台的接口只支持明文传输（呵呵），该项目集成了js-md5，可以直接Import使用
						// captcha: this.loginForm.captcha
					};
					login(data).then(res => {
						// mock数据，尽量模拟接口的真实出参，
						// 此处还需要将token取出存到本地，但是后台把token放在验证码的接口中返回到前台（呵呵），切换到运营3.0的服务后应该就正常了
						if (res.retCode === "000000") {
							let { userName, secretKey } = res.rows;
							// localStorage只存储用户名和token，防止用户信息泄露
							localStorage.setItem(
								"userInfo",
								JSON.stringify({
									userName,
									secretKey
								})
							);
							this.checked
								&& localStorage.setItem("rememberName", userName);
							// 用户信息存在了vuex里，但是一旦刷新就会消失。所以刷新后要拿sessionStorage里的token去后台重新请求用户信息
							this.$store.commit("setUserInfo", res.rows);
							this.$router.push("/homepage");
						}
					});
				} else {
					return false;
				}
			});
		}
	},
	created() {
		let userName = localStorage.getItem("rememberName");
		if (userName) {
			this.checked = true;
			this.$set(this.loginForm, "username", userName);
		}
	},
	mounted() {
		// this.getRandomCode();
	}
};
</script>

<style lang="scss" scoped>
.login-layout {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.form-layout {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.logo-main {
			width: 50px;
			height: 40px;
			margin-bottom: $margin-base;
		}
		form {
			width: 300px;
			.login-form-item {
				margin: 0;
			}
			.randomCode-main {
				width: 130px;
				height: 38px;
				float: right;
				border: $border-base;
			}
			.form-bottom-tips {
				color: #dda450;
				font-size: $font-size-small;
				text-align: right;
			}
		}
	}
}
</style>