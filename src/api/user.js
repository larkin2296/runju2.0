import request from '@/utils/request'

export function set_newname(param) {
    return request.post('api/user/send_newname',param)
}

export function set_newpsd(param) {
    return request.post('api/user/set_newpsd',param)
}