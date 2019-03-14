<template>
	<div class="login-wrapper">
		<Form class="login-form" ref="formInline" :model="formInline" :rules="ruleInline">
			<FormItem prop="username">
				<Input class="login-input" type="text" v-model="formInline.username" placeholder="Username">
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
import { mapActions } from 'vuex'

export default {
	name: 'Login',
	data () {
		return {
			loading: false,
			formInline: {
				username: '',
				password: ''
			},
			ruleInline: {
				username: [
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
		...mapActions([
			'handleLogin'
		]),
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.loading = true
					this.handleLogin(this.formInline).then(userInfo => {
						this.loading = false
						console.log('userInfo', userInfo)
						this.$router.push({
							path: '/'
						})
					}).catch(err => {
						this.loading = false
						this.$Message.error('login fail ' + err)
					})
				} else {
					this.$Message.error('Please fill in the user name and password !')
				}
			})
		},
		signin (name) {
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
