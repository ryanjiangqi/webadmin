<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 管理员</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
				<el-input v-model="select_word" placeholder="姓名 | 邮箱" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="search" @click="search">搜索</el-button>
				<el-button type="primary" @click="add"><i class="el-icon-plus"></i>新增</el-button>
			</div>
			<el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="id" sortable width="80">
				</el-table-column>
				<el-table-column prop="created_at" label="创建时间" sortable width="250">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120">
				</el-table-column>
				<el-table-column prop="email" label="邮箱" :formatter="formatter">
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
		<el-dialog :visible.sync="addVisible" width="30%">
			<el-form ref="addform" :model="addform" label-width="100px">
				<el-form-item label="姓名">
					<el-input v-model="addform.name"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="addform.email"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveAdd()">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 编辑弹出框 -->
		<el-dialog :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="注册时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.created_at" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="form.email"></el-input>
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
					name: '',
					email: ''
				},
				form: {
					id: '',
					name: '',
					created_at: '',
					email: ''
				},
				idx: 0
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
		methods: {
			// 分页导航
			handleCurrentChange(val) {
				this.cur_page = val;
				this.getData();
			},
			getData() {
				this.url = '/api/user/detail';
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
				})
			},
			add() {
				this.addform.name = '';
				this.addform.email = '';
				this.addVisible = true;
			},
			saveAdd() {
				this.addVisible = false;
				this.url = '/api/user/add/save';
				this.$axios.post(this.url, {
					name: this.addform.name,
					email: this.addform.email
				}, {
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then((res) => {
					if (res.data.code == 1) {
						this.getData();
						this.$message.success('用户新增成功');
					} else {
						this.$message.error('请求错误，请稍后再试');
					}
				})
			},
			search() {
				this.getData();
			},
			formatter(row, column) {
				return row.email;
			},
			handleEdit(row) {
				this.idx = row.id;
				this.form = {
					id: row.id,
					name: row.name,
					created_at: row.created_at,
					email: row.email
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
				this.editVisible = false;
				this.url = '/api/user/update';
				this.$axios.post(this.url, {
					id: this.form.id,
					name: this.form.name,
					email: this.form.email
				}, {
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then((res) => {
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
				this.delVisible = false;
				this.url = '/api/user/deleted';
				this.$axios.post(this.url, {
					id: this.idx
				}, {
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then((res) => {
					if (res.data.code == 1) {
						this.getData();
						this.$message.success('删除成功');
					} else {
						this.$message.error('请求错误，请稍后再试');
					}
				})
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
