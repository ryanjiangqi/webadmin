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
						<div class="layui-col-xs6 layui-col-sm6 layui-col-md3">
							<div class="img-txt">
								<img style="width: 100%;" src="../../../static/images/sy_img1.jpg" alt="">
								<h3>食品包装</h3>
							</div>
						</div>
						<div class="layui-col-xs6 layui-col-sm6 layui-col-md3">
							<div class="img-txt">
								<img style="width: 100%;" src="../../../static/images/sy_img2.jpg" alt="">
								<h3>食品包装</h3>
							</div>
						</div>
						<div class="layui-col-xs6 layui-col-sm6 layui-col-md3">
							<div class="img-txt">
								<img style="width: 100%;" src="../../../static/images/sy_img3.jpg" alt="">
								<h3>食品包装</h3>
							</div>
						</div>
						<div class="layui-col-xs6 layui-col-sm6 layui-col-md3">
							<div class="img-txt">
								<img style="width: 100%;" src="../../../static/images/sy_img4.jpg" alt="">
								<h3>食品包装</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="prod-descr">
				<div class="layui-fluid">
					<div class="layui-row">
						<div class="item layui-clear">
							<div class="layui-col-xs12 layui-col-sm6 layui-col-md6">
								<img src="../../../static/images/sy_img5.jpg" class="left-img">
							</div>
							<div class="layui-col-xs12 layui-col-sm6 layui-col-md6">
								<div class="text">
									<h3>优秀包装设计美学</h3>
									<p>本公司专门为您打造定制的商品包装。本公司专门为您打造定制的商品包装。</p>
									<a href="details.html">查看更多 ></a>
								</div>
							</div>
							<div class="layui-col-xs12 layui-col-sm12 layui-col-md8 bot-img-box">
								<div class="bot-img">
									<img src="../../../static/images/sy_img6.jpg">
								</div>
							</div>
						</div>
					</div>
					<div class="layui-row">
						<div class="item layui-clear">
							<div class="layui-col-xs12 layui-col-sm6 layui-col-md6">
								<img src="../../../static/images/sy_img7.jpg" class="left-img">
							</div>
							<div class="layui-col-xs12 layui-col-sm6 layui-col-md6">
								<div class="text">
									<h3>上等材质制作包装</h3>
									<p>本公司专门为您打造定制的商品包装。本公司专门为您打造定制的商品包装。</p>
									<a href="details.html">查看更多 ></a>
								</div>
							</div>
							<div class="layui-col-xs12 layui-col-sm12 layui-col-md8 bot-img-box">
								<div class="bot-img">
									<img src="../../../static/images/sy_img8.jpg">
								</div>
							</div>
						</div>
					</div>
					<div class="layui-row">
						<div class="item layui-clear">
							<div class="layui-col-xs12 layui-col-sm6 layui-col-md6">
								<img src="../../../static/images/sy_img9.jpg" class="left-img">
							</div>
							<div class="layui-col-xs12 layui-col-sm6 layui-col-md6">
								<div class="text">
									<h3>高级设备流水制作</h3>
									<p>本公司专门为您打造定制的商品包装。本公司专门为您打造定制的商品包装。</p>
									<a href="details.html">查看更多 ></a>
								</div>
							</div>
							<div class="layui-col-xs12 layui-col-sm12 layui-col-md8 bot-img-box">
								<div class="bot-img">
									<img src="../../../static/images/sy_img610.jpg">
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

			}
		},
		methods: {

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
