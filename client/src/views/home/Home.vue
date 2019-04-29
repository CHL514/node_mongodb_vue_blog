<template>
	<div class="layout">
		<Layout>
			<Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
				<Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
					<MenuItem name="1-1">
						<Icon type="ios-navigate"></Icon>
						<span>Home</span>
					</MenuItem>
				</Menu>
			</Sider>
			<Layout>
				<Header :style="{padding: 0}" class="layout-header-bar">
					<Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>

					<!-- 用户头像操作 -->
					<Dropdown style="margin-right: 20px;float: right;">
						<Button>
							{{user}}
							<Icon type="ios-arrow-down"></Icon>
						</Button>
						<DropdownMenu slot="list">
							<DropdownItem @click.native="logout">Logout</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</Header>
				<Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
					<Row type="flex" justify="end" class="code-row-bg" style="margin: 12px">
						<Col>
							<Button type="primary" @click="add_user_modal = true">add user</Button>
						</Col>
					</Row>
					<Table :loading="loading" :columns="columns" :data="data"></Table>
				</Content>
			</Layout>
		</Layout>

		<!-- 弹出层 -->
		<div>
			<!-- 添加 Modal -->
			<Modal
        v-model="add_user_modal"
        title="Common Modal dialog box title"
			>
				<Form ref="formRight" :model="formRight" label-position="right" :label-width="100" :rules="ruleInline">
					<FormItem label="CourseName" prop="name">
						<Input v-model="formRight.name"></Input>
					</FormItem>
					<FormItem label="Author" prop="author">
						<Input v-model="formRight.author"></Input>
					</FormItem>
					<FormItem label="Price" prop="price">
						<Input v-model="formRight.price"></Input>
					</FormItem>
					<FormItem label="IsPublished">
						<!-- <Input v-model="formRight.isPublished"></Input> -->
						<i-Switch v-model="formRight.isPublished">
							<span slot="close">No</span>
						</i-Switch>
					</FormItem>
					<FormItem label="Tags">
						<Select v-model="formRight.tags" multiple style="width:260px">
							<Option v-for="item in courseTags" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
				</Form>

				<!-- 自定义页脚 -->
				<div slot="footer">
					<Button :loading="btnLoading" type="primary" size="small" @click="addUser('formRight')">确定</Button>
        </div>
			</Modal>

			<!-- 删除 Modal -->
			<Modal v-model="deleteModal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
					<Icon type="ios-information-circle"></Icon>
					<span>Delete confirmation</span>
        </p>
        <div style="text-align:center">
					<p>注意: 删除后不可恢复 !</p>
        </div>
        <div slot="footer">
					<Button type="error" size="large" long :loading="btnLoading" @click="remove">Delete</Button>
        </div>
    	</Modal>
		</div>
	</div>
</template>
<script>

	import { mapActions } from 'vuex'
	import { getToken } from '../../utils/userToken.js'
	import request from '../../utils/request.js' 

	export default {
		data () {
			return {
				user: '',
				deleteModal: false,
				add_user_modal: false,
				isCollapsed: false,
				loading: false,
				btnLoading: false,
				removeIndex: '', // 记录当前要删除的 Course 的下标
				formRight: {
					name: '',
					author: '',
					tags: [],
					price: '',
					isPublished: false
				},
				ruleInline: {
					name: [
						{ required: true, message: 'Please fill in the user tag name', trigger: 'blur' }
					],
					author: [
						{ required: true, message: 'Please fill in the author name.', trigger: 'blur' },
					],
					price: [
						{ required: true, message: 'Please fill in the price', trigger: 'blur' }
					]
				},
				courseTags: [
					{
						value: 'Node.js',
						label: 'Node.js'
					},
					{
						value: 'MongoDB',
						label: 'MongoDB'
					},
					{
						value: 'Vue.js',
						label: 'Vue.js'
					},
					{
						value: 'React.js',
						label: 'React.js'
					},
					{
						value: 'Angular.js',
						label: 'Angular.js'
					}
				],
				columns: [
					{
						title: 'Name',
						key: 'name'
					},
					{
						title: 'Author',
						key: 'author'
					},
					{
						title: 'Date',
						key: 'date'
					},
					{
						title: 'Price (￥)',
						key: 'price'
					},
					{
						title: 'IsPublished',
						key: 'isPublished'
					},
					{
						title: 'Action',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.show(params.index)
										}
									}
								}, 'View'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.deleteModal = true
											this.removeIndex = params.index
										}
									}
								}, 'Delete')
							])
						}
					}
				],
				data: []
			}
		},
		created() {
			this.user = getToken().token;
		},
		mounted () {
			this.searchData()
		},
		computed: {
			rotateIcon () {
				return [
					'menu-icon',
					this.isCollapsed ? 'rotate-icon' : ''
				];
			},
			menuitemClasses () {
				return [
					'menu-item',
					this.isCollapsed ? 'collapsed-menu' : ''
				]
			}
		},
		methods: {
			...mapActions([
				'handleLogout'
			]),
			logout () {
				this.handleLogout().then(res => {
					if (res.status === 200) {
						this.$Message.success(res.message)
						this.$router.push({
							name: 'login'
						})
					}
				})
			},
			collapsedSider () {
				this.$refs.side1.toggleCollapse();
			},
			
			// add user
			addUser (name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.btnLoading = true
						request({
							url: '/addCourse',
							method: 'post',
							data: this.formRight
						}).then(res => {
							const result = res.data;
							if (result.status === 200) {
								this.add_user_modal = false
								this.btnLoading = false
								this.searchData()
							}
						}).catch(err => {
							this.btnLoading = false
							throw new Error(err.message)
						})
					} else {
						this.$Message.error('请填写完整信息 !');
					}
				})
			},

			// search users
			searchData () {
				this.loading = true
				setTimeout(() => {
					request({
						url: '/getCourses',
						method: 'get'
					}).then(res => {
						const result = res.data;
						console.log(result)
						if (result.status === 200) {
							this.loading = false
							this.data = result.data.content;
						}
					}).catch(err => {
						this.loading = false
						throw new Error(err.message)
					})
				}, 1000);
			},

			// delete user
			remove () {
				this.btnLoading = true
				request({
					url: 'deleteCourse',
					data: {
						id: this.data[this.removeIndex]._id
					},
					method: 'delete'
				}).then(res => {
					if (res.data.status === 200) {
						this.btnLoading = false
						this.deleteModal = false
						this.$Message.success('delete success !')
						this.searchData()
					}
				}).catch(err => {
					this.btnLoading = false
					this.$Message.success('delete fail, ' + err.message)
				})
			},

			// user details
			show (i) {
				console.log(this.data[i])
			}
		}
	}
</script>

<style scoped>
	.layout{
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
	}
	.layout-header-bar{
		background: #fff;
		box-shadow: 0 1px 1px rgba(0,0,0,.1);
	}
	.layout-logo-left{
		width: 90%;
		height: 30px;
		background: #5b6270;
		border-radius: 3px;
		margin: 15px auto;
	}
	.menu-icon{
		transition: all .3s;
	}
	.rotate-icon{
		transform: rotate(-90deg);
	}
	.menu-item span{
		display: inline-block;
		overflow: hidden;
		width: 69px;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: bottom;
		transition: width .2s ease .2s;
	}
	.menu-item i{
		transform: translateX(0px);
		transition: font-size .2s ease, transform .2s ease;
		vertical-align: middle;
		font-size: 16px;
	}
	.collapsed-menu span{
		width: 0px;
		transition: width .2s ease;
	}
	.collapsed-menu i{
		transform: translateX(5px);
		transition: font-size .2s ease .2s, transform .2s ease .2s;
		vertical-align: middle;
		font-size: 22px;
	}

	/* user float right */
	span.admin {
		float: right;
		margin-right: 45px;
	}
</style>
