<template>
	<div class="quill-wrap" v-loading="fullscreenLoading">
		<web-head></web-head>
		<div class="details-content"  style="min-height: 850px;">
			<el-breadcrumb separator-class="el-icon-arrow-right" style='margin-top: 20px;'>
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>活动管理</el-breadcrumb-item>
				<el-breadcrumb-item>活动列表</el-breadcrumb-item>
				<el-breadcrumb-item>活动详情</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="title" style="padding-left: 0;">
				<h3 v-html='name'>{{name}}</h3>
				<h4 v-html='keyword'>{{keyword}}</h4>
			</div>
			<!-- <div class="img-box"> -->
				<!-- <span v-for="value in productImg"><img style="width: 100%;" v-bind:src="appUrl + '/storage/' + value['image']" alt=""></span> -->
			<!-- </div> -->
			<div class="img-box" v-html="productDetail">{{productDetail}}</div>

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
				productId: '',
				productDetail: '',
				name: '',
				keyword: '',
				productImg: [],
				fullscreenLoading: true,
			}
		},
		methods: {
			getData() {
				this.fullscreenLoading = true;
				this.url = '/api/article/productdetail';
				this.$axios.post(this.url, {
					id: this.productId
				}).then((res) => {
					this.productDetail = res.data.data.content;
					this.name = res.data.data.name;
					this.keyword = res.data.data.keyword;
					this.productImg = res.data.data.article_images;
					this.fullscreenLoading = false;
					console.log(this.productImg);
				})
			}
		},
		mounted(){
    console.log("页面加载完成")
},
		components: {
			webHead,
			webFoot
		},
		created() {
			this.productId = this.$route.params.id;
			this.getData();
		}
	}
</script>
