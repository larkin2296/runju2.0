import request from '@/utils/request'

// 获取首页信息
export function get_history_data(param) {
  return request.post('api/history/get_history_data',param)
}