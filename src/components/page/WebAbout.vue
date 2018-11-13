<template>
	<div class="quill-wrap">
		<web-head></web-head>
		<div class="details-content">
			<el-breadcrumb separator-class="el-icon-arrow-right" style='margin-top: 20px;'>
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>活动管理</el-breadcrumb-item>
				<el-breadcrumb-item>活动列表</el-breadcrumb-item>
				<el-breadcrumb-item>活动详情</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="title">
				<h5>欢迎您的到来</h5>
				<h3>好礼品我们造,用心做好产品</h3>
				<h4>We build good products and make good products.</h4>
			</div>
		    <div class="about-info" style="padding-top: 0;">
		      <div class="img-texts" style="padding-top: 0;">
		        <div class="item">
		          <div class="layui-fluid">
		            <div class="layui-row">
		              <div class="layui-col-xs12 layui-col-sm12 layui-col-md6 img-center">
		                <img src="../../../static/images/gy_img1.jpg">
		              </div>
		              <div class="layui-col-xs12 layui-col-sm12 layui-col-md6">
		                <div class="text">
		                  <h5>About us</h5>
		                  <h4>关于我们</h4>
		                  <p>如果眼下还是一团零星之火，那运筹帷幄之后，迎面东风，就是一场烈焰燎原吧，那必定会是一番尽情的燃烧。待，秋风萧瑟时，散作满天星辰，你看那四季轮回，正是 layui 不灭的执念。如果眼下还是一团零星之火，那运筹帷幄之后，迎面东风，就是一场烈焰燎原吧，那必定会是一番尽情的燃烧。待，秋风萧瑟时，散作满天星辰，你看那四季轮回，正是 layui 不灭的执念。</p>
		                </div>
		              </div>
		            </div>
		          </div>
		        </div>  
		      </div>
		      <div class="coreTeam_box">
		        <div class="writebg"></div>
		        <div class="coreTeam">
		          <div class="layui-fluid">
		            <h3>核心团队</h3>
		            <h4>有了向心力，才有可能凝聚</h4>
		            <div class="layui-row layui-col-space15">
		              <div class="layui-col-xs12 layui-col-sm4 layui-col-md4">
		                <div class="imgTxt">
		                  <img src="../../../static/images/gy_img2.jpg" alt="">
		                  <h6>产品总监</h6>
		                </div>
		              </div>
		              <div class="layui-col-xs12 layui-col-sm4 layui-col-md4">
		                <div class="imgTxt">
		                  <img src="../../../static/images/gy_img3.jpg" alt="">
		                  <h6>设计总监</h6>
		                </div>
		              </div>
		              <div class="layui-col-xs12 layui-col-sm4 layui-col-md4">
		                <div class="imgTxt">
		                  <img src="../../../static/images/gy_img4.jpg" alt="">
		                  <h6>制作总监</h6>
		                </div>
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
		components:{
			webHead,webFoot
		}
	}
</script>

