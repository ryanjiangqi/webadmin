<template>
	<div class="quill-wrap" style="background: #fff;">
		<quill-editor v-model="content" ref="myQuillEditor" :options="editorOption">
		</quill-editor>
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
				}
			}
		}
	}
</script>
<style scoped>
	.editor-btn {
		margin-top: 20px;
	}
