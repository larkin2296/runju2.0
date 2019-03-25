import request from '@/utils/request'

// 获取首页信息
export function get_appoint_data(param) {
  return request.post('api/appoint/get_appoint_data',param)
}

export function delete_appoint(param) {
    return request.post('api/appoint/delete_appoint',param)
  }