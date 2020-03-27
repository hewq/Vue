import axios from 'axios'
import { getStore } from './utils'

// axios.defaults.baseURL = '//elm.cangdu.org/';
axios.defaults.baseURL = '/api/'
let baseURL = '//elm.cangdu.org/'

/**
 * 获取首页默认地址
 */
export const cityGuess = () => axios.get(baseURL + 'v1/cities', { params: { type: 'guess' } })

/**
 * 获取首页热门城市
 */
export const hotcity = () => axios.get(baseURL + 'v1/cities', { params: { type: 'hot' } })

/**
 * 获取首页所有城市
 */
export const groupcity = () => axios.get(baseURL + 'v1/cities', { params: { type: 'group' } })

/**
 * 获取用户信息
 */
export const getUser = () => axios.get(baseURL + 'v1/user', { params: { user_id: getStore('user_id') } })

/**
 * 个人中心里编辑地址
 */
export const getAddressList = user_id => axios.get('v1/users/' + user_id + '/addresses')

/**
 * 删除地址
 */

export const deleteAddress = (userid, addressid) => axios.delete('v1/users/' + userid + '/addresses/' + addressid)

/**
 * 添加地址
 */

export const postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => axios.post('v1/users/' + userId + '/addresses', {
    address,
    address_detail,
    geohash,
    name,
    phone,
    phone_bk,
    poi_type,
    sex,
    tag,
    tag_type,
});

/**
 * 获取图片验证码
 */
export const getcaptchas = () => axios.post('v1/captchas')

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => axios.post('v2/login', { username, password, captcha_code })

/**
 * 获取当前所在城市
 */

export const currentcity = number => axios.get(baseURL + 'v1/cities/' + number)

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => axios.get(baseURL + 'v1/pois/', { params: { type: 'search', city_id: cityid, keyword: value } })

/**
 * 上传头像
 */

export const setHeadImg = (id, data) => axios.post('eus/v1/users/' + id + '/avatar', { body: data, credentials: 'include' })

/**
 * 搜索地址
 */

export const searchNearby = keyword => axios.get('http://cangdu.org:8001/v1/pois', {
    params: {
        type: 'nearby',
        keyword
    }
})

/**
 * 退出登录
 */
export const signout = () => axios.get('v2/signout');


/**
 * 获取短信验证码
 */

export const mobileCode = phone => axios.post('/v4/mobile/verify_code/send', {
    mobile: phone,
    scene: 'login',
    type: 'sms'
});

/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber, type) => axios.get('/v1/users/exists', {
    [type]: checkNumber,
    type
});

/**
 * 发送帐号
 */

export const sendMobile = (sendData, captcha_code, type, password) => axios.post('/v1/mobile/verify_code/send', {
    action: "send",
    captcha_code,
    [type]: sendData,
    type: "sms",
    way: type,
    password,
});

/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => axios.post('/v2/changepassword', {
    username,
    oldpassWord,
    newpassword,
    confirmpassword,
    captcha_code
});

/**
 * 获取红包
 */

export const getHongbaoNum = id => axios.get('/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0');

/**
 * 获取过期红包
 */


export const getExpired = id => axios.get('/promotion/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0');

/**
 * 获取订单列表
 */

export const getOrderList = (user_id, offset) => axios.get('/bos/v2/users/' + user_id + '/orders', {
    params: {
        limit: 10,
        offset,
    }
});

/**
 * 获取订单详情
 */

export const getOrderDetail = (user_id, orderid) => axios.get('/bos/v1/users/' + user_id + '/orders/' + orderid + '/snapshot');