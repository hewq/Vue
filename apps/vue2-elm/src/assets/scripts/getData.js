import axios from 'axios'
import {getStore} from './utils'

// axios.defaults.baseURL = '//elm.cangdu.org/';
axios.defaults.baseURL = '/api/'
let baseURL = '//elm.cangdu.org/'

/**
 * 获取首页默认地址
 */
export const cityGuess = () => {
	return axios.get(baseURL+'v1/cities',{
	    params: {
	      type: 'guess'
    	}
    })
}

/**
 * 获取首页热门城市
 */
export const hotcity = () => {
	return axios.get(baseURL+'v1/cities', {
		params: {
			type: 'hot'
		}
	})
}

/**
 * 获取首页所有城市
 */
export const groupcity = () => {
	return axios.get(baseURL+'v1/cities', {
		params: {
			type: 'group'
		}
	})
}

/**
 * 获取用户信息
 */
export const getUser = () => {
	return axios.get(baseURL+'v1/user', {
		params: {
			user_id:  getStore('user_id')
		}
	})
}

/**
 * 个人中心里编辑地址
 */
export const getAddressList = (user_id) => {
	return axios.get(baseURL+'v1/users/'+user_id+'/addresses')
}

/**
 * 获取图片验证码
 */
export const getcaptchas = () => {
	let data = {}
	return axios.post('v1/captchas')
}

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => {
	return axios.post('v2/login', {
		username,
		password,
		captcha_code
	})
}