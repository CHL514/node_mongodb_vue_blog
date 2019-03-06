<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
		<h2>
			username: {{ userInfo.username }}
		</h2>
		<h2>
			passworld: {{ userInfo.passworld }}
		</h2>
    <button @click="backHome">回到首页</button>
  </div>
</template>

<script>

import request from '../utils/request.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
			msg: '登录成功!',
			userInfo: {}
    }
	},
	created () {
		console.log(this.$route.query)
		this.userInfo = this.$route.query
	},
  methods: {
    backHome () {
			let vm = this
      request({
        url: '/',
        method: 'get'
      }).then(res => {
				console.log('请求成功: ', res)
				setTimeout(() => {
					vm.$router.push({
						path: '/',
						query: res.data
					})
				}, 2000)
      }).catch(err => {
        console.log('请求失败: ', err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	div.hello {
		color: #fff;
	}
</style>
