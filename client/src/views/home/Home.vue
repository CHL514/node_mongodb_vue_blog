<template>
	<div class="home-wrapper">
		<h1>Welcome The Home Page.</h1>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data () {
		return {}
	},
	created () {
		console.log('router info', this.$route)
	}
}
</script>

<style scoped>

</style>
