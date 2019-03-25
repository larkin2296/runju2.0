import request from '@/utils/request'

// 获取首页信息
export function get_frontpage_house() {
  return request.post('api/house/get_frontpage_house')
}
// 获取列表数据
export function search_house(param) {
    return request.post('api/house/search_house',param)
}
export function search_map_house(param) {
    return request.post('api/house/search_map_house',param)
}
// 获取详情信息
export function get_house_detail(param) {
    return request.post('api/house/get_house_detail',param)
}
//获取选择数据
export function get_choose_data() {
    return request.post('api/house/get_choose_data')
}
//设置收藏
export function set_house_like(param) {
    return request.post('api/house/set_house_like',param)
}
//设置预约
export function set_appoint(param) {
    return request.post('api/house/set_appoint',param)
}
export function save_history(param) {
    return request.post('api/history/save_history',param)
}

export function get_house_search(param) {
    return request.post('api/house/get_house_search',param)
}