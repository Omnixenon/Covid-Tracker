import { Provider } from 'react-redux'
import React from 'react'
import store from 'js/redux/store'
import Router from './router'

export default () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
