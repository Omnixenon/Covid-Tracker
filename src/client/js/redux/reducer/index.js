import { combineReducers } from 'redux'
import { history } from 'js/redux/middleware/history'
import { reducer as formReducer } from 'redux-form'
import router from './router'
import covid from './covid'

export default combineReducers({
	covid: covid,
	form: formReducer,
	router: router(history)
})
