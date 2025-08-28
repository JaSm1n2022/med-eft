import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./Layouts/Base";
import Medicaid from "./Layouts/Pages/Medicaid";
import Medicare from "./Layouts/Pages/Medicare";

import Login from "./Layouts/auth/Login";
import Logout from "./Layouts/auth/Logout";
import * as actions from "./store/actions";
import StorageUtil from "./utils/storageUtil";

class App extends Component {
  componentDidMount() {
    console.log("[StorageUtil.getUser()", StorageUtil.getUser());
    this.props.onTryAutoSignup();
  }

  render() {
    console.log(process.env.NODE_ENV);

    return (
      <Router basename="/">
        <Layout>
          <Switch>
            <Route exact path="/" component={withRouter(Medicaid)} />
            <Route exact path="/medicaid" component={withRouter(Medicaid)} />
            <Route exact path="/medicare" component={withRouter(Medicare)} />

            <Redirect to="/medicaid" />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    isInboxOpen: false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
