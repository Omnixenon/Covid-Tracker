import { applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import * as auth from 'js/redux/api/auth'
import history from './history'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default composeEnhancers(
	applyMiddleware(
		history,
		thunkMiddleware.withExtraArgument({ auth }),
		promiseMiddleware
	)
)
