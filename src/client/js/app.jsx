import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import React from 'react'
import Route from './route'
import '../scss/app.scss'
import 'formdata-polyfill'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

OfflinePluginRuntime.install()

render(
  <AppContainer>
    <Route />
  </AppContainer>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept()
}
