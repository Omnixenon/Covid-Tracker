/* global window */
import * as ACTIONS from 'constant/actions'
import { createAction } from 'redux-actions'
import { history } from 'js/redux/middleware/history'
import _ from 'lodash'
import axios from 'axios'

const loginClientUser = createAction(ACTIONS.LOGIN_USER)

// export const autoLoginCheck = () => async (dispatch, getState, { auth }) => {
//   dispatch(updateAuthState({ isAuthChecking: true }))

//   try {
//     // const response = await auth.isLoggedIn()
//     await dispatch(updateAuthState({
//       isAuthCompleted: true,
//       isLoggedIn: response.logged_in
//     }))

//     await dispatch(loginClientUser(response.session))
//   } catch (error) {
//     dispatch(updateAuthState({
//       isAuthChecking: false,
//       isAuthCompleted: true,
//       isLoggedIn: false
//     }))
//   }
// }

export const dispatchLogin = () => async (dispatch, getState, { auth }) => {
  try {
    dispatch(loginClientUser(false))
    return true
  } catch (error) {
    console.log(error)
  }
}

export const dispatchLoginPromise = () => ({
  type: ACTIONS.LOGIN_USER,
  payload: axios.get('https://jsonplaceholder.typicode.com/todos/1')
})
