<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ homeTile }}</h2>
    <button @click="login">登录</button>
  </div>
</template>

<script>

import request from '../utils/request.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js and Node.js App',
      homeTile: 'HOME Page'
    }
  },
  created () {
    let data = this.$route.query.data
    console.log('回到首页:', data)
    if (data !== "[object Object]") {
      this.homeTile = this.$route.query.data.title
    }
  },
  methods: {
    login () {
      let vm = this
      request({
        url: './login',
        method: 'post',
        data: {
          username: 'alex.cheng',
          passworld: 'alex.cheng0514@qq.com'
        }
      }).then(res => {
        setTimeout(function () {
          vm.$router.push({
            path: '/login',
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
h1, h2 {
  font-weight: normal;
  color: #fff;
}
</style>
