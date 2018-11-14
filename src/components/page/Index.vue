<template>
	<div class="quill-wrap">
		<web-head></web-head>
		<div class="content">
			<div class="title">
				<h5>欢迎您的到来</h5>
				<h3>好礼品我们造,用心做好产品</h3>
				<h4>We build good products and make good products.</h4>
			</div>
			<el-carousel indicator-position="outside" height="700px">
				<el-carousel-item v-for="item in 4" :key="item">
					<img style="width: 100%" src="../../../static/images/sy_banner1.jpg">
				</el-carousel-item>
			</el-carousel>
			<div class="prod-show">
				<div class="layui-fluid">
					<div class="row layui-col-space12 layui-clear">
						<div class="layui-col-xs6 layui-col-sm6 layui-col-md3" v-for="value in productData">
							<a v-bind:href="'#/detail/id/'+value.id">
								<div class="img-txt" style="margin-bottom: 20px;">
									<img style="width: 100%;" v-bind:src="appUrl + '/storage/' + value.article_images[0]['image']" alt="">
									<h4>{{value.name.substring(1,20)}}</h4>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="prod-descr">
				<div class="layui-fluid">
					
					<div class="layui-row"  v-for="values in productDataBig">
						<div class="item layui-clear">
							<div class="layui-col-xs12 layui-col-sm6 layui-col-md6">
								<img v-bind:src="appUrl + '/storage/' + values.article_images[0]['image']" class="left-img">
							</div>
							<div class="layui-col-xs12 layui-col-sm6 layui-col-md6">
								<div class="text">
									<p>{{values.name.substring(1,20)}}</p>
									<h4>{{values.keyword}}</h4>
									<a href="details.html">查看更多 ></a>
								</div>
							</div>
							<div class="layui-col-xs12 layui-col-sm12 layui-col-md8 bot-img-box">
								<div class="bot-img">
									<img v-bind:src="appUrl + '/storage/' + values.article_images[1]['image']">
								</div>
							</div>
						</div>
					</div>
					
				</div>
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
				productData: [],
				productDataBig: []
			}
		},
		methods: {
			getData() {
				this.fullscreenLoading = true;
				this.url = '/api/article/indexdetail';
				this.$axios.post(this.url, {

				}).then((res) => {
					console.log(res);
					this.productData = res.data.data;
					this.fullscreenLoading = false;
				})
			},
			getDataBig() {
				this.fullscreenLoading = true;
				this.url = '/api/article/bigdetail';
				this.$axios.post(this.url, {

				}).then((res) => {
					console.log(res);
					this.productDataBig = res.data.data;
					this.fullscreenLoading = false;
				})
			}
		},
		created() {
			this.getData();
			this.getDataBig();
		},
		components: {
			webHead,
			webFoot
		}
	}
</script>

<style>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>
