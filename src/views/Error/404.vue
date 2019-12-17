<template>
	<div class="notfound"></div>
</template>

<script>
export default {
	data() {
		return {
			second: 5,
			timer: null
		};
	},
	watch: {
		second(val) {
			if (val <= 0) {
				this.timer = null;
				this.$router.push("/login");
			}
		}
	},
	created() {
		// this.timer = setInterval(() => {
		// 	this.second--;
		// }, 1000);
	}
};
</script>

<style lang="scss" scoped>
.notfound {
	background: url("../../assets/images/404.png") no-repeat;
	height: 100%;
	width: 100%;
	overflow: hidden;
	background-size: cover;
}
</style>