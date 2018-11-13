<template>

	<div class="quill-wrap">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 文章 <a href="#" style="color: #00D1B2;font-size:10px ;">点击右下角可以修改文章内容</a></el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div v-html="info" style="padding: 20px;background: #fff;">{{info}}</div>
		<el-row style='padding-top: 20px;float: right;'>
			<el-button type="primary" @click=edit();>修改文章</el-button>
		</el-row>
		<!-- 编辑弹出框 -->
		<el-dialog :visible.sync="editVisible" width="60%">
			<el-form ref="form" :model="form" label-width="100px">
				<quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit()">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>


<script>
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import {
		quillEditor,
		Quill
	} from 'vue-quill-editor'
	import {
		container,
		ImageExtend,
		QuillWatch
	} from 'quill-image-extend-module'
	Quill.register('modules/ImageExtend', ImageExtend)
	export default {
		components: {
			quillEditor
		},
		data() {
			return {
				content: '编辑输入的内容',
				editorOption: {
					modules: {
						ImageExtend: {
							loading: true,
							size: 1, // 可选参数 图片大小，单位为M，1M = 1024kb
							name: 'file',
							action: '/api/upload/editimage',
							response: (res) => {
								return res.data
							},
							sizeError: () => {
								this.$message.error('上传图片大小不能超过 1MB!');
							}
						},
						toolbar: {
							container: container,
							handlers: {
								'image': function() {
									QuillWatch.emit(this.quill.id)
								}
							}
						}
					}
				},
				editVisible: false,
				form: {
					content: ''
				},
				info: ""
			}
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				this.url = '/api/about/detail';
				this.$axios.post(this.url, {}, {
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then((res) => {
					this.info = res.data.data.content;
					this.form.content = res.data.data.content;
				})
			},
			edit() {
				this.editVisible = true;
			},
			saveEdit() {
				this.fullscreenLoading = true;
				this.editVisible = false;
				this.url = '/api/about/update';
				this.$axios.post(this.url, {
					content: this.form.content
				}, {
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then((res) => {
					this.fullscreenLoading = false;
					if (res.data.code == 1) {
						this.getData();
						this.$message.success(`更新成功`);
					} else {
						this.$message.error('请求错误，请稍后再试');
					}
				})
			}
		}
	}
</script>
<style scoped>
	.editor-btn {
		margin-top: 20px;
	}
