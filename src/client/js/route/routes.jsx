import React from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router'
import * as ROUTES from 'constant/routes'
import Home from 'view/page/home'

class Routes extends React.Component {
  render () {
    return (
      <Switch>
        <Route
          exact
          path={ROUTES.ROOT}
          component={Home}
        />
        <Redirect to={ROUTES.ROOT} />
      </Switch>
    )
  }
}

export default withRouter(Routes)
