import * as types from '../actionCreators/types'

export const auth = (state=false, { type, payload }) => {
    switch(type) {
        case types.LOGIN:
            return payload
        case types.LOGOUT:
            return payload
        default:
            return state
    }
}