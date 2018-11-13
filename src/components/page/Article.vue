<template>
	<div class="table" v-loading="fullscreenLoading">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 文章</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
				<el-input v-model="select_word" placeholder="文章名" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="search" @click="search">搜索</el-button>
				<el-button type="primary" @click="add"><i class="el-icon-plus"></i>新增</el-button>
			</div>
			<el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="文章id" sortable width="100">
				</el-table-column>
				<el-table-column prop="created_at" label="创建时间" sortable width="200">
				</el-table-column>
				<el-table-column prop="name" label="名称" width="320">
				</el-table-column>
				<el-table-column prop="keyword" label="简介">
				</el-table-column>
				<el-table-column prop="status" label="状态" width="120" :formatter="formatter">
				</el-table-column>
				<el-table-column label="操作" width="100" align="center">
					<template slot-scope="scope">
						<el-button type="text" class="size" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
						<el-button type="text" icon="el-icon-delete" class="red size" @click="handleDelete( scope.row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination :page-size="pageSize" background @current-change="handleCurrentChange" layout="prev, pager, next"
				 :total="paginateTotal">
				</el-pagination>
			</div>
		</div>

		<!-- 新增弹出框 -->
		<el-dialog :visible.sync="addVisible" width="60%" @close='closeDialog'>
			<el-form ref="addform" :model="addform" label-width="100px">
				<el-form-item label="名称">
					<el-input v-model="addform.name"></el-input>
				</el-form-item>
				<el-form-item label="作者">
					<el-input v-model="addform.author"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="addform.status">
						<el-radio label="1">发布</el-radio>
						<el-radio label="0">未发布</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="文章类型">
					<el-radio-group v-model="addform.type">
						<el-radio label="php">php</el-radio>
						<el-radio label="mysql">mysql</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload action="/api/upload/image" list-type="picture-card" accept="image/*" :limit="imgLimit" :file-list="fileList2"
					 :multiple="isMultiple" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess"
					 :before-upload="beforeAvatarUpload" :on-exceed="handleExceed" :on-error="imgUploadError">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="简介">
					<el-input type="textarea" rows="5" v-model="addform.keyword"></el-input>
				</el-form-item>
				<el-form-item label="文章类型">
					<el-checkbox-group>
						<quill-editor ref="myTextEditor" v-model="addform.content" :options="editorOption"></quill-editor>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveAdd()">确 定</el-button>
			</span>
		</el-dialog>


		<!-- 编辑弹出框 -->
		<el-dialog :visible.sync="editVisible" width="60%" @close='closeDialog'>
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="作者">
					<el-input v-model="form.author"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="form.status">
						<el-radio label="1">发布</el-radio>
						<el-radio label="0">未发布</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="文章类型">
					<el-radio-group v-model="form.type">
						<el-radio label="php">php</el-radio>
						<el-radio label="mysql">mysql</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload action="/api/upload/image" list-type="picture-card" accept="image/*" :limit="imgLimit" :file-list="fileList3"
					 :multiple="isMultiple" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess"
					 :before-upload="beforeAvatarUpload" :on-exceed="handleExceed" :on-error="imgUploadError">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="简介">
					<el-input type="textarea" rows="5" v-model="form.keyword"></el-input>
				</el-form-item>
				<el-form-item label="文章类型">
					<el-checkbox-group>
						<quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit(form.id)">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 删除提示框 -->
		<el-dialog :visible.sync="delVisible" width="300px" center>
			<div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteRow">确 定</el-button>
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
		name: 'basetable',
		data() {
			return {
				url: './static/vuetable.json',
				tableData: [],
				paginateTotal: 0,
				cur_page: 1,
				pageSize: 10,
				multipleSelection: [],
				select_word: '',
				del_list: [],
				editVisible: false,
				delVisible: false,
				addVisible: false,
				addform: {
					status: '0',
					type: 'php'
				},
				form: {
					id: '',
					name: '',
					status: '',
					keyword: '',
					created_at: '',
					type: ''
				},
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
				idx: 0,
				fullscreenLoading: true,
				dialogImageUrl: '',	
				dialogVisible: false,
				fileList2: [],
				fileList3: [],
				isMultiple: true,
				uploadImage: [],
				uploadImage2: [],
				imgLimit: 6
			}
		},
		created() {
			this.getData();
		},
		computed: {
			data() {
				return this.tableData.filter((d) => {
					return d;
				})
			}
		},
		components: {
			quillEditor
		},
		methods: {
			// 分页导航
			handleCurrentChange(val) {
				this.cur_page = val;
				this.getData();
			},
			closeDialog() {
				this.fileList3 = [];
				this.uploadImage2 = [];
				this.fileList2 = [];
			},
			getData() {
				this.fullscreenLoading = true;
				this.url = '/api/article/detail';
				this.$axios.post(this.url, {
					page: this.cur_page,
					select_word: this.select_word
				}, {
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then((res) => {
					this.tableData = res.data.data.data;
					this.paginateTotal = res.data.data.total;
					this.pageSize = res.data.data.per_page
					this.fullscreenLoading = false;
				})
			},
			formatter(row, column) {
				return row.status == 0 ? '未发布' : '发布';
			},
			add() {
				this.addform.name = '';
				this.addform.author = '';
				this.addform.keyword = '';
				this.addform.content = '';
				this.addVisible = true;
				this.uploadImage = [];
			},
			saveAdd() {
				this.fullscreenLoading = true;
				this.addVisible = false;
				this.url = '/api/article/add/save';
				this.$axios.post(this.url, {
					name: this.addform.name,
					author: this.addform.author,
					status: this.addform.status,
					type: this.addform.type,
					keyword: this.addform.keyword,
					content: this.addform.content,
					image: this.uploadImage
				}, {
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then((res) => {
					this.fullscreenLoading = false;
					if (res.data.code == 1) {
						this.getData();
						this.$message.success('文章新增成功');
					} else {
						this.$message.error('请求错误，请稍后再试');
					}
				})
			},
			search() {
				this.getData();
			},
			handleEdit(row) {
				this.idx = row.id;
				this.form = {
					id: row.id,
					name: row.name,
					author: row.author,
					status: row.status.toString(),
					type: row.type,
					keyword: row.keyword,
					content: row.content
				}
				if (row.article_images.length > 0) {
					for (let i = 0; i < row.article_images.length; i++) {
						console.log(row.article_images[i]['image']);
						this.fileList3.push({
							name: '123',
							url: this.appUrl + '/storage/' + row.article_images[i]['image'],
							response: {
								code: 1,
								data: row.article_images[i]['image'],
								message: 'success'
							}
						});
						this.uploadImage2.push(row.article_images[i]['image']);
					}
				}
				this.editVisible = true;
			},
			handleDelete(row) {
				this.idx = row.id;
				this.delVisible = true;
			},
			delAll() {
				const length = this.multipleSelection.length;
				let str = '';
				this.del_list = this.del_list.concat(this.multipleSelection);
				for (let i = 0; i < length; i++) {
					str += this.multipleSelection[i].name + ' ';
				}
				this.$message.error('删除了' + str);
				this.multipleSelection = [];
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 保存编辑
			saveEdit(id) {
				console.log(this.uploadImage2);
				this.fullscreenLoading = true;
				this.editVisible = false;
				this.url = '/api/article/update';
				this.$axios.post(this.url, {
					id: this.form.id,
					name: this.form.name,
					author: this.form.author,
					status: this.form.status,
					type: this.form.type,
					keyword: this.form.keyword,
					content: this.form.content,
					image: this.uploadImage2
				}, {
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then((res) => {
					this.fullscreenLoading = false;
					if (res.data.code == 1) {
						this.getData();
						this.$message.success(`修改第 ${this.idx} 行成功`);
					} else {
						this.$message.error('请求错误，请稍后再试');
					}
				})
			},
			// 确定删除
			deleteRow() {
				this.fullscreenLoading = true;
				this.delVisible = false;
				this.url = '/api/article/deleted';
				this.$axios.post(this.url, {
					id: this.idx
				}, {
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then((res) => {
					this.fullscreenLoading = false;
					if (res.data.code == 1) {
						this.getData();
						this.$message.success('删除成功');
					} else {
						this.$message.error('请求错误，请稍后再试');
					}
				})
			},
			handleRemove(file, fileList) { //移除图片
				this.uploadImage = [];
				this.uploadImage2 = [];
				console.log(fileList);
				for (let i = 0; i < fileList.length; i++) {
					this.uploadImage.push(fileList[i]['response']['data']);
					this.uploadImage2.push(fileList[i]['response']['data']);
				}

			},
			handlePictureCardPreview(file) { //预览图片时调用
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},

			beforeAvatarUpload(file) { //文件上传之前调用做一些拦截限制
				// console.log(file);
				const isJPG = true;
				// const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				// if (!isJPG) {
				//   this.$message.error('上传头像图片只能是 JPG 格式!');
				// }
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			handleAvatarSuccess(res, file) { //图片上传成功
				this.uploadImage.push(res.data);
				this.imageUrl = URL.createObjectURL(file.raw);
				this.uploadImage2.push(res.data);
				console.log(this.uploadImage2);

			},
			handleExceed(files, fileList) { //图片上传超过数量限制
				this.$message.error('上传图片不能超过6张!');
			},
			imgUploadError(err, file, fileList) { //图片上传失败调用
				this.$message.error('上传图片失败!');
			}
		}
	}
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px;
	}

	.handle-select {
		width: 120px;
	}

	.handle-input {
		width: 300px;
		display: inline-block;
	}

	.del-dialog-cnt {
		font-size: 16px;
		text-align: center
	}

	.table {
		width: 100%;
		font-size: 14px;
	}

	.red {
		color: #ff0000;
	}

	.size {
		font-size: 13px;
	}
</style>
