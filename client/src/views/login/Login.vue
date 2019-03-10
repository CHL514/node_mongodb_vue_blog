<template>
	<div class="login-wrapper">
		<Form class="login-form" ref="formInline" :model="formInline" :rules="ruleInline">
			<FormItem prop="user">
				<Input class="login-input" type="text" v-model="formInline.user" placeholder="Username">
					<Icon type="ios-person-outline" slot="prepend"></Icon>
				</Input>
			</FormItem>
			<FormItem prop="password">
				<Input class="login-input" type="password" v-model="formInline.password" placeholder="Password">
					<Icon type="ios-lock-outline" slot="prepend"></Icon>
				</Input>
			</FormItem>
			<FormItem>
				<Row>
					<Col span="12">
						<Button class="btn" @click="handleSubmit('formInline')" :loading="loading">login</Button>
					</Col>
					<Col span="12">
						<Button class="btn" @click="signin('formInline')">Signin</Button>
					</Col>
				</Row>
			</FormItem>
			<h3>
				<span>username: alex.cheng</span>
				<span>password: press any</span>
			</h3>
    </Form>
	</div>
</template>

<script>
import request from '../../utils/request.js'

export default {
	name: 'Login',
	data () {
		return {
			loading: false,
			formInline: {
				user: '',
				password: ''
			},
			ruleInline: {
				user: [
					{ required: true, message: 'Please fill in the user name', trigger: 'blur' }
				],
				password: [
					{ required: true, message: 'Please fill in the password.', trigger: 'blur' },
					{ type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		handleSubmit(name) {
			this.loading = true
			this.$refs[name].validate((valid) => {
				if (valid) {
					setTimeout(() => {
						request({
							url: '/login',
							method: 'post',
							data: this.formInline
						}).then(res => {
							this.loading = false
							if (res.data.status === 200) {
								this.$Message.success('Success!')
								console.log('res', res)
								this.$router.push({
									name: 'Home',
									params: res.data
								})
							} else {
								this.$Message.error(res.data.message)
							}
						}).catch(err => {
							this.loading = false
							this.$Message.error('Login Fail !')
							console.log('err', err)
						})
					}, 2000)
				} else {
					this.loading = false
					this.$Message.error('Please fill in the user name and password !')
				}
			})
		},
		signin(name) {
			console.log(name)
		}
	}
}
</script>

<style scoped>
	div.login-wrapper {
		height: 100vh;
		background-color: skyblue;
		text-align: center;
	}
	.login-form {
		position: absolute;
		width: 520px;
		margin: auto;
		background-color: #fff;
		left: 50%;
		margin-left: -260px;
		top: 50%;
		margin-top: -220px;
		padding: 24px 48px;
		border-radius: 6px;
		box-shadow: 0 0 36px 6px #fff;
	}
	button.btn {
		background-color: skyblue;
		color: #fff;
	}
</style>
