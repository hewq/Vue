import axios from 'axios'
import {getStore} from './utils'

axios.defaults.baseURL = 'http://cangdu.org:8001/';

/**
 * 获取首页默认地址
 */
export const cityGuess = () => {
	return axios.get('v1/cities',{
	    params: {
	      type: 'guess'
    	}
    })
}

/**
 * 获取首页热门城市
 */
export const hotcity = () => {
	return axios.get('v1/cities', {
		params: {
			type: 'hot'
		}
	})
}

/**
 * 获取首页所有城市
 */
export const groupcity = () => {
	return axios.get('v1/cities', {
		params: {
			type: 'group'
		}
	})
}

/**
 * 获取用户信息
 */
export const getUser = () => {
	return axios.get('v1/user', {
		params: {
			user_id:  getStore('user_id')
		}
	})
}

/**
 * 个人中心里编辑地址
 */
export const getAddressList = (user_id) => {
	return axios.get('/v1/users/'+user_id+'/addresses')
}