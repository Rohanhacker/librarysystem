import * as types from './types'

export const login = () => ({
    type: types.LOGIN,
    payload: true
})

export const logout = () => ({
    type: types.LOGOUT,
    payload: false
})