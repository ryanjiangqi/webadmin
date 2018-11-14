<template>
	<div class="quill-wrap" v-loading="fullscreenLoading">
		<web-head></web-head>
		<div class="details-content" style="min-height: 850px;">
			<div class="title">
				<h5>欢迎您的到来</h5>
				<h3>好礼品我们造,做好产品，我们是认真的</h3>
				<h4>We build good products and make good products.</h4>
			</div>
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
				productData: []
			}
		},
		methods: {
			getData() {
				this.fullscreenLoading = true;
				this.url = '/api/article/webdetail';
				this.$axios.post(this.url, {
					page: this.cur_page,
					select_word: this.select_word
				}).then((res) => {
					console.log(res);
					this.productData = res.data.data;
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
