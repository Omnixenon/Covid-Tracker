import { ConnectedRouter } from 'connected-react-router'
import { history } from 'js/redux/middleware/history'
import React from 'react'
import Routes from './routes'

const Router = () => {
  return (
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  )
}

export default Router
