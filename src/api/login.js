import request from '@/utils/request'

export function send_code(param) {
  return request.post('api/register/send_code',param)
}

export function send_register(param) {
  return request.post('api/register/send_register',param)
}

export function login(mobile,password) {
  return request.post('api/login/login',{mobile,password})
}
export function logout() {
  return request({
    url: 'api/logout/',
    method: 'post'
  })
}

export function refresh(token) {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer${token}` }
  return request.post('api/user/refresh', '', { headers: headers })
}

export function getInfo(token) {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer${token}` }
  return request.post('api/user/info', '', { headers: headers })
}