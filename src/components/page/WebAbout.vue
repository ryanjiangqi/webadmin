<template>
	<div class="quill-wrap" v-loading="fullscreenLoading">
		<web-head></web-head>
		<div class="details-content" style="min-height: 850px;">
			<el-breadcrumb separator-class="el-icon-arrow-right" style='margin-top: 20px;'>
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>活动管理</el-breadcrumb-item>
				<el-breadcrumb-item>活动列表</el-breadcrumb-item>
				<el-breadcrumb-item>活动详情</el-breadcrumb-item>
			</el-breadcrumb>
		
			<div class="about-info" style="padding-top: 0;" v-html="productDetail">
			{{productDetail}}

			</div>
		</div>
		<web-foot></web-foot>
	</div>
</template>

<script>
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import webHead from '../common/HeadWeb.vue';
	import webFoot from '../common/FootWeb.vue';
	export default {
		data: function() {
			return {
				productDetail: '',
				fullscreenLoading: true
			}
		},
		methods: {
			getData() {
				this.fullscreenLoading = true;
				this.url = '/api/about/detail';
				this.$axios.post(this.url, {

				}, {
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then((res) => {
					this.productDetail = res.data.data.content;
					this.fullscreenLoading = false;
					
				})
			}
		},
		created() {
			this.getData();
		},
		components: {
			webHead,
			webFoot
		}
	}
</script>
