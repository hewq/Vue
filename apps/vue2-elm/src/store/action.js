import {
    getUser,
    getAddressList
} from '../assets/scripts/getData'
import {
    GET_USERINFO,
    SAVE_ADDRESS
} from './mutation-types'

export default {
    async getUserInfo({
        commit,
        state
    }) {
        let res = await getUser()
        commit(GET_USERINFO, res.data)
    },
    async saveAddress({
        commit,
        state
    }) {
        if (state.removeAddress.length > 0) return
        let address = await getAddressList(state.userInfo.user_id)
        commit(SAVE_ADDRESS, address.data)
    }
}