import request from '@/utils/request'

// 获取首页信息
export function upload_pic(param) {
  return request.post('api/upload/upload_pic',param)
}

export function send_maintencance_data(param) {
    return request.post('api/upload/send_maintencance_data',param)
}