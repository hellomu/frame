<template>
	<div class="user-avatar-layout">
		<el-dropdown
			trigger="click"
			@command="dialogVisible = true"
		>
			<span class="el-dropdown-link">
				Admin
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>修改密码</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<el-dialog
			class="dialog-mini"
			title="修改密码"
			:visible.sync="dialogVisible"
			width="20%"
			:before-close="handleClose"
			center
			@keydown.enter.native="submit('passForm')"
		>
			<el-form
				ref="passForm"
				:model="passForm"
				status-icon
				:rules="rules"
				class="demo-passForm"
				:hide-required-asterisk="false"
			>
				<el-form-item
					prop="oldPassword"
					placeholder="请输入原密码"
				>
					<el-input
						v-model.trim="passForm.oldPassword"
						type="password"
						placeholder="请输入原密码"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item prop="newPassword">
					<el-input
						v-model.trim="passForm.newPassword"
						type="password"
						placeholder="请输入新密码"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item prop="checkPass">
					<el-input
						v-model.trim="passForm.checkPass"
						type="password"
						placeholder="请重复输入新密码"
						autocomplete="off"
					></el-input>
				</el-form-item>
			</el-form>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="cancle('passForm')">取 消</el-button>
				<el-button
					type="primary"
					@click="submit('passForm')"
				>确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { resetPass } from "@/axios/api";

export default {
	data() {
		let _this = this;
		const passwordCheck = (rule, value, callback) => {
			if (value === _this.passForm.oldPassword) {
				callback(new Error("新密码与旧密码重复"));
			} else {
				callback();
			}
		};
		const passwordVal = (rule, value, callback) => {
			if (value !== _this.passForm.newPassword) {
				callback(new Error("两次输入不一致"));
			} else {
				callback();
			}
		};
		return {
			// showBtn: false,
			dialogVisible: false,
			passForm: {
				oldPassword: "",
				newPassword: "",
				checkPass: ""
			},
			rules: {
				oldPassword: [
					{
						required: true,
						message: "原密码不能为空",
						trigger: "blur"
					}
				],
				newPassword: [
					{
						required: true,
						message: "新密码不能为空",
						trigger: "blur"
					},
					{
						trigger: ["change", "blur"],
						validator: this.$validator.validatorPassword
					},
					{
						trigger: ["change", "blur"],
						validator: passwordCheck
					}
				],
				checkPass: [
					{
						required: true,
						message: "请重复输入新密码",
						trigger: "blur"
					},
					{
						trigger: ["change", "blur"],
						validator: passwordVal
					}
				]
			}
		};
	},
	methods: {
		cancle(formName) {
			this.$refs[formName].resetFields();
			this.dialogVisible = false;
		},
		submit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					resetPass(this.passForm).then(res => {
						if (res.retCode === "000000") {
							this.dialogVisible = false;
							localStorage.removeItem("userInfo");
							this.$router.push("/login");
						}
					});
				} else {
					return false;
				}
			});
		},
		handleClose(done) {
			this.$refs.passForm.resetFields();
			done();
		}
	}
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
	color: #fff;
	&:hover {
		cursor: pointer;
		color: #409eff;
	}
}
</style>