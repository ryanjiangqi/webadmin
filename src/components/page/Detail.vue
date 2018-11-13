<template>
	<div class="quill-wrap">
		<web-head></web-head>
		<div class="details-content">
			<div class="title">
				<h5>欢迎您的到来</h5>
				<h3>好礼品我们造,用心做好产品</h3>
				<h4>We build good products and make good products.</h4>
			</div>
			<div class="img-box">
				<img src="../../../static/images/xq_img1.jpg">
				<img src="../../../static/images/xq_img2.jpg">
				<img src="../../../static/images/xq_img3.jpg">
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
