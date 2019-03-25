import request from '@/utils/request'

// 获取首页信息
export function set_hosting(param) {
  return request.post('api/hosting/set_hosting',param)
}