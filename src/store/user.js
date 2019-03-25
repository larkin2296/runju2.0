import { login, logout, refresh,getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    id: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_UID: (state, id) => {
      state.id = id
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const mobile = userInfo.phone.trim()
      return new Promise((resolve, reject) => {
        login(mobile, userInfo.password).then(response => {
            //console.log(response)
          const data = response.data
          if(response.code == '2000'){
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            commit('SET_UID', data.user.id)
            commit('SET_NAME', data.user.username)
          }
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    Refresh({ commit, state }) {
      return new Promise((resolve, reject) => {
        refresh(state.token).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_NAME', data.name)
          commit('SET_UID', data.id)
          resolve(response)
        },error=>{
            resolve('error')
        }).catch(error => {
            //console.log(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user