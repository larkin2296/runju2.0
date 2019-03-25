import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: '/api/', // api的base_url
  // baseURL: process.env.BASE_API,
  method: 'post',
  timeout: 15000,
  headers: { 'X-Custom-Header': 'foobar', 'Access-Control-Allow-Credentials': 'false', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, X-Requested-With, Origin, Accept', 'X-Requested-With': 'XMLHttpRequest' },
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'Accept': 'application/json'
  // },
  responseType: 'json'
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (response.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
