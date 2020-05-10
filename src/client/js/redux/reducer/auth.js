import * as ACTIONS from 'constant/actions'
import { handleActions } from 'redux-actions'

const initialState = {
	autoLoginCheckCompleted: false,
	session: undefined,
	user: undefined
}

export default
handleActions({
	[ACTIONS.LOGIN_USER]: (state, action) => ({
		...state,
		test: action.payload
	}),
	[ACTIONS.LOGIN_USER_PENDING]: (state, action) => ({
		...state,
		spinner: true
	}),
	[ACTIONS.LOGIN_USER_FULFILLED]: (state, action) => ({
		...state,
		spinner: false,
		test: action.payload
	})
}, initialState)
