import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "./Header";
import {
  ToastProvider,
  DefaultToastContainer,
} from "react-toast-notifications";

import * as actions from "../store/actions";
export const CustomToastContainer = (props) => (
  // eslint-disable-next-line
  <DefaultToastContainer {...props} style={{ zIndex: 9999 }} />
);

class Base extends Component {
  componentWillMount() {}

  render() {
    return (
      <div>
        <ToastProvider components={{ ToastContainer: CustomToastContainer }}>
          <Header />
          <main>{this.props.children}</main>
        </ToastProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Base);
