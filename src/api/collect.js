import request from '@/utils/request'

// 获取首页信息
export function get_collect_data(param) {
  return request.post('api/collect/get_collect_data',param)
}

export function delete_collect(param) {
    return request.post('api/collect/delete_collect',param)
  }