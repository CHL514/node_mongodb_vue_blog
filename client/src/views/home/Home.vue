<template>
	<div class="home-wrapper">
		<h1>Welcome The Home Page.</h1>
		<Button @click="logout">logout</Button>
	</div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
	name: 'Home',
	data () {
		return {}
	},
	created () {
		console.log('router info', this.$route)
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
		}
	}
}
</script>

<style scoped>

</style>
