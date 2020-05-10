import { routerMiddleware } from 'connected-react-router'
// eslint-disable-next-line global-require
export const history = require('history').createBrowserHistory()

export default routerMiddleware(history)
