
import request from '@/utils/request.js'
import { getToken, setToken } from '@/utils/userToken.js'

export default {
  state: {
    token: getToken(),
    user: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    handleLogin ({ commit }, userInfo) {
      userInfo.username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          request({
            url: '/login',
            method: 'post',
            data: userInfo
          }).then(res => {
            console.log(res)
            if (res.data.status === 200) {
              const userInfo = res.data.userInfo
              commit('setToken', userInfo.username)
              resolve(userInfo)
            } else {
              reject(res.data.message)
            }
          }).catch(err => {
            reject(err)
          })
        }, 2000)
      })
    },
    handleLogout ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('setToken', '')
          resolve({
            status: 200,
            message: 'clear token successful !'
          })
        }, 1000)
      })
    }
  }
}
