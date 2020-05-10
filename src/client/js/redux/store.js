import { createStore } from 'redux'
import middleware from './middleware'
import reducers from './reducer'

const store = createStore(reducers, middleware)

export default store
