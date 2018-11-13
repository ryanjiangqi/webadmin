<template>
	<div class="quill-wrap">
		<web-head></web-head>
		<div class="details-content">
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
				productImg: []
			}
		},
		methods: {
			getData() {
				this.fullscreenLoading = true;
				this.url = '/api/article/productdetail';
				this.$axios.post(this.url, {
					id: this.productId
				}, {
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
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
