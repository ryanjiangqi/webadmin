<template>
	<div class="header_box">
		<div class="header_web">
			<ul class="app-header">
				<li class="app-header-menuicon">
					<i class="layui-icon layui-icon-more-vertical"></i>
				</li>
			</ul>
			<h1 class="logo">
				<a href="#" ><img style="width: 100%;" src="../../../static/images/logo.png" alt=""></a>
			</h1>
			<div class="nav" style="visibility: visible">
				<a href="#/index" v-bind:class="{ active: indexActive }">首页</a>
				<a href="#/product" v-bind:class="{ active: productActive }">产品</a>
				<a href="#/webabout" v-bind:class="{ active: aboutActive }">关于我们</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				indexActive: false,
				productActive: false,
				aboutActive: false
			}
		},
		methods: {
			changeNav() {
				if (this.$route.path == '/index') {
					this.indexActive = true;
				}
				if (this.$route.path == '/product') {
					this.productActive = true;
				}
				if (this.$route.path == '/webabout') {
					this.aboutActive = true;
				}
				if (this.$route.path == '/detail') {
					this.productActive = true;
				}
			}
		},
		components: {

		},
		created() {
			this.changeNav();
		}
	}
</script>
<style scoped>
